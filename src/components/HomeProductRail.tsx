import Image from "next/image";
import Link from "next/link";
import { HomePackMocks } from "@/components/HomePackMocks";
import { Reveal } from "@/components/motion/Reveal";
import { ViewAllLink } from "@/components/ViewAllLink";
import { siteCopy } from "@/content/siteCopy";
import { getShopifyConfig } from "@/lib/shopify/config";
import { fetchProducts } from "@/lib/shopify/products";
import { routes } from "@/lib/site";

export async function HomeProductRail() {
  const copy = siteCopy.home.productRail;
  const configured = Boolean(getShopifyConfig());
  let products: Awaited<ReturnType<typeof fetchProducts>> = [];
  let loadFailed = false;

  if (configured) {
    try {
      products = await fetchProducts(14);
    } catch {
      loadFailed = true;
    }
  }

  const showMocks = !configured || loadFailed || products.length === 0;

  return (
    <section className="border-y border-border bg-surface-warm px-[var(--container-pad)] py-[var(--section-y)]">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-display text-3xl tracking-[0.12em] text-rich-earth md:text-4xl">
              {showMocks ? copy.titleMocks : copy.titleLive}
            </h2>
            <p className="mt-2 max-w-xl text-midtone">
              {showMocks ? copy.subtitleMocks : copy.subtitleLive}
            </p>
          </div>
          <ViewAllLink href={routes.shop} label={copy.cta} className="md:pb-0.5" />
        </Reveal>

        {showMocks ? (
          <HomePackMocks />
        ) : (
          <div className="rail-scroll mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1">
            {products.map((p, i) => (
              <Reveal
                key={p.id}
                className="w-[min(280px,78vw)] shrink-0 snap-start"
                delay={Math.min(i, 6) * 0.04}
                trigger="view"
              >
                <Link
                  href={`/shop/${p.handle}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-collectible/45 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muzzle">
                    {p.featuredImage?.url ? (
                      <Image
                        src={p.featuredImage.url}
                        alt={p.featuredImage.altText ?? p.title}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.05]"
                        sizes="280px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-midtone">
                        No image
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 rounded-full bg-rich-earth/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muzzle opacity-0 transition group-hover:opacity-100">
                      View
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-4">
                    <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-rich-earth group-hover:text-collectible">
                      {p.title}
                    </h3>
                    <p className="text-xs font-semibold text-midtone">
                      {Number(p.priceRange.minVariantPrice.amount).toLocaleString(undefined, {
                        style: "currency",
                        currency: p.priceRange.minVariantPrice.currencyCode,
                      })}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
