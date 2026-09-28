import Link from "next/link";
import type { Product } from "@/db/schema";
import { inr } from "@/lib/site";
import { QuickAdd } from "@/components/quick-add";

export function ProductCard({ product }: { product: Product }) {
  const v = product.variants[0];
  const off = Math.round(((v.mrp - v.price) / v.mrp) * 100);

  return (
    <article className="group relative flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#141416]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.imageAlt}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
        {product.badge && (
          <span className="absolute left-3 top-3 bg-ink/80 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-gold backdrop-blur">
            {product.badge}
          </span>
        )}
        {off > 0 && (
          <span className="absolute right-3 top-3 bg-gold px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink">
            {off}% off
          </span>
        )}
        <span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.18em] text-ivory/70">
          {product.family}
        </span>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display text-xl leading-tight text-ivory transition group-hover:text-gold">
              {product.name}
            </h3>
          </Link>
          <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-champagne/70">
            ★ {product.rating}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ivory/45">
          {product.tagline}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-sm text-ivory">{inr(v.price)}</span>
          <span className="text-xs text-ivory/35 line-through">{inr(v.mrp)}</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-ivory/40">/ {v.size}</span>
        </div>
        <div className="mt-4">
          <QuickAdd product={product} />
        </div>
      </div>
    </article>
  );
}
