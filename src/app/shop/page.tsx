import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { siteCopy } from "@/content/siteCopy";
import { pageMetadata } from "@/lib/metadata";
import { getShopifyConfig } from "@/lib/shopify/config";
import { fetchProducts } from "@/lib/shopify/products";
import type { ProductSummary } from "@/lib/shopify/types";

export const metadata: Metadata = pageMetadata(
  siteCopy.shop.title,
  "Browse sealed packs, singles, and collectibles from GOAT RIPS.",
);

function filterProducts(products: ProductSummary[], q: string | undefined) {
  if (!q?.trim()) return products;
  const needle = q.trim().toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(needle) ||
      p.description.toLowerCase().includes(needle),
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const configured = Boolean(getShopifyConfig());
  let products: ProductSummary[] = [];
  let fetchError: string | null = null;
  if (configured) {
    try {
      products = await fetchProducts(48);
    } catch (e) {
      fetchError = e instanceof Error ? e.message : "Could not load products.";
    }
  }
  const visible = filterProducts(products, q);

  return (
    <PageShell>
      <div className="bg-surface-warm px-[var(--container-pad)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-display text-4xl tracking-[0.14em] text-rich-earth md:text-5xl">
            {siteCopy.shop.title}
          </h1>
          {q ? (
            <p className="mt-2 text-sm text-midtone">
              Results for &ldquo;{q}&rdquo; —{" "}
              <Link href="/shop" className="text-collectible underline-offset-4 hover:underline">
                Clear
              </Link>
            </p>
          ) : null}

          {!configured ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-8 text-midtone">
              <p className="text-lg font-semibold text-rich-earth">
                {siteCopy.shop.emptyTitle}
              </p>
              <p className="mt-2 max-w-xl">{siteCopy.shop.emptyBody}</p>
            </div>
          ) : fetchError ? (
            <p className="mt-8 rounded-xl border border-collectible/40 bg-surface p-6 text-midtone">
              {fetchError}
            </p>
          ) : visible.length === 0 ? (
            <p className="mt-10 text-midtone">No products match your search.</p>
          ) : (
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/shop/${p.handle}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-collectible/45 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muzzle">
                      {p.featuredImage?.url ? (
                        <Image
                          src={p.featuredImage.url}
                          alt={p.featuredImage.altText ?? p.title}
                          fill
                          className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-midtone">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h2 className="text-display text-xl tracking-[0.08em] text-rich-earth group-hover:text-collectible">
                        {p.title}
                      </h2>
                      <p className="text-sm font-semibold text-midtone">
                        {Number(p.priceRange.minVariantPrice.amount).toLocaleString(undefined, {
                          style: "currency",
                          currency: p.priceRange.minVariantPrice.currencyCode,
                        })}{" "}
                        {p.priceRange.minVariantPrice.currencyCode}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageShell>
  );
}
