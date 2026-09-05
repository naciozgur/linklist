# LinkList — İlk Ürün Kapsam ve Çalışma Sözleşmesi

**Durum:** İnceleme taslağı  
**Ürün sahibi:** Özgür  
**Backend sorumlusu:** Çağatay (`@cagataynova`)  
**Frontend/UI sorumlusu:** Zeynep  
**Kaynak depo:** `naciozgur/linklist`

Bu belge ilk yayınlanabilir LinkList ürününde neyin yapılacağını, neyin yapılmayacağını ve geliştirme sırasını sabitler. Yeni bir özellik bu belge değiştirilmeden ilk ürün kapsamına alınmaz.

## 1. Ürün hedefi

LinkList, farklı mağazalardaki ürünleri kişisel ve paylaşılabilir listelerde toplatan sosyal bir ürün vitrinidir.

İlk ürünün temel başarı akışı:

1. Kullanıcı hesap oluşturur.
2. Liste oluşturur.
3. Linkten veya manuel olarak ürün ekler.
4. Listeyi yayımlar ve paylaşır.
5. Başka kullanıcıları ve listeleri keşfeder.
6. Kullanıcıları takip eder, sosyal akışta yeni liste ve ürünleri görür.
7. Başkasının ürününü kendi listesine kaydeder.

İlk ürün bir fiyat karşılaştırma veya kapsamlı moderasyon ürünü değildir.

## 2. İlk üründe olacaklar

### 2.1 Hesap ve profil

- E-posta ile kayıt, giriş ve çıkış
- Oturum yönetimi
- Profil oluşturma ve düzenleme
- Kullanıcı adı, görünen ad, biyografi ve profil fotoğrafı
- Herkese açık profil sayfası
- Profil bağlantısını paylaşma
- Kullanıcı takip etme ve takibi bırakma
- İlk beta döneminde hesap silme talebinin destek üzerinden alınması

> Kimlik doğrulama sağlayıcısı teknik uygulama kararıdır. İlk ürün en az bir eksiksiz kayıt/giriş yöntemiyle çalışacaktır; ek sağlayıcılar ayrı iş olarak planlanır.

### 2.2 Liste yönetimi

- Liste oluşturma, görüntüleme, düzenleme ve silme
- Liste adı, açıklama ve kategori
- Görünürlük: herkese açık, bağlantıya özel, gizli
- Yeni listenin varsayılan olarak herkese açık oluşturulması
- Listeyi yalnızca sahibinin düzenleyebilmesi
- Listeye ürün ekleme, ürünü listeden çıkarma ve sıralama
- Liste bağlantısını paylaşma
- Listeyi beğenme ve beğeniyi kaldırma

### 2.3 Ürün yönetimi

- Ürün bağlantısı yapıştırma
- Ürün adı, görselleri, fiyatı ve mağaza/markayı en iyi çabayla çekme
- Çekilebilen alanları koruyup eksik alanları manuel tamamlama
- Otomatik çekme başarısız olduğunda aynı akışta manuel forma geçme
- Tamamen manuel ürün ekleme
- Ürün görüntüleme, düzenleme ve silme
- Birden fazla ürün görseli
- Mağaza bağlantısına yönlendirme
- Başka kullanıcının ürününü kendi listesine kaydetme

#### Tekrar kontrolü

Sistem genel ürün eşleştirmesi veya katalog birleştirmesi yapmaz.

- Kontrol yalnızca `liste + normalize edilmiş kaynak bağlantısı` üzerinden yapılır.
- Aynı bağlantı aynı listeye yeniden eklenirse “Bu ürün zaten bu listede var.” mesajı gösterilir.
- Aynı bağlantı farklı listelere eklenebilir.
- Manuel ve bağlantısız ürünlerde tekrar kontrolü yapılmaz.

### 2.4 Sosyal ana sayfa

Takip edilen kullanıcıların hareketlerini yeniden eskiye gösteren kronolojik akış:

