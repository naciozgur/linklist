"use client";

import { useMemo, useState } from "react";

type Product = { id: number; name: string; brand: string; price?: string; image?: string; note?: string };
type Visibility = "Herkese açık" | "Bağlantıya özel" | "Gizli";
type Collection = { id: string; title: string; description: string; category: string; visibility: Visibility; products: Product[] };

const products: Product[] = [
  { id: 1, name: "Keten karışımlı ceket", brand: "MANGO", price: "3.999 TL", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85", note: "Krem pantolonla çok iyi olabilir." },
  { id: 2, name: "Form sandalye", brand: "NORDIC NEST", price: "8.450 TL", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85", note: "Çalışma masasının yanına." },
  { id: 3, name: "Retro koşu ayakkabısı", brand: "NEW BALANCE", price: "5.799 TL", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Mini deri çanta", brand: "COS", price: "4.250 TL", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Opal masa lambası", brand: "H&M HOME", price: "1.899 TL", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Yün karışımlı kaban", brand: "ZARA", price: "4.990 TL", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Kablosuz kulaklık", brand: "MARSHALL", price: "6.499 TL", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Seramik vazo", brand: "FERM LIVING", price: "2.150 TL", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85" },
  { id: 9, name: "Deri loafer", brand: "MASSIMO DUTTI", price: "3.950 TL", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85" },
  { id: 10, name: "El yapımı yan sehpa", brand: "BAĞIMSIZ MAĞAZA", note: "Fotoğraf bağlantıdan alınamadı." },
];

const collections: Collection[] = [
  { id: "yeni-ev", title: "Yeni ev için", description: "Bir gün aynı evde görmek istediğim sakin, sıcak parçalar.", category: "Ev", visibility: "Herkese açık", products: [products[1], products[4], products[7], products[6], products[3], products[0]] },
  { id: "sonbahar", title: "Sonbahar dolabı", description: "Az parça, bol kombin. Kahve, krem ve biraz bordo.", category: "Giyim", visibility: "Herkese açık", products: [products[0], products[5], products[8], products[3], products[2]] },
  { id: "kendime", title: "Bir ara kendime", description: "Acele etmeden, gerçekten hâlâ istiyorsam.", category: "Genel", visibility: "Bağlantıya özel", products: [products[6], products[3], products[2], products[7], products[9]] },
];

const emptyCollection: Collection = { id: "yeni-liste", title: "Yeni listem", description: "İlk ürününü eklediğinde listen burada canlanacak.", category: "Genel", visibility: "Gizli", products: [] };

function ProductPlaceholder() {
  return <span className="product-placeholder"><Icon name="plus" size={24}/><span>Fotoğraf eklenmemiş</span></span>;
}

function CollectionMosaic({ collection }: { collection: Collection }) {
  const images = collection.products.filter((product) => product.image);
  const count = Math.min(images.length, 4);
  return <span className={`mosaic mosaic-${count}`}>
    {images.slice(0, 4).map((product, index) => <span className="mosaic-tile" key={product.id}><img src={product.image} alt="" />{index === 3 && images.length > 4 && <b>+{images.length - 4}</b>}</span>)}
    {images.length === 0 && <ProductPlaceholder/>}
  </span>;
}

function Icon({ name, size = 20 }: { name: "search" | "plus" | "share" | "grid" | "list" | "arrow" | "heart" | "external" | "bookmark"; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></>, plus: <><path d="M12 5v14M5 12h14"/></>, share: <><circle cx="18" cy="5" r="2.2"/><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="19" r="2.2"/><path d="m8 11 8-5M8 13l8 5"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>, list: <><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="5" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="18" r="1"/></>,
    arrow: <><path d="M19 12H5M11 18l-6-6 6-6"/></>, heart: <path d="M20.5 9.5c0 5-8.5 10-8.5 10s-8.5-5-8.5-10A4.5 4.5 0 0 1 12 7.4a4.5 4.5 0 0 1 8.5 2.1Z"/>, external: <><path d="M14 5h5v5M19 5l-8 8"/><path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"/></>, bookmark: <path d="M6 4.5h12v16l-6-4-6 4Z"/>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function Home() {
  const [screen, setScreen] = useState<"profile" | "collection" | "manual">("profile");
  const [selectedCollection, setSelectedCollection] = useState(collections[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [visitor, setVisitor] = useState(false);
  const [following, setFollowing] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [saved, setSaved] = useState<number[]>([]);
  const [likedCollections, setLikedCollections] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const pinned = useMemo(() => [products[0], products[1], products[3], products[4]], []);

  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(""), 2200); }
  function openCollection(collection: Collection) { setSelectedCollection(collection); setScreen("collection"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function toggleSave(id: number) { const exists = saved.includes(id); setSaved((current) => exists ? current.filter((item) => item !== id) : [...current, id]); notify(exists ? "Kaydedilenlerden çıkarıldı" : "Kendi listene kaydedildi"); }
  function toggleCollectionLike(id: string) { const exists = likedCollections.includes(id); setLikedCollections((current) => exists ? current.filter((item) => item !== id) : [...current, id]); notify(exists ? "Beğeni kaldırıldı" : "Liste beğenildi"); }
  function openProduct(product: Product) { setGalleryIndex(0); setSelectedProduct(product); }
  function galleryFor(product: Product) {
    if (!product.image) return [];
    const source = product.image.split("?")[0];
    return [
      `${source}?auto=format&fit=crop&w=1100&h=1450&q=84`,
      `${source}?auto=format&fit=crop&w=1400&h=820&q=80`,
      `${source}?auto=format&fit=crop&w=900&h=900&q=76`,
      `${source}?auto=format&fit=crop&w=420&h=640&q=52`,
    ];
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="wordmark" onClick={() => setScreen("profile")} aria-label="Ana profile dön">linklist<span>.</span></button>
        <nav className="desktop-nav" aria-label="Ana menü">
          <button className="nav-item active">Profilim</button><button className="nav-item" onClick={() => notify("Tüm ürünler ekranı sonraki tasarım adımında")}>Ürünlerim</button><button className="icon-button" aria-label="Ara"><Icon name="search" /></button>
          <button className="primary-button" onClick={() => setScreen("manual")}><Icon name="plus" size={17}/> Ürün ekle</button><button className="tiny-avatar" onClick={() => setScreen("profile")}>AŞ</button>
        </nav>
      </header>

      <main>
        {screen === "profile" ? <>
          <section className="profile-wrap">
            <div className="owner-switch" role="group" aria-label="Profil görünümü"><button className={!visitor ? "selected" : ""} onClick={() => setVisitor(false)}>Profilim</button><button className={visitor ? "selected" : ""} onClick={() => setVisitor(true)}>Ziyaretçi görünümü</button></div>
            <div className="profile-head">
              <div className="profile-avatar" aria-hidden="true">A</div>
              <div className="profile-copy"><div className="eyebrow">@ahmetsirin</div><h1>Ahmet Şirin</h1><p>İyi tasarlanmış şeyler, sıcak evler ve uzun süre giyilecek parçalar.</p><div className="stats"><span><b>3</b> liste</span><span><b>46</b> ürün</span><span><b>128</b> takipçi</span></div></div>
              <div className="profile-actions">{visitor ? <button className={following ? "secondary-button followed" : "primary-button"} onClick={() => setFollowing(!following)}>{following ? "Takip ediliyor" : "Takip et"}</button> : <button className="secondary-button" onClick={() => notify("Profil düzenleme açılacak")}>Profili düzenle</button>}<button className="icon-button bordered" aria-label="Profili paylaş" onClick={() => notify("Profil bağlantısı kopyalandı")}><Icon name="share"/></button></div>
            </div>
          </section>

          <section className="collections-wrap">
            {!visitor && <div className="collections-head actions-only"><button className="secondary-button" onClick={() => openCollection(emptyCollection)}><Icon name="plus" size={17}/> Liste oluştur</button></div>}
            <div className="collection-stack">{collections.map((collection) => <article className="collection-card" key={collection.id}>
              <button className="collection-collage" onClick={() => openCollection(collection)} aria-label={`${collection.title} listesini aç`}><CollectionMosaic collection={collection}/></button>
              <div className="collection-info"><div className="collection-meta-row"><div className="eyebrow">{collection.products.length} ürün · {collection.category}</div><span className={`visibility-badge visibility-${collection.visibility === "Herkese açık" ? "public" : collection.visibility === "Gizli" ? "private" : "link"}`}>{collection.visibility}</span></div><button className="title-link" onClick={() => openCollection(collection)}><h3>{collection.title}</h3></button><p>{collection.description}</p><div className="collection-foot"><button onClick={() => openCollection(collection)}>Listeyi gör <span>→</span></button><button className="round-action" aria-label="Listeyi paylaş" onClick={() => notify("Liste bağlantısı kopyalandı")}><Icon name="share" size={18}/></button></div></div>
              <button className={likedCollections.includes(collection.id) ? "collection-like active" : "collection-like"} aria-label="Listeyi beğen" onClick={() => toggleCollectionLike(collection.id)}><Icon name="heart" size={19}/></button>
            </article>)}</div>
          </section>
          <section className="profile-wrap pinned-wrap">
            <section className="pinned-section">
              <div className="section-label"><span>Şu ara aklımda</span><small>Ahmet’in seçtiği 4 ürün</small></div>
              <div className="pinned-grid">{pinned.map((product) => <button className="pinned-card" key={product.id} onClick={() => openProduct(product)}><span className="pinned-image"><img src={product.image} alt={product.name}/></span><span className="pinned-copy"><strong>{product.name}</strong><small>{product.brand}</small><span>{product.price ?? "Fiyat belirtilmemiş"}</span></span></button>)}</div>
            </section>
          </section>
        </> : screen === "collection" ? <section className="collection-page">
          <button className="back-button" onClick={() => setScreen("profile")}><Icon name="arrow" size={19}/> Ahmet’in profili</button>
          <div className="collection-title-row"><div><div className="collection-meta-row"><div className="eyebrow">{selectedCollection.products.length} ürün · {selectedCollection.category}</div><span className={`visibility-badge visibility-${selectedCollection.visibility === "Herkese açık" ? "public" : selectedCollection.visibility === "Gizli" ? "private" : "link"}`}>{selectedCollection.visibility}</span></div><h1>{selectedCollection.title}</h1><p>{selectedCollection.description}</p><div className="mini-owner"><span>AŞ</span> Ahmet Şirin · 3 gün önce güncellendi</div></div><div className="collection-actions">{visitor ? <button className="secondary-button"><Icon name="bookmark" size={17}/> Listeyi kaydet</button> : <button className="secondary-button" onClick={() => setScreen("manual")}><Icon name="plus" size={17}/> Ürün ekle</button>}<button className="icon-button bordered" aria-label="Listeyi paylaş" onClick={() => notify("Liste bağlantısı kopyalandı")}><Icon name="share"/></button></div></div>
          <div className="product-toolbar"><span>{selectedCollection.products.length} ürün</span><div className="view-toggle"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Galeri görünümü"><Icon name="grid" size={18}/></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="Liste görünümü"><Icon name="list" size={18}/></button></div></div>
          {selectedCollection.products.length === 0 ? <div className="empty-list-state"><span className="empty-symbol"><Icon name="plus" size={26}/></span><div className="eyebrow">Liste hazır</div><h2>İlk ürününü ekle</h2><p>Bir mağaza bağlantısı yapıştırabilir ya da ürünü elle tamamlayabilirsin.</p><button className="secondary-button" onClick={() => setScreen("manual")}><Icon name="plus" size={17}/> Ürün ekle</button></div> : <div className={view === "grid" ? "product-grid" : "product-list"}>{selectedCollection.products.map((product) => <article className="product-card" key={product.id}><div className="product-image-wrap"><button className="product-image" onClick={() => product.image && openProduct(product)}>{product.image ? <img src={product.image} alt={product.name}/> : <ProductPlaceholder/>}</button><button className={saved.includes(product.id) ? "save active" : "save"} aria-label="Ürünü kaydet" onClick={() => toggleSave(product.id)}><Icon name="heart" size={19}/></button></div><div className="product-copy"><div><span>{product.brand}</span></div><button onClick={() => product.image && openProduct(product)}><h3>{product.name}</h3></button><p>{product.price ?? "Fiyat belirtilmemiş"}</p></div></article>)}</div>}
        </section> : <section className="manual-page">
          <button className="back-button" onClick={() => setScreen("collection")}><Icon name="arrow" size={19}/> {selectedCollection.title}</button>
          <div className="manual-intro"><div className="eyebrow">Bağlantı okunamadı</div><h1>Ürünü elle tamamla</h1><p>Bulabildiğimiz alanları koruduk. Eksik bilgileri ekleyip ürününü listene kaydedebilirsin.</p></div>
          <form className="manual-form" onSubmit={(event) => { event.preventDefault(); notify("Ürün listeye kaydedildi"); setScreen("collection"); }}>
            <label className="photo-upload"><ProductPlaceholder/><span>Fotoğraf seç</span></label>
            <div className="form-fields"><label>Ürün adı<input placeholder="Örn. Keten gömlek" required/></label><div className="form-row"><label>Fiyat <small>isteğe bağlı</small><input placeholder="0,00 TL"/></label><label>Mağaza / marka<input placeholder="Mağaza adı" required/></label></div><label>Ürün bağlantısı<input type="url" placeholder="https://..." required/></label><label>Not <small>isteğe bağlı</small><textarea rows={4} placeholder="Bu ürünü neden kaydettin?"/></label><div className="form-actions"><button type="submit" className="primary-button">Listeye kaydet</button><button type="button" className="secondary-button" onClick={() => setScreen("collection")}>Vazgeç</button></div></div>
          </form>
        </section>}
      </main>

      <nav className="mobile-nav" aria-label="Mobil menü"><button className="active" onClick={() => setScreen("profile")}><span className="mobile-avatar">AŞ</span>Profilim</button><button onClick={() => notify("Ürünlerim ekranı sonraki tasarım adımında")}><Icon name="grid"/>Ürünlerim</button><button onClick={() => setScreen("manual")}><span className="mobile-add"><Icon name="plus"/></span>Ekle</button></nav>

      {selectedProduct && <div className="product-detail-overlay" role="dialog" aria-modal="true" aria-label="Ürün detayı">
        <header className="mobile-detail-header">
          <button aria-label="Ürün detayından geri dön" onClick={() => setSelectedProduct(null)}><Icon name="arrow" size={22}/></button>
          <button className="mobile-detail-context" onClick={() => { setSelectedProduct(null); openCollection(selectedCollection); }}><small>{selectedCollection.title}</small><span>{selectedProduct.name}</span></button>
          <div className="mobile-detail-actions">
            <button aria-label="Ürünü paylaş" onClick={() => notify("Ürün bağlantısı kopyalandı")}><Icon name="share" size={20}/></button>
            <button className={saved.includes(selectedProduct.id) ? "active" : ""} aria-label="Ürünü kaydet" onClick={() => toggleSave(selectedProduct.id)}><Icon name="heart" size={21}/></button>
          </div>
        </header>
        <button className="detail-close" aria-label="Ürün detayını kapat" onClick={() => setSelectedProduct(null)}>×</button><div className="product-detail-page"><div className="product-media-area"><div className="product-media-stack" onScroll={(event) => { const gallery = event.currentTarget; setGalleryIndex(Math.round(gallery.scrollLeft / gallery.clientWidth)); }}>{galleryFor(selectedProduct).map((image, index) => <figure key={index}><img className={`gallery-crop-${index}`} src={image} alt={`${selectedProduct.name}, ${index + 1}. görünüm`}/><figcaption>{index + 1} / {galleryFor(selectedProduct).length}</figcaption></figure>)}</div><div className="mobile-gallery-dots" aria-label={`${galleryIndex + 1}. fotoğraf gösteriliyor`}>{galleryFor(selectedProduct).map((_, index) => <span key={index} className={galleryIndex === index ? "active" : ""}/>)}</div></div><aside className="product-detail-info"><div className="drawer-brand">{selectedProduct.brand}</div><h2>{selectedProduct.name}</h2><div className="drawer-price">{selectedProduct.price ?? "Fiyat belirtilmemiş"}</div><p className="price-note">Fiyat 21 Ağustos’ta kaydedildi.</p>{selectedProduct.note && <div className="personal-note"><span>Ahmet’in notu</span><p>“{selectedProduct.note}”</p></div>}<button className="store-button" onClick={() => notify("Mağaza bağlantısı açılacak")}>Mağazada gör <Icon name="external" size={18}/></button><button className={saved.includes(selectedProduct.id) ? "save-product saved" : "save-product"} onClick={() => toggleSave(selectedProduct.id)}><Icon name="heart" size={18}/>{saved.includes(selectedProduct.id) ? "Listene kaydedildi" : "Kendi listene kaydet"}</button><div className="belongs"><span>Bulunduğu liste</span><button onClick={() => { setSelectedProduct(null); openCollection(selectedCollection); }}>{selectedCollection.title} →</button></div></aside></div>
      </div>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
