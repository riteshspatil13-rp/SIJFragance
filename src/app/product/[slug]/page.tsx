import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductBuy } from "@/components/product-buy";
import { ProductCard } from "@/components/product-card";
import { Meter, ScentPyramid } from "@/components/scent-meters";
import { getProductBySlug, getProducts } from "@/lib/data";
import { inr } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Fragrance not found" };
  return {
    title: `${product.name} — ${product.concentration}`,
    description: `${product.tagline} ${product.description.slice(0, 120)}`,
  };
}

const sillageHint = ["Skin scent", "Close", "Moderate", "Room-filling", "Enters before you"];
const longevityHint = ["2–3 hrs", "4–5 hrs", "6–7 hrs", "8–10 hrs", "12+ hrs"];
const intensityHint = ["Whisper", "Soft", "Balanced", "Rich", "Statement"];

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter((p) => p.slug !== product.slug && p.collection !== "Discovery")
    .sort((a, b) => {
      const score = (x: typeof a) =>
        (x.family === product.family ? 2 : 0) +
        x.moods.filter((m) => product.moods.includes(m)).length;
      return score(b) - score(a);
    })
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
      <nav className="text-[10px] uppercase tracking-[0.16em] text-ivory/35">
        <Link href="/" className="hover:text-gold">Home</Link> /{" "}
        <Link href="/shop" className="hover:text-gold">Shop</Link> /{" "}
        <span className="text-ivory/60">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden bg-[#141416]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.imageAlt}
              className="aspect-[4/5] w-full object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 bg-ink/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-gold backdrop-blur">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-[9px] uppercase tracking-[0.14em] text-ivory/45">
            <span className="border hairline py-3">{product.concentration}</span>
            <span className="border hairline py-3">{product.gender}</span>
            <span className="border hairline py-3">{product.collection}</span>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-luxe text-gold">{product.family}</p>
          <h1 className="mt-4 font-display text-5xl font-light leading-tight lg:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-xl font-light italic text-champagne/80">
            {product.tagline}
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-ivory/40">
            ★ {product.rating} · {product.reviewCount} verified reviews
          </p>

          <p className="mt-7 text-base leading-relaxed text-ivory/65">{product.description}</p>

          <div className="mt-9">
            <ProductBuy product={product} />
          </div>

          <div className="mt-12 grid gap-5 border-t hairline pt-8 sm:grid-cols-3">
            <Meter label="Sillage" value={product.sillage} hint={sillageHint[product.sillage - 1]} />
            <Meter
              label="Longevity"
              value={product.longevity}
              hint={longevityHint[product.longevity - 1]}
            />
            <Meter
              label="Intensity"
              value={product.intensity}
              hint={intensityHint[product.intensity - 1]}
            />
          </div>

          <div className="mt-12 border-t hairline pt-8">
            <h2 className="text-[10px] uppercase tracking-luxe text-gold">The Note Pyramid</h2>
            <div className="mt-6">
              <ScentPyramid
                top={product.topNotes}
                heart={product.heartNotes}
                base={product.baseNotes}
              />
            </div>
          </div>

          <div className="mt-12 border-t hairline pt-8">
            <h2 className="text-[10px] uppercase tracking-luxe text-gold">From the Perfumer</h2>
            <p className="mt-4 font-display text-2xl font-light leading-relaxed text-ivory/80">
              “{product.story}”
            </p>
          </div>

          <div className="mt-12 grid gap-8 border-t hairline pt-8 sm:grid-cols-2">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.18em] text-ivory/40">Wear it for</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.occasions.map((o) => (
                  <span key={o} className="border hairline px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-ivory/65">
                    {o}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.18em] text-ivory/40">Mood</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.moods.map((m) => (
                  <Link
                    key={m}
                    href={`/shop?mood=${encodeURIComponent(m)}`}
                    className="border hairline px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-champagne/80 hover:border-gold"
                  >
                    {m}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-px border-t hairline pt-8">
            {[
              {
                q: "How should I apply it?",
                a: "Two sprays on pulse points — neck and inner wrists — plus one on the chest under clothing for a longer trail. Never rub; friction snaps the top notes.",
              },
              {
                q: "Shipping & delivery",
                a: `Dispatched within 24 hours. Metro cities 2–3 days, rest of India 4–6 days. Free above ${inr(999)}, COD available nationwide.`,
              },
              {
                q: "Returns",
                a: "Unopened bottles can be returned within 7 days of delivery. Opened bottles are non-returnable for hygiene reasons — which is exactly why we sell 2 ml samples.",
              },
            ].map((f) => (
              <details key={f.q} className="group border-b hairline py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-ivory/80">
                  {f.q}
                  <span className="text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ivory/50">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="font-display text-3xl font-light lg:text-4xl">
          If you like {product.name}, wear these next
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

export const dynamic = "force-dynamic";
