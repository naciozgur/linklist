"use client";

import { useState, type CSSProperties } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api";

type ImageRecord = { id: string; storageKey: string; sourceUrl?: string; position: number; width?: number; height?: number; mimeType?: string };
type ProductRecord = { id: string; name: string; brand?: string; price?: string; currency: string; sourceUrl: string; images: ImageRecord[] };
type ListRecord = { id: string; title: string; visibility: string; owner: { profile?: { displayName: string; username: string } }; listProducts: { position: number; product: ProductRecord }[] };

export default function BackendTestPage() {
  const [lists, setLists] = useState<ListRecord[]>([]);
  const [status, setStatus] = useState("PostgreSQL bağlantısı henüz denenmedi.");
  const [busy, setBusy] = useState(false);

  async function call(path: string, method = "GET") {
    setBusy(true);
    try {
      const response = await fetch(`${API_BASE}${path}`, { method });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return await response.json();
    } finally {
      setBusy(false);
    }
  }

  async function seed() {
    try {
      await call("/dev/seed", "POST");
      setStatus("Örnek kullanıcı, liste, ürün ve iki fotoğraf kaydı oluşturuldu.");
      await load();
    } catch (error) {
      setStatus(`Hata: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`);
    }
  }

  async function load() {
    try {
      const data = (await call("/dev/lists")) as ListRecord[];
      setLists(data);
      setStatus(`${data.length} liste PostgreSQL üzerinden okundu.`);
    } catch (error) {
      setStatus(`Hata: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`);
    }
  }

  return <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px", fontFamily: "Arial, sans-serif" }}>
    <p style={{ color: "#bd4b24", fontWeight: 700, letterSpacing: 1 }}>LINKLIST · GELİŞTİRME ARACI</p>
    <h1 style={{ fontSize: 40, marginBottom: 8 }}>Backend test paneli</h1>
    <p>Bu sayfa NestJS → Prisma → PostgreSQL ilişkisini gerçek isteklerle kontrol eder.</p>
    <div style={{ display: "flex", gap: 12, margin: "24px 0" }}>
      <button disabled={busy} onClick={seed} style={buttonStyle}>Örnek veriyi oluştur</button>
      <button disabled={busy} onClick={load} style={{ ...buttonStyle, background: "white", color: "#222" }}>Veritabanından oku</button>
    </div>
    <pre style={{ padding: 16, background: "#f3eee7", borderRadius: 8, whiteSpace: "pre-wrap" }}>{status}</pre>
    {lists.map((list) => <section key={list.id} style={{ borderTop: "1px solid #ddd", padding: "24px 0" }}>
      <small>{list.visibility} · @{list.owner.profile?.username}</small>
      <h2>{list.title}</h2>
      {list.listProducts.map(({ product, position }) => <article key={product.id} style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10, marginTop: 12 }}>
        <strong>{position + 1}. {product.brand} — {product.name}</strong>
        <p>{product.price} {product.currency} · <a href={product.sourceUrl}>Kaynak ürün bağlantısı</a></p>
        <ul>{product.images.map((image) => <li key={image.id}>Fotoğraf {image.position + 1}: <code>{image.storageKey}</code> ({image.width}×{image.height}, {image.mimeType})</li>)}</ul>
      </article>)}
    </section>)}
  </main>;
}

const buttonStyle: CSSProperties = { border: "1px solid #bd4b24", borderRadius: 8, background: "#bd4b24", color: "white", padding: "12px 18px", fontWeight: 700, cursor: "pointer" };
