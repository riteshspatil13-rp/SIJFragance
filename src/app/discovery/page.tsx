import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBuy } from "@/components/product-buy";
import { getProductBySlug, getProducts } from "@/lib/data";
import { inr } from "@/lib/site";

export const metadata = {
  title: "The Discovery Set — 8 × 2ml",
  description:
    "Sample eight SIJ fragrances in 2ml sprayable atomisers for ₹899, with a ₹500 voucher redeemable on any full bottle. Free shipping across India.",
};

export default async function DiscoveryPage() {
  const set = await getProductBySlug("discovery-set-eight");
  if (!set) notFound();
  const all = await getProducts();
  const included = all.filter((p) => p.collection !== "Discovery").slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <nav className="text-[10px] uppercase tracking-[0.16em] text-ivory/35">
        <Link href="/" className="hover:text-gold">Home</Link> / Discovery Set
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden bg-[#141416]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={set.imageUrl} alt={set.imageAlt} className="aspect-[4/5] w-full object-cover" />
          <span className="absolute left-4 top-4 bg-gold px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-ink">
            ₹500 voucher inside
          </span>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold">Risk-free sampling</p>
          <h1 className="mt-4 font-display text-5xl font-light leading-tight lg:text-6xl">
            The Discovery Set
          </h1>
          <p className="mt-4 font-display text-xl font-light italic text-champagne/80">{set.tagline}</p>
          <p className="mt-6 text-base leading-relaxed text-ivory/60">{set.description}</p>
          <div className="mt-9">
            <ProductBuy product={set} />
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="font-display text-4xl font-light">What&apos;s inside the box</h2>
        <p className="mt-3 text-sm text-ivory/45">
          Eight 2 ml sprayable atomisers — enough for 25–30 wears in total.
        </p>
        <div className="mt-10 grid gap-px border hairline bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {included.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`} className="group bg-ink p-6 transition hover:bg-[#141416]">
              <p className="text-[9px] uppercase tracking-[0.18em] text-gold/70">{p.family}</p>
              <h3 className="mt-3 font-display text-2xl group-hover:text-gold">{p.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-ivory/45">{p.tagline}</p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-ivory/35">
                Full bottle from {inr(p.variants[0].price)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-10 border-t hairline pt-14 md:grid-cols-3">
        {[
          { t: "Sample on skin", d: "Spray one scent per day on a clean wrist. Live with it for six hours before judging the drydown." },
          { t: "Note your favourite", d: "Each card carries the note pyramid, sillage and longevity so you can compare properly." },
          { t: "Redeem ₹500", d: "Use code inside the box against any full bottle within 90 days. Stackable with free shipping." },
        ].map((s, i) => (
          <div key={s.t}>
            <p className="font-display text-3xl text-gold/50">0{i + 1}</p>
            <h3 className="mt-3 font-display text-2xl">{s.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/50">{s.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";
