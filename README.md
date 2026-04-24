# GOAT RIPS

Next.js storefront for GOAT RIPS — trading cards, sealed packs, and Shopify checkout.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in values.

- **`NEXT_PUBLIC_SITE_URL`** — Canonical URL (no trailing slash), used for metadata and `sitemap.xml`.
- **`NEXT_PUBLIC_CONTACT_EMAIL`** — Shown in the footer.
- **`NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`** — e.g. `your-store.myshopify.com`.
- **`NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`** — Storefront API access token from a custom app in Shopify Admin (Settings → Apps and sales channels → Develop apps → Storefront API).

The Storefront API version used in code is **2025-01** (`src/lib/shopify/config.ts`). Adjust if your token is pinned to another version.

## Shopify checklist

1. Create products and variants in Shopify Admin.
2. Create a **custom app** with **Storefront API** access enabled; install the app and copy the **Storefront API access token**.
3. Grant scopes needed for products and cart (read products, unauthenticated cart read/write — match [Shopify access scopes](https://shopify.dev/docs/api/usage/access-scopes) for your use case).
4. Set the domain and token in `.env.local`, restart `npm run dev`.

Cart data is stored in `localStorage` under `goatrips_cart_id`. Checkout uses Shopify’s hosted `checkoutUrl`.

## Brand assets

Logo and icons live under `public/brand/` (copied from your **goat rips assets** folder on the Desktop). Paths are centralized in `src/lib/brandAssets.ts` — update files there if you rename assets.

- `logo.png` — circular GOAT RIPS mark (header, hero, OG preview, favicons). Rendered via [`BrandLogo`](src/components/BrandLogo.tsx) with **`unoptimized`** so Next.js does not re-encode the PNG (keeps edges sharp).
- `icon-*.png` — brand icons used on the home page value cards and CTA band

### Hero video

Add **`public/hero.mp4`** (H.264 + AAC, landscape, a few seconds looping). The home hero plays it full-bleed behind the logo and headline (`src/components/Hero.tsx`). Until the file exists, the poster (`logo.png`) may flash briefly; with **prefers-reduced-motion**, video is skipped and a gradient background is shown instead.

### Home Pokémon card mocks

Until Shopify returns products, the home “product rail” shows **`HomePackMocks`** using scans in **`public/cards/`** (`card-01.png` … `card-09.png`). Swap images or edit the list in [`src/lib/mockCards.ts`](src/lib/mockCards.ts) and labels in that file as needed.
