import Link from "next/link";
import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { getFacets, getProducts } from "@/lib/data";

export const metadata = {
  title: "Shop All Fragrances",
  description:
    "Browse SIJ Fragrances — attars, extraits, budget-luxury perfumes and discovery sets. Filter by olfactive family, mood and budget.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filters = {
    family: one(sp.family),
    gender: one(sp.gender),
    collection: one(sp.collection),
    mood: one(sp.mood),
    q: one(sp.q),
    sort: one(sp.sort),
    max: one(sp.max) ? Number(one(sp.max)) : undefined,
  };

  const [items, facets] = await Promise.all([getProducts(filters), getFacets()]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <nav className="text-[10px] uppercase tracking-[0.16em] text-ivory/35">
        <Link href="/" className="hover:text-gold">Home</Link> / Shop
      </nav>
      <h1 className="mt-5 font-display text-5xl font-light lg:text-6xl">The Collection</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/50">
        Thirteen compositions across attars, extraits and everyday eau de parfum. Every bottle is
        macerated for 60–90 days and tested for Indian climate before it ships.
      </p>

      <div className="mt-12">
        <Suspense fallback={<div className="h-24" />}>
          <ShopFilters facets={facets} total={items.length} />
        </Suspense>
      </div>

      {items.length === 0 ? (
        <div className="mt-20 border hairline p-14 text-center">
          <p className="font-display text-3xl">No match — yet.</p>
          <p className="mt-3 text-sm text-ivory/50">
            Try widening your filters, or let our consultant match you on WhatsApp.
          </p>
          <Link
            href="/scent-finder"
            className="mt-7 inline-block rounded-full bg-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-ink"
          >
            Take the Scent Finder
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
