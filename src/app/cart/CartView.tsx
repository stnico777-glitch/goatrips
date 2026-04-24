"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteCopy } from "@/content/siteCopy";
import { getShopifyConfig } from "@/lib/shopify/config";
import { routes } from "@/lib/site";

export function CartView() {
  const { cart, ready, busy, error, updateLineQuantity, removeLine } = useCart();
  const configured = Boolean(getShopifyConfig());

  if (!configured) {
    return (
      <p className="mt-8 text-midtone">
        Connect Shopify via environment variables to use the cart.
      </p>
    );
  }

  if (!ready) {
    return <p className="mt-8 text-midtone">Loading cart…</p>;
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="mt-10 space-y-6">
        <p className="text-midtone">{siteCopy.cart.empty}</p>
        <Link
          href={routes.shop}
          className="inline-flex rounded-full bg-collectible px-6 py-3 text-sm font-semibold uppercase tracking-wider text-muzzle transition hover:bg-precious hover:text-rich-earth"
        >
          {siteCopy.cart.continue}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-8">
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <ul className="space-y-6">
        {cart.lines.map((line) => (
          <li
            key={line.id}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muzzle">
              {line.merchandise.product.featuredImage?.url ? (
                <Image
                  src={line.merchandise.product.featuredImage.url}
                  alt={
                    line.merchandise.product.featuredImage.altText ??
                    line.merchandise.product.title
                  }
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/shop/${line.merchandise.product.handle}`}
                className="text-display text-lg tracking-wide text-rich-earth hover:text-collectible"
              >
                {line.merchandise.product.title}
              </Link>
              <p className="text-xs text-midtone">{line.merchandise.title}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-midtone">
                  Qty
                  <input
                    type="number"
                    min={1}
                    key={`${line.id}-${line.quantity}`}
                    className="w-16 rounded-lg border border-border px-2 py-1 text-rich-earth"
                    defaultValue={line.quantity}
                    disabled={busy}
                    onBlur={(e) => {
                      const n = Number(e.target.value);
                      if (Number.isFinite(n) && n >= 1 && n !== line.quantity) {
                        void updateLineQuantity(line.id, n);
                      }
                    }}
                  />
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-collectible underline-offset-2 hover:underline"
                  disabled={busy}
                  onClick={() => removeLine(line.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right text-sm font-semibold text-rich-earth">
              {Number(line.cost.totalAmount.amount).toLocaleString(undefined, {
                style: "currency",
                currency: line.cost.totalAmount.currencyCode,
              })}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-rich-earth">
          Total{" "}
          {Number(cart.cost.totalAmount.amount).toLocaleString(undefined, {
            style: "currency",
            currency: cart.cost.totalAmount.currencyCode,
          })}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={routes.shop}
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold uppercase tracking-wider text-rich-earth transition hover:border-collectible"
          >
            {siteCopy.cart.continue}
          </Link>
          <a
            href={cart.checkoutUrl}
            className="inline-flex items-center justify-center rounded-full bg-rich-earth px-6 py-3 text-sm font-semibold uppercase tracking-wider text-muzzle transition hover:bg-deep-shadow"
          >
            {siteCopy.cart.checkout}
          </a>
        </div>
      </div>
    </div>
  );
}
