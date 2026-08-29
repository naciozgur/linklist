# LinkList API Sözleşmesi

Temel adres frontend tarafında `NEXT_PUBLIC_API_BASE_URL` ile tanımlanır.

## Ana kaynaklar

### Profil
- `GET /profiles/:username`
- `PATCH /profiles/me`

### Listeler
- `GET /profiles/:username/lists`
- `POST /lists`
- `GET /lists/:id`
- `PATCH /lists/:id`
- `DELETE /lists/:id`

### Ürünler
- `POST /products/extract` — bağlantıdan ürün bilgisi çıkarmayı dener
- `POST /products` — manuel veya çıkarılmış ürünü kaydeder
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

## Liste modeli

```ts
type ListVisibility = "public" | "unlisted" | "private";

type List = {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  category: string;
  visibility: ListVisibility;
  productCount: number;
  products: Product[];
  updatedAt: string;
};
```

## Ürün modeli

```ts
type Product = {
  id: string;
  name: string;
  brand?: string;
  price?: number;
  currency: string;
  sourceUrl: string;
  images: string[];
  note?: string;
  savedPriceAt?: string;
};
```

## Hata cevabı

```json
{
  "code": "PRODUCT_EXTRACTION_FAILED",
  "message": "Bağlantıdan ürün bilgisi alınamadı.",
  "manualEntryAllowed": true,
  "partialData": {}
}
```

Bu dosya frontend ve backend değişikliklerinde birlikte güncellenmelidir.
