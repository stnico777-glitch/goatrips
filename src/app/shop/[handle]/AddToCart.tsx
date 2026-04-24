"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { ProductVariant } from "@/lib/shopify/types";

type Props = {
  variantId: string;
  variants: ProductVariant[];
};

export function AddToCart({ variantId, variants }: Props) {
  const { addVariant, busy, error, ready } = useCart();
  const [selectedId, setSelectedId] = useState(variantId);
  const selected = useMemo(
    () => variants.find((v) => v.id === selectedId) ?? variants[0],
    [selectedId, variants],
  );

  const canBuy = selected?.availableForSale ?? false;

  return (
    <div className="mt-10 space-y-4 border-t border-border pt-8">
      {variants.length > 1 ? (
        <label className="block text-sm font-semibold uppercase tracking-wider text-rich-earth">
          Option
          <select
            className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-rich-earth outline-none focus:border-collectible"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                {v.title} {!v.availableForSale ? "(sold out)" : ""}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={!ready || !canBuy || busy}
        onClick={() => addVariant(selected.id, 1)}
        className="inline-flex w-full items-center justify-center rounded-full bg-collectible py-4 text-sm font-semibold uppercase tracking-[0.2em] text-muzzle shadow-md transition hover:bg-precious hover:text-rich-earth disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-[14rem]"
      >
        {busy ? "Adding…" : canBuy ? "Add to cart" : "Sold out"}
      </button>
    </div>
  );
}
