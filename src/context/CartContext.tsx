"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getShopifyConfig } from "@/lib/shopify/config";
import { storefrontRequest } from "@/lib/shopify/client";
import { normalizeCart } from "@/lib/shopify/normalize";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_QUERY,
} from "@/lib/shopify/queries";
import type { CartState } from "@/lib/shopify/types";

const STORAGE_KEY = "goatrips_cart_id";

type CartGQLPayload = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        cost: { totalAmount: { amount: string; currencyCode: string } };
        merchandise: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          product: {
            title: string;
            handle: string;
            featuredImage: { url: string; altText: string | null } | null;
          };
        };
      };
    }[];
  };
};

function readUserErrors(
  payload: { userErrors?: { message: string }[] } | undefined,
) {
  const errs = payload?.userErrors?.filter(Boolean) ?? [];
  if (errs.length) throw new Error(errs.map((e) => e.message).join("; "));
}

export type CartContextValue = {
  cart: CartState;
  ready: boolean;
  busy: boolean;
  error: string | null;
  totalQuantity: number;
  refresh: () => Promise<void>;
  addVariant: (variantId: string, quantity?: number) => Promise<void>;
  updateLineQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartState>(null);
  const configured = Boolean(getShopifyConfig());
  const [ready, setReady] = useState(() => !configured);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persistCartId = useCallback((id: string | null) => {
    setCartId(id);
    if (typeof window === "undefined") return;
    if (id) localStorage.setItem(STORAGE_KEY, id);
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const loadCart = useCallback(
    async (id: string) => {
      if (!configured) return;
      const data = await storefrontRequest<{ cart: CartGQLPayload | null }>(
        CART_QUERY,
        { id },
      );
      if (!data.cart) {
        persistCartId(null);
        setCart(null);
        return;
      }
      setCart(normalizeCart(data.cart));
    },
    [configured, persistCartId],
  );

  useEffect(() => {
    if (!configured) return;
    queueMicrotask(() => {
      const id = localStorage.getItem(STORAGE_KEY);
      if (!id) {
        setReady(true);
        return;
      }
      setCartId(id);
      loadCart(id)
        .catch(() => {
          persistCartId(null);
          setCart(null);
        })
        .finally(() => setReady(true));
    });
  }, [configured, loadCart, persistCartId]);

  const refresh = useCallback(async () => {
    if (!cartId || !configured) return;
    await loadCart(cartId);
  }, [cartId, configured, loadCart]);

  const addVariant = useCallback(
    async (variantId: string, quantity = 1) => {
      if (!configured) {
        setError("Shopify is not configured.");
        return;
      }
      setBusy(true);
      setError(null);
      try {
        const lines = [{ merchandiseId: variantId, quantity }];
        if (!cartId) {
          const data = await storefrontRequest<{
            cartCreate: { cart: CartGQLPayload | null; userErrors: { message: string }[] };
          }>(CART_CREATE, { input: { lines } });
          readUserErrors(data.cartCreate);
          const created = data.cartCreate.cart;
          if (!created) throw new Error("Cart create failed");
          persistCartId(created.id);
          setCart(normalizeCart(created));
        } else {
          const data = await storefrontRequest<{
            cartLinesAdd: { cart: CartGQLPayload | null; userErrors: { message: string }[] };
          }>(CART_LINES_ADD, { cartId, lines });
          readUserErrors(data.cartLinesAdd);
          const updated = data.cartLinesAdd.cart;
          if (!updated) throw new Error("Cart update failed");
          setCart(normalizeCart(updated));
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cart error");
      } finally {
        setBusy(false);
      }
    },
    [cartId, configured, persistCartId],
  );

  const updateLineQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId || !configured) return;
      setBusy(true);
      setError(null);
      try {
        const data = await storefrontRequest<{
          cartLinesUpdate: { cart: CartGQLPayload | null; userErrors: { message: string }[] };
        }>(CART_LINES_UPDATE, {
          cartId,
          lines: [{ id: lineId, quantity }],
        });
        readUserErrors(data.cartLinesUpdate);
        const updated = data.cartLinesUpdate.cart;
        if (!updated) throw new Error("Cart update failed");
        setCart(normalizeCart(updated));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cart error");
      } finally {
        setBusy(false);
      }
    },
    [cartId, configured],
  );

  const removeLine = useCallback(
    async (lineId: string) => {
      if (!cartId || !configured) return;
      setBusy(true);
      setError(null);
      try {
        const data = await storefrontRequest<{
          cartLinesRemove: { cart: CartGQLPayload | null; userErrors: { message: string }[] };
        }>(CART_LINES_REMOVE, { cartId, lineIds: [lineId] });
        readUserErrors(data.cartLinesRemove);
        const updated = data.cartLinesRemove.cart;
        if (!updated) {
          persistCartId(null);
          setCart(null);
          return;
        }
        setCart(normalizeCart(updated));
        if (updated.totalQuantity === 0) {
          persistCartId(null);
          setCart(null);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Cart error");
      } finally {
        setBusy(false);
      }
    },
    [cartId, configured, persistCartId],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      ready,
      busy,
      error,
      totalQuantity: cart?.totalQuantity ?? 0,
      refresh,
      addVariant,
      updateLineQuantity,
      removeLine,
    }),
    [addVariant, busy, cart, error, ready, refresh, removeLine, updateLineQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
