/** Canonical site URL — set `NEXT_PUBLIC_SITE_URL` in production */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@goatrips.com";

export const routes = {
  home: "/",
  shop: "/shop",
  packs: "/packs",
  blog: "/blog",
  about: "/about",
  cart: "/cart",
} as const;

export const defaultTitle = "GOAT RIPS — Trading Cards & Pack Rips";

export const defaultDescription =
  "Unbox your destiny. Rare cards, sealed packs, and the greatest trading experience — GOAT RIPS.";
