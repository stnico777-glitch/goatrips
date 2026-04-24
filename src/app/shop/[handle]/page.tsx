import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { AddToCart } from "@/app/shop/[handle]/AddToCart";
import { getShopifyConfig } from "@/lib/shopify/config";
import { fetchProductByHandle } from "@/lib/shopify/products";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/site";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  if (!getShopifyConfig()) {
    return pageMetadata(handle);
  }
  const product = await fetchProductByHandle(handle);
  if (!product) return { title: "Not found" };
  const plain = product.description.replace(/<[^>]+>/g, "").slice(0, 155);
  return pageMetadata(product.title, plain);
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  if (!getShopifyConfig()) {
    return (
      <PageShell>
        <div className="px-[var(--container-pad)] py-16">
          <p className="text-midtone">Shopify is not configured.</p>
          <Link href={routes.shop} className="mt-4 inline-block text-collectible underline">
            Back to shop
          </Link>
        </div>
      </PageShell>
    );
  }
  const product = await fetchProductByHandle(handle);
  if (!product) notFound();

  const firstAvailable =
    product.variants.find((v) => v.availableForSale) ?? product.variants[0];

  return (
    <PageShell>
      <article className="bg-surface-warm px-[var(--container-pad)] py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muzzle shadow-inner">
            {product.featuredImage?.url ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText ?? product.title}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-midtone">No image</div>
            )}
          </div>
          <div>
            <Link
              href={routes.shop}
              className="text-sm font-medium uppercase tracking-wider text-collectible hover:underline"
            >
              ← All products
            </Link>
            <h1 className="text-display mt-4 text-4xl tracking-[0.1em] text-rich-earth md:text-5xl">
              {product.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-midtone">
              {Number(product.priceRange.minVariantPrice.amount).toLocaleString(undefined, {
                style: "currency",
                currency: product.priceRange.minVariantPrice.currencyCode,
              })}
            </p>
            <div
              className="mt-6 max-w-none space-y-3 text-sm leading-relaxed text-midtone [&_a]:text-collectible [&_a]:underline [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_p]:mb-2"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            {firstAvailable ? (
              <AddToCart variantId={firstAvailable.id} variants={product.variants} />
            ) : (
              <p className="mt-8 text-sm text-midtone">No variants available.</p>
            )}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
