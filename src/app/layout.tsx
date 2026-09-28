import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "SIJ Fragrances — Luxury Attars, Extraits & Everyday Perfume | India",
    template: "%s · SIJ Fragrances",
  },
  description:
    "SIJ Fragrances is an independent Indian perfume house. Small-batch attars, extrait de parfum and budget-luxury scents. Free shipping above ₹999, COD, and WhatsApp ordering on +91 98501 38874.",
  keywords: [
    "perfume India",
    "attar online",
    "luxury perfume",
    "niche fragrance India",
    "SIJ Fragrances",
    "oud attar",
    "discovery set perfume",
  ],
  openGraph: {
    title: "SIJ Fragrances — Scent, Intention, Journey",
    description:
      "Small-batch attars, extraits and everyday luxury perfume, made in India. Try 8 x 2ml before you commit.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: site.name,
              telephone: `+91${site.phoneRaw}`,
              email: site.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: site.addressLine1,
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </head>
      <body className="bg-ink text-ivory antialiased">
        <CartProvider>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <WhatsappFab />
        </CartProvider>
      </body>
    </html>
  );
}
