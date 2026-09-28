# SIJ Fragrances — Production Launch Checklist

## 1) Database (PostgreSQL)
- [ ] Create a managed Postgres instance (Neon / Supabase / Render / Railway / Vercel Postgres)
- [ ] Set `DATABASE_URL` in production environment (must be HTTPS / SSL enabled for Vercel)
- [ ] Run schema push in production:
  ```bash
  npx drizzle-kit push --config drizzle.config.json
  ```
- [ ] Verify tables exist: `products`, `orders`, `subscribers`, `quiz_results`

## 2) Environment Variables (set in hosting dashboard, NOT in `.env` file for production)
```
DATABASE_URL=postgresql://...        # production DB
NEXT_PUBLIC_SITE_NAME=SIJ Fragrances # optional
```
- Remove `DATABASE_URL` from `.env` before committing if using Vercel — set it in the Vercel dashboard only.

## 3) WhatsApp Contact Verification
- Contact number: `+91 98501 38874` (`9850138874` raw)
- WhatsApp format: `919850138874`
- Confirmed in `src/lib/site.ts` — renders on header, product pages, checkout, footer, and floating WhatsApp FAB.

## 4) Domain & SSL
- [ ] Purchase domain (recommended: `sijfragrances.in` or `sijfragrances.com`)
- [ ] Add domain in Vercel → Projects → Settings → Domains
- [ ] Configure A / CNAME records pointing to Vercel
- [ ] SSL: Vercel handles automatically

## 5) Vercel Deployment
```bash
# 1. Push repo to GitHub (or import directly to Vercel)
git init
git add .
git commit -m "SIJ Fragrances production"
git branch -M main
git remote add origin https://github.com/YOUR_USER/sij-fragrances.git
git push -u origin main

# 2. In Vercel dashboard:
#    - Import project from GitHub
#    - Framework Preset: Next.js
#    - Build Command: npm run build (auto-detected)
#    - Output Directory: .next (auto)
#    - Install Command: npm ci
#    - Set DATABASE_URL in Environment Variables
#    - Set Node.js version (18+)
#    - Deploy
```

## 6) Post-Deploy Checks
- [ ] `/api/health` returns `{"ok":true}`
- [ ] `/api/products` returns 13 fragrances
- [ ] `/product/oud-noir-royale` loads with note pyramid and add-to-bag
- [ ] `/discovery` loads Discovery Set
- [ ] `/checkout` accepts order (use test data; do not place real paid orders during QA)
- [ ] `/track` looks up orders by `SIJ-XXXXXX` code
- [ ] `/scent-finder` submits quiz and returns 3 recommendations
- [ ] Floating WhatsApp FAB visible on mobile
- [ ] Cart drawer opens and updates count

## 7) SEO & Tracking (optional but recommended for luxury D2C)
- [ ] Add Google Analytics 4 measurement ID (or Fathom / Plausible for privacy-focused luxury brand)
- [ ] Submit sitemap: `https://sijfragrances.in/sitemap.xml` (Next.js auto-generates)
- [ ] Register with Google Search Console
- [ ] Add `robots.txt` allowing all
- [ ] Verify OpenGraph / Twitter Card previews for `/`, `/shop`, `/discovery`

## 8) WhatsApp Business Setup (critical for Indian D2C)
- [ ] Verify WhatsApp Business API / WhatsApp Business App linked to `+91 98501 38874`
- [ ] Set automated greeting: "Thanks for reaching SIJ Fragrances. A fragrance consultant will respond within 5 minutes."
- [ ] Configure quick replies for common queries: Discovery Set info, shipping timeline, bulk/corporate gifting.

## 9) Monitoring
- [ ] Set up Vercel Analytics (free tier) for Core Web Vitals tracking
- [ ] Monitor `/api/orders` error rate (should be 0%)
- [ ] Set up error tracking (Sentry optional) for production
