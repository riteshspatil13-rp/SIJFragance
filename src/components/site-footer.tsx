import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { site, waLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08080a]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <p className="font-display text-3xl tracking-[0.2em]">SIJ</p>
          <p className="mt-1 text-[10px] uppercase tracking-luxe text-champagne/60">Fragrances</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/50">
            {site.tagline} An independent Indian perfume house crafting attars, extraits and
            everyday luxury in small batches.
          </p>
          <div className="mt-6 flex gap-3 text-[10px] uppercase tracking-[0.16em] text-ivory/40">
            <span className="border hairline px-3 py-1">IFRA Compliant</span>
            <span className="border hairline px-3 py-1">Cruelty Free</span>
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-ivory/60">
            <li><Link href="/shop" className="hover:text-gold">All Fragrances</Link></li>
            <li><Link href="/shop?collection=Attars+%26+Concentrates" className="hover:text-gold">Attars & Concentrates</Link></li>
            <li><Link href="/shop?collection=Budget-Luxury" className="hover:text-gold">Budget-Luxury Line</Link></li>
            <li><Link href="/discovery" className="hover:text-gold">Discovery Set</Link></li>
            <li><Link href="/scent-finder" className="hover:text-gold">Scent Finder Quiz</Link></li>
            <li><Link href="/track" className="hover:text-gold">Track My Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold">The House</h4>
          <ul className="mt-5 space-y-3 text-sm text-ivory/60">
            <li><Link href="/about" className="hover:text-gold">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Scent Bar & Pickup</Link></li>
            <li><Link href="/faq" className="hover:text-gold">FAQ & Shipping</Link></li>
            <li>
              <a href={waLink("Hi SIJ Fragrances!")} className="hover:text-gold" target="_blank" rel="noreferrer">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold">The Olfactive Letter</h4>
          <p className="mt-5 text-sm text-ivory/50">
            New harvests, restocks and members-only pre-launches. Plus 10% off your first order.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[10px] uppercase tracking-[0.16em] text-ivory/35 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legal}. All rights reserved.</p>
          <p>{site.addressLine1}, {site.addressLine2}</p>
          <p>UPI · Cards · Netbanking · COD</p>
        </div>
      </div>
    </footer>
  );
}
