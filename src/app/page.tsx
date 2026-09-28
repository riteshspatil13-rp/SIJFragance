import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getBestsellers, getProductBySlug } from "@/lib/data";
import { inr, site, waLink } from "@/lib/site";

const families = [
  { name: "Woody Oriental", note: "Oud · Sandal · Amber", href: "/shop?family=Woody+Oriental" },
  { name: "Floral", note: "Rose · Mogra · Tuberose", href: "/shop?family=Floral" },
  { name: "Gourmand", note: "Coffee · Vanilla · Cocoa", href: "/shop?family=Gourmand" },
  { name: "Citrus Aromatic", note: "Bergamot · Tea · Salt", href: "/shop?family=Citrus+Aromatic" },
  { name: "Earthy", note: "Mitti · Vetiver · Stone", href: "/shop?family=Earthy" },
  { name: "Leather", note: "Suede · Tobacco · Honey", href: "/shop?family=Leather" },
];

const proof = [
  { k: "42,000+", v: "Bottles shipped across India" },
  { k: "4.8 / 5", v: "Average rating, 3,100+ reviews" },
  { k: "90 days", v: "Maceration before bottling" },
  { k: "20–30%", v: "Fragrance oil concentration" },
];

const reviews = [
  {
    text: "I wore Oud Noir Royale to a December wedding in Jaipur and three people stopped me on the way to the buffet. It lasted from the haldi to the last dance.",
    name: "Aarav M.",
    city: "Jaipur",
    item: "Oud Noir Royale",
  },
  {
    text: "The discovery set is the smartest ₹899 I've spent. I sampled everything, fell for Kaapi & Cardamom, and the voucher paid for part of the full bottle.",
    name: "Sneha R.",
    city: "Bengaluru",
    item: "Discovery Set",
  },
  {
    text: "Ordered on WhatsApp at 11 PM, got a reply in four minutes and the parcel in two days. That kind of service from an Indian brand is rare.",
    name: "Imran S.",
    city: "Hyderabad",
    item: "Velvet Saffron",
  },
];

