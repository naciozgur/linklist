import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benim Listelerim",
  description: "Beğendiğin ürünleri topla, düzenle ve kendi profilinde paylaş.",
  openGraph: { title: "Benim Listelerim", description: "Beğendiklerin sana ait bir yerde.", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Benim Listelerim", description: "Beğendiklerin sana ait bir yerde.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