- Yeni yayımlanan listeler
- Listelere yeni eklenen ürünler
- İçeriğin sahibi
- Ürün adı
- Liste adı
- Ürün ve liste detayına geçiş
- Listeyi beğenme
- Ürünü kendi listesine kaydetme

İlk üründe algoritmik sıralama veya kişiselleştirilmiş öneri motoru bulunmaz.

### 2.5 Arama ve keşif

- Kullanıcı arama
- Herkese açık liste arama
- Herkese açık ürün arama
- Yeni herkese açık listeleri görüntüleme
- Gizli ve bağlantıya özel içerikleri genel arama sonuçlarından çıkarma

### 2.6 Paylaşım

- Profil paylaşma
- Liste paylaşma
- Herkese açık içeriği giriş yapmadan görüntüleme
- Kaydetme, takip etme ve beğenme işlemlerinde giriş isteme

## 3. İlk üründe olmayacaklar

- Ürün ve liste yorumları
- Oy verme
- Bir listeyi komple kopyalama
- Ortak liste düzenleme
- Admin paneli
- Adminin listeleri öne çıkarması
- Gelişmiş raporlama, moderasyon ve audit sistemi
- Otomatik güvenlik inceleme paneli
- Fiyat takibi ve fiyat düşüş bildirimi
- Mağazalar arası fiyat karşılaştırması
- Premium üyelik ve ödeme
- Affiliate gelir sistemi
- Tarayıcı eklentisi
- Native mobil uygulama
- Algoritmik keşif ve öneri motoru

Bu özellikler veri modelini gereksiz yere karmaşıklaştırmadığı sürece gelecekte eklenebilir olacak şekilde düşünülür; fakat ilk ürünün teslim şartı değildir.

## 4. Geliştirme sırası

### Faz 0 — Kapsam ve temel kararlar

1. Bu belgenin ekip tarafından onaylanması
2. API sözleşmesinin güncellenmesi
3. Veri modelinin kapsamla uyumlu hâle getirilmesi
4. Yerel geliştirme ve test ortamının çalıştırılması

### Faz 1 — Teknik temel

1. NestJS, PostgreSQL ve Prisma kurulumu
2. Ortam değişkenleri ve migration yapısı
3. Standart API hata formatı
4. Validasyon, loglama ve temel güvenlik
5. CI kontrolleri: lint, build ve test

### Faz 2 — İlk dikey akış

1. Kayıt ve giriş
2. Profil oluşturma
3. Liste oluşturma
4. Manuel ürün ekleme
5. Liste detayını görüntüleme
6. Herkese açık liste paylaşma

Bu faz sonunda gerçek veritabanıyla çalışan ilk uçtan uca senaryo bulunmalıdır.

### Faz 3 — Linkten ürün ekleme

1. Genel Open Graph ve JSON-LD okuyucu
2. Ürün önizleme API'si
3. Eksik alanları manuel tamamlama
4. Aynı bağlantının aynı listede tekrar kontrolü
5. Öncelikli mağazalar için adaptörler
6. Başarısız bağlantıların hata nedenini loglama

Mağaza adaptörleri genel akışın alternatifi değil, güçlendiricisidir. Desteklenmeyen bağlantılar doğrudan reddedilmez; genel okuyucu ve manuel tamamlama denenir.

### Faz 4 — Sosyal çekirdek

1. Takip etme ve takibi bırakma
2. Kronolojik ana sayfa akışı
3. Liste beğenme
4. Başkasının ürününü kendi listesine kaydetme
5. Kullanıcı, liste ve ürün arama
6. Yeni herkese açık listeleri keşfetme

### Faz 5 — Yayına hazırlık

1. Yetki ve görünürlük testleri
2. Mobil ve masaüstü uçtan uca testler
3. Boş, eksik ve hata durumları
4. Temel kötüye kullanım ve URL güvenliği
5. Performans kontrolleri
6. Beta geri bildirim kanalı
7. Üretim ortamı ve izleme

