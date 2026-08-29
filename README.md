# LinkList

LinkList, farklı mağazalardaki ürünleri kişisel listelerde toplamak ve paylaşmak için geliştirilen bir ürün arşivi uygulamasıdır.

## Proje yapısı

- `frontend/`: React/Next.js arayüz prototipi
- `backend/`: Backend geliştirmesi için ayrılmış alan
- `docs/`: Ürün ve API sözleşmesi dokümanları

## Başlangıç

```bash
cd frontend
npm install
npm run dev
```

Frontend varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Çalışma düzeni

- Zeynep: frontend ve UI
- Özgür: backend ve veri modeli
- Ortak entegrasyon sözleşmesi: `docs/api-contract.md`

Yeni çalışmalar doğrudan `main` yerine ayrı branch üzerinde geliştirilip pull request ile birleştirilmelidir.
