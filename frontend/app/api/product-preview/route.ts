type JsonRecord = Record<string, unknown>;

const allowedHosts = new Set([
  "trendyol.com", "www.trendyol.com",
  "hepsiburada.com", "www.hepsiburada.com",
  "lcw.com", "www.lcw.com",
  "amazon.com.tr", "www.amazon.com.tr",
]);

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url?: string };
    if (!url) return responseError("Bir ürün bağlantısı gir.", 400);

    const target = new URL(url);
    if (target.protocol !== "https:" || !allowedHosts.has(target.hostname.toLowerCase())) {
      return responseError("Bu mağaza henüz desteklenmiyor. Trendyol, Hepsiburada, LC Waikiki veya Amazon Türkiye bağlantısı gir.", 400);
    }

    const source = await fetch(target.toString(), {
      headers: {
        accept: "text/html,application/xhtml+xml",
        "accept-language": "tr-TR,tr;q=0.9,en;q=0.7",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
        referer: `${target.origin}/`,
      },
      redirect: "follow",
      cache: "no-store",
    });

    if (!source.ok) return responseError(`Mağaza sayfasına ulaşılamadı (${source.status}).`, 502);

    const html = await source.text();
    const product = extractProduct(html, target.toString());
    if (!product.name) return responseError("Bu bağlantıdan ürün bilgisi okunamadı.", 422);

    return Response.json(product, { headers: { "cache-control": "no-store" } });
  } catch {
    return responseError("Geçerli bir ürün bağlantısı gir.", 400);
  }
}

function extractProduct(html: string, sourceUrl: string) {
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let structured: JsonRecord | undefined;
  for (const match of scripts) {
    try {
      structured = findProduct(JSON.parse(decodeEntities(match[1])) as unknown);
      if (structured) break;
    } catch {}
  }

  const offer = Array.isArray(structured?.offers) ? asRecord(structured.offers[0]) : asRecord(structured?.offers);
  const brandValue = structured?.brand;
  const brand = typeof brandValue === "string" ? brandValue : stringValue(asRecord(brandValue)?.name);
  const amazonName = textById(html, "productTitle");
  const amazonBrand = textById(html, "bylineInfo")?.replace(/\s+(?:Store['’]u ziyaret edin|Mağazasını ziyaret edin)$/i, "");
  const price = numberValue(offer?.price ?? structured?.price) ?? extractAmazonPrice(html);
  const images = uniqueStrings([...toStrings(structured?.image), ...extractTrendyolImages(html), ...extractAmazonImages(html), meta(html, "og:image") ?? ""]).slice(0, 10);

  return {
    name: stringValue(structured?.name) ?? amazonName ?? meta(html, "og:title")?.replace(/\s*[-|:]\s*(?:Trendyol|Amazon.com.tr).*$/i, ""),
    brand: brand ?? amazonBrand ?? "Marka belirtilmemiş",
    price,
    currency: stringValue(offer?.priceCurrency) ?? "TRY",
    sourceUrl,
    images,
  };
}

function findProduct(value: unknown): JsonRecord | undefined {
  if (Array.isArray(value)) {
    for (const item of value) { const product = findProduct(item); if (product) return product; }
    return undefined;
  }
  const record = asRecord(value);
  if (!record) return undefined;
  const type = record["@type"];
  if (type === "Product" || (Array.isArray(type) && type.includes("Product"))) return record;
  return findProduct(record["@graph"]);
}

function extractTrendyolImages(html: string) {
  const decoded = html.replaceAll("\\u002F", "/").replaceAll("\\/", "/");
  return (decoded.match(/https:\/\/cdn\.dsmcdn\.com\/[^"'<>\s]+\/1_org(?:_zoom)?\.jpg/g) ?? [])
    .filter((url) => /\/prod\/(?:QC|QC_PREP|QC_ENRICHMENT)\//.test(url));
}

function extractAmazonImages(html: string) {
  const value = html.match(/data-a-dynamic-image=(["'])([\s\S]*?)\1/i)?.[2];
  if (!value) return [];
  try { return Object.keys(JSON.parse(decodeEntities(value)) as Record<string, unknown>); } catch { return []; }
}

function extractAmazonPrice(html: string) {
  const prices = [...html.matchAll(/<span[^>]+class=["'][^"']*a-offscreen[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi)]
    .map((match) => stripTags(match[1])).filter((value) => /\d/.test(value));
  return prices.length ? parsePrice(prices[0]) : undefined;
}

function textById(html: string, id: string) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const value = html.match(new RegExp(`<[^>]+id=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/[^>]+>`, "i"))?.[1];
  return value ? stripTags(value) : undefined;
}

function stripTags(value: string) { return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()); }
function parsePrice(value: string) {
  const normalized = value.replace(/[^\d.,]/g, "");
  const decimalComma = normalized.lastIndexOf(",") > normalized.lastIndexOf(".");
  const number = Number(decimalComma ? normalized.replaceAll(".", "").replace(",", ".") : normalized.replaceAll(",", ""));
  return Number.isFinite(number) ? number : undefined;
}

function meta(html: string, property: string) { return html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"))?.[1]; }
function asRecord(value: unknown) { return value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : undefined; }
function stringValue(value: unknown) { return typeof value === "string" && value.trim() ? decodeEntities(value.trim()) : undefined; }
function numberValue(value: unknown) { if (typeof value === "string" && /[,]/.test(value)) return parsePrice(value); const parsed = Number(value); return Number.isFinite(parsed) ? parsed : undefined; }
function toStrings(value: unknown) { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : typeof value === "string" ? [value] : []; }
function uniqueStrings(values: string[]) { return [...new Set(values.map(decodeEntities).map((value) => value.replace(/https:\/\/cdn\.dsmcdn\.com\/mnresize\/\d+\/(?:\d+|-)\//, "https://cdn.dsmcdn.com/")).filter((value) => value.startsWith("https://")))]; }
function decodeEntities(value: string) { return value.replaceAll("&quot;", '"').replaceAll("&amp;", "&").replaceAll("&#39;", "'").replaceAll("&rsquo;", "’").replaceAll("&nbsp;", " "); }
function responseError(message: string, status: number) { return Response.json({ message }, { status, headers: { "cache-control": "no-store" } }); }
