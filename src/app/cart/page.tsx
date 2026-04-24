import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { siteCopy } from "@/content/siteCopy";
import { CartView } from "@/app/cart/CartView";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  siteCopy.cart.title,
  "Review your GOAT RIPS cart and checkout securely with Shopify.",
);

export default function CartPage() {
  return (
    <PageShell>
      <div className="bg-surface-warm px-[var(--container-pad)] py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-display text-4xl tracking-[0.14em] text-rich-earth">
            {siteCopy.cart.title}
          </h1>
          <CartView />
        </div>
      </div>
    </PageShell>
  );
}