## 5. Veri modeli kararları

- Bir ürün kaydı kullanıcıya aittir.
- Ürün ile liste ilişkisi ayrı tutulur.
- Aynı kaynak bağlantısı farklı listelerde bulunabilir.
- Aynı listede aynı normalize edilmiş bağlantı ikinci kez bulunamaz.
- Listeye özel sıra ve listeye özel not ilişki kaydında tutulur.
- Liste görünürlüğünün varsayılanı `PUBLIC` olur.
- Bağlantısız manuel ürün kaydı desteklenir; `sourceUrl` zorunlu değildir.
- Fiyat isteğe bağlıdır; para birimi ve fiyatın kaydedildiği tarih saklanabilir.
- Ürün görselleri ayrı kayıtlar olarak sıralı tutulur.
- Sosyal akış için olay üretmeye uygun `createdAt` ve `updatedAt` alanları bulunur.

## 6. API ve güvenlik kuralları

- Gizli listeyi yalnızca sahibi görebilir.
- Bağlantıya özel liste genel aramada ve profilde gösterilmez.
- Herkese açık içerik giriş yapmadan görüntülenebilir.
- Yazma işlemlerinde kimlik doğrulama zorunludur.
- Kullanıcı yalnızca kendi profilini, listesini ve ürününü düzenleyebilir.
- Dış URL isteklerinde SSRF koruması uygulanır.
- Yerel ağ, metadata servisleri ve izin verilmeyen protokoller engellenir.
- Link çekme zaman aşımına uğrarsa manuel akış kullanılabilir kalır.
- Kullanıcıya teknik hata ayrıntıları gösterilmez.

## 7. Tamamlanma kriteri

Bir iş aşağıdaki şartlar sağlanmadan tamamlanmış sayılmaz:

- Kabul kriterleri karşılanmıştır.
- Lint ve build başarılıdır.
- Gerekli birim veya entegrasyon testleri eklenmiştir.
- Yetki ve görünürlük kontrolleri uygulanmıştır.
- API değiştiyse API dokümanı güncellenmiştir.
- Hata ve boş durumları ele alınmıştır.
- PR açılmış ve en az bir ekip üyesi tarafından incelenmiştir.
- `main` dalına doğrudan geliştirme yapılmamıştır.

## 8. Çalışma biçimi ve sorumluluklar

### Özgür — Ürün sahibi

- Kapsam ve öncelik kararları
- Kabul kriterlerinin iş hedefiyle uyumu
- Demo kabulü
- Kapsam değişikliği onayı

### Çağatay — Backend

- Backend mimarisi ve API'ler
- Veritabanı ve migration'lar
- Kimlik doğrulama ve yetkilendirme
- Ürün bilgisi çekme servisi
- Testler, güvenlik ve backend dokümantasyonu

### Zeynep — Frontend/UI

- Responsive web arayüzü
- Tasarım sistemi ve bileşenler
- API entegrasyonu
- Mobil/masaüstü davranışları
- Arayüz hata, boş ve yüklenme durumları

### Ortak

- API sözleşmesi
- Uçtan uca test
- PR inceleme
- Yayın kararı

## 9. Kapsam değişikliği kuralı

Yeni bir özellik önerildiğinde:

1. GitHub issue açılır.
2. İlk ürün için zorunlu olup olmadığı yazılır.
3. Mevcut teslim tarihine ve işlere etkisi değerlendirilir.
4. Ürün sahibi onaylamadan ilk ürün kapsamına alınmaz.
5. Onaylanan değişiklik bu belgede ve ilgili epic/story'lerde güncellenir.

## 10. Ekip onayı

Bu belge PR üzerinden incelenir. Onaylayan ekip üyeleri PR review bırakır. Birleştiğinde ilk ürün için geçerli kapsam ve çalışma anlaşması kabul edilir.