export default async function HomePage() {
  const [bestsellers, discovery] = await Promise.all([
    getBestsellers(4),
    getProductBySlug("discovery-set-eight"),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[88px] flex min-h-[92vh] items-center overflow-hidden pt-[88px]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.jpg"
            alt="SIJ Fragrances signature amber bottle in dramatic light"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-2xl rise">
            <p className="text-[10px] uppercase tracking-luxe text-gold">
              Independent Perfume House · Made in India
            </p>
            <h1 className="mt-6 font-display text-5xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">
              Some people are<br />
              <span className="gold-gradient italic">remembered</span> before<br />
              they are seen.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ivory/60">
              Small-batch attars, 25–30% extraits and everyday luxury built for Indian skin, Indian
              heat and Indian occasions. No middlemen. No marketing tax. Only the oil.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-gold px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-ink transition hover:bg-champagne"
              >
                Shop the House
              </Link>
              <Link
                href="/scent-finder"
                className="rounded-full border border-white/25 px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory transition hover:border-gold hover:text-gold"
              >
                Find Your Scent — 60 sec
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.16em] text-ivory/40">
              <span>Free shipping above {inr(site.freeShipAbove)}</span>
              <span>Cash on delivery</span>
              <span>8 x 2ml samples at ₹899</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="border-y border-white/10 bg-[#0e0e10]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 lg:grid-cols-4 lg:px-8">
          {proof.map((p) => (
            <div key={p.k}>
              <p className="font-display text-3xl text-gold">{p.k}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-ivory/45">{p.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-gold">Most Worn</p>
            <h2 className="mt-4 font-display text-4xl font-light lg:text-5xl">
              The bottles that keep coming back
            </h2>
          </div>
          <Link
            href="/shop"
            className="border-b border-gold/40 pb-1 text-[11px] uppercase tracking-[0.18em] text-champagne hover:text-gold"
          >
            View all 13 fragrances
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* FAMILIES */}
      <section className="border-y border-white/10 bg-[#0e0e10] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-[10px] uppercase tracking-luxe text-gold">Navigate by Feeling</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-light lg:text-5xl">
            Six olfactive families. One of them is already yours.
          </h2>
          <div className="mt-12 grid gap-px border hairline bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((f) => (
              <Link
                key={f.name}
                href={f.href}
                className="group relative bg-[#0e0e10] p-8 transition hover:bg-[#141416]"
              >
                <h3 className="font-display text-2xl text-ivory transition group-hover:text-gold">
                  {f.name}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-ivory/40">
                  {f.note}
                </p>
                <span className="mt-6 inline-block text-[10px] uppercase tracking-[0.18em] text-champagne opacity-0 transition group-hover:opacity-100">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY */}
      {discovery && (
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={discovery.imageUrl}
                alt={discovery.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="absolute left-5 top-5 bg-gold px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-ink">
                Risk-free sampling
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-gold">Start Here</p>
              <h2 className="mt-4 font-display text-4xl font-light lg:text-5xl">
                Never buy a blind bottle again.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ivory/60">
                Scent is intimate and unpredictable — the same oil smells different on you than on a
                blotter. Our Discovery Set gives you eight 2 ml atomisers of the full house, plus a
                ₹500 voucher redeemable on any full bottle. Effectively, sampling is free.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-ivory/60">
                {[
                  "8 × 2 ml sprayable atomisers in a magnetic box",
                  "₹500 voucher inside — valid for 90 days",
                  "Includes a printed note pyramid card for each scent",
                  "Ships free anywhere in India",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold">—</span>
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link
                  href="/discovery"
                  className="rounded-full bg-gold px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-ink transition hover:bg-champagne"
                >
                  Get the set — {inr(discovery.variants[0].price)}
                </Link>
                <span className="text-xs text-ivory/40 line-through">
                  {inr(discovery.variants[0].mrp)}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CRAFT */}
      <section className="border-y border-white/10 bg-[#0e0e10] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-luxe text-gold">The Craft</p>
            <h2 className="mt-4 font-display text-4xl font-light lg:text-5xl">
              Distilled in Kannauj. Composed in Pune. Worn everywhere.
            </h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Sourcing",
                d: "Mitti and rose attars from Kannauj's deg-bhapka distilleries, sandalwood from certified Karnataka plantations, and Grasse-grade aroma molecules for stability in 40°C heat.",
              },
              {
                n: "02",
                t: "Composition",
                d: "Every formula is built at 18–30% oil and tested on six skin types for three weeks before it earns a bottle. If it collapses by hour four, it does not launch.",
              },
              {
                n: "03",
                t: "Maceration",
                d: "Juices rest for 60–90 days in amber glass before filling. This is why the opening is round instead of sharp, and why we can never rush a restock.",
              },
            ].map((s) => (
              <div key={s.n} className="border-t hairline pt-6">
                <p className="font-display text-3xl text-gold/50">{s.n}</p>
                <h3 className="mt-3 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/50">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="text-[10px] uppercase tracking-luxe text-gold">Worn & Reviewed</p>
        <h2 className="mt-4 font-display text-4xl font-light lg:text-5xl">
          3,100+ verified wearers
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="border hairline p-8">
              <p className="text-sm tracking-[0.2em] text-gold">★★★★★</p>
              <blockquote className="mt-5 font-display text-xl font-light leading-relaxed text-ivory/85">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 text-[10px] uppercase tracking-[0.16em] text-ivory/40">
                {r.name} · {r.city} · <span className="text-champagne/70">{r.item}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CONCIERGE */}
      <section className="border-t border-white/10 bg-gradient-to-br from-[#14120c] via-[#0e0e10] to-[#0b0b0c]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-gold">Human, not a chatbot</p>
            <h2 className="mt-4 font-display text-4xl font-light lg:text-5xl">
              Order or get matched on WhatsApp
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/60">
              Tell our fragrance consultant what you already love — a designer bottle, a memory, a
              mood — and we will shortlist three scents, share live stock, and take your order right
              in chat. COD available. Replies within minutes, 11 AM to 9 PM.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={waLink(
                  "Hi SIJ Fragrances! I'd like a personal recommendation. I usually wear: ",
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#1fa855] px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-[#189c4c]"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:+91${site.phoneRaw}`}
                className="rounded-full border border-white/25 px-9 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory transition hover:border-gold hover:text-gold"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="border hairline p-8">
            <h3 className="font-display text-2xl">Prefer to smell before you pay?</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">
              Reserve online, collect in person. Our Pune scent bar lets you test the full range on
              skin, blind-smell against designer references, and walk out with your bottle the same
              day — no shipping fee.
            </p>
            <dl className="mt-7 space-y-4 text-sm">
              <div className="flex justify-between border-b hairline pb-3">
                <dt className="text-ivory/40">Scent Bar</dt>
                <dd className="text-right text-ivory/80">{site.addressLine1}</dd>
              </div>
              <div className="flex justify-between border-b hairline pb-3">
                <dt className="text-ivory/40">Hours</dt>
                <dd className="text-ivory/80">{site.hours}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ivory/40">Pickup</dt>
                <dd className="text-gold">Ready in 2 hours</dd>
              </div>
            </dl>
            <Link
              href="/contact"
              className="mt-8 inline-block border-b border-gold/40 pb-1 text-[11px] uppercase tracking-[0.18em] text-champagne hover:text-gold"
            >
              Plan your visit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export const dynamic = "force-dynamic";
