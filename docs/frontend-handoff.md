# Frontend Teslim Notları

## Mevcut durum

Arayüz çalışan bir görsel prototiptir. Veriler şu anda `app/page.tsx` içindeki örnek dizilerden gelir.

Çalışan görünümler:
- Profil ve ziyaretçi görünümü
- Liste kartları ve mozaik yedek düzenleri
- Liste detayında galeri/kompakt görünüm
- Ürün detay galerisi
- Favori, takip, paylaş ve kaydet etkileşimleri
- Link okunamadığında manuel form
- Boş liste ve fotoğrafsız ürün durumları

## Zeynep için başlangıç

```bash
git clone https://github.com/naciozgur/linklist.git
cd linklist/frontend
npm install
npm run dev
```

UI çalışmaları için önerilen branch: `frontend/zeynep`.

## Entegrasyon kuralı

Örnek veriler API'ye taşınırken bileşenlerde doğrudan URL yazmayın. Temel adresi `.env.local` içindeki `NEXT_PUBLIC_API_BASE_URL` üzerinden okuyun.
