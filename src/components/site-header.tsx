"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-context";
import { site, waLink } from "@/lib/site";

const nav = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?collection=Attars+%26+Concentrates", label: "Attars" },
  { href: "/discovery", label: "Discovery Set" },
  { href: "/scent-finder", label: "Scent Finder" },
  { href: "/about", label: "The House" },
  { href: "/contact", label: "Scent Bar" },
];

export function SiteHeader() {
  const { count, setDrawerOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <div className="relative z-50 overflow-hidden border-b border-white/5 bg-[#0f0f11] py-2 text-[10px] uppercase tracking-luxe text-champagne/70">
        <div className="flex w-max marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-14 pr-14">
              <span>Free shipping above ₹{site.freeShipAbove}</span>
              <span>Cash on delivery across India</span>
              <span>8 x 2ml discovery set at ₹899</span>
              <span>WhatsApp order · {site.phoneDisplay}</span>
              <span>Same-day pickup at our Pune scent bar</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-ink/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className="h-px w-5 bg-ivory" />
            <span className="h-px w-5 bg-ivory" />
          </button>

          <Link href="/" className="group flex flex-col items-center lg:items-start">
            <span className="font-display text-2xl leading-none tracking-[0.2em] text-ivory">
              SIJ
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-luxe text-champagne/60">
              Fragrances
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[11px] uppercase tracking-[0.18em] text-ivory/70 transition hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={waLink("Hi SIJ Fragrances! I'd like help choosing a fragrance.")}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-gold/40 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-champagne transition hover:bg-gold hover:text-ink md:block"
            >
              WhatsApp Order
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative text-[11px] uppercase tracking-[0.18em] text-ivory transition hover:text-gold"
            >
              Bag
              <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink">
                {count}
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-ink/98 px-5 py-4 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block border-b border-white/5 py-3 text-xs uppercase tracking-[0.18em] text-ivory/80"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waLink("Hi SIJ Fragrances! I'd like to place an order.")}
              className="mt-4 block rounded-full bg-gold py-3 text-center text-[11px] uppercase tracking-[0.18em] text-ink"
            >
              Order on WhatsApp
            </a>
          </div>
        )}
      </header>
    </>
  );
}
