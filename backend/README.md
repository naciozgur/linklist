# LinkList Backend

LinkList'in NestJS, PostgreSQL ve Prisma tabanlı backend uygulaması.

Bu ilk aşama yalnızca uygulama altyapısını ve veri modelini içerir. Henüz HTTP endpoint'i veya controller eklenmemiştir. Frontend'in beklediği sözleşme `../docs/api-contract.md` dosyasındadır.

## Gereksinimler

- Node.js 22+
- npm 10+
- Docker ve Docker Compose

## Kurulum

```bash
cp .env.example .env
npm install
docker compose up -d
npm run prisma:generate
npm run prisma:migrate:dev -- --name init
npm run start:dev
```

Uygulama varsayılan olarak `http://localhost:3001` adresinde çalışır. PostgreSQL host makinede `localhost:5432` üzerinden erişilebilir.

## Komutlar

```bash
npm run lint
npm run format
npm run build
npm test
npm run test:cov
npm run prisma:generate
npm run prisma:validate
npm run prisma:migrate:dev -- --name <migration-name>
npm run prisma:studio
```

## Klasör yapısı

```text
backend/
├── prisma/
│   └── schema.prisma       # PostgreSQL veri modeli
├── src/
│   ├── common/             # Ortak decorator, guard, pipe ve yardımcılar
│   ├── config/             # Ortam ve uygulama yapılandırması
│   ├── database/           # Prisma/veritabanı entegrasyonu
│   ├── modules/            # İş alanı modülleri (sonraki aşamalar)
│   ├── app.module.ts       # Kök NestJS modülü
│   └── main.ts             # Uygulama başlangıcı
└── test/                   # E2E testleri (endpoint aşamasında)
```

Boş klasörler `.gitkeep` ile tutulur; endpoint geliştirmesi başladığında özellik bazlı modüller `src/modules` altında oluşturulur.

## Veri modeli

- `User`: hesap ve kimlik bilgileri
- `Profile`: kullanıcıya bire bir bağlı herkese açık profil
- `List`: kullanıcı listesi ve görünürlük seviyesi
- `Product`: kaydedilen ürün ve kaynak/fiyat bilgileri
- `ListProduct`: liste–ürün ilişkisi ve liste içi sıralama

`ListProduct` ayrı bir modeldir; aynı ürün birden fazla listede yer alabilir ve her listede bağımsız bir sıraya sahip olabilir.

## Ortam değişkenleri

`.env.example` geliştirme varsayılanlarını içerir. Gerçek `.env` dosyası repoya eklenmemelidir.
