import { getShopifyConfig } from "@/lib/shopify/config";
import { storefrontRequest } from "@/lib/shopify/client";
import { normalizeProduct, type ProductNode } from "@/lib/shopify/normalize";
import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "@/lib/shopify/queries";
import type { ProductSummary } from "@/lib/shopify/types";

type ProductsData = {
  products: {
    edges: { node: ProductNode }[];
  };
};

type ProductData = {
  product: ProductNode | null;
};

export async function fetchProducts(first = 24): Promise<ProductSummary[]> {
  if (!getShopifyConfig()) return [];
  const data = await storefrontRequest<ProductsData>(PRODUCTS_QUERY, {
    first,
  });
  return data.products.edges
    .map((e) => normalizeProduct(e.node))
    .filter(Boolean) as ProductSummary[];
}

export async function fetchProductByHandle(
  handle: string,
): Promise<ProductSummary | null> {
  if (!getShopifyConfig()) return null;
  const data = await storefrontRequest<ProductData>(PRODUCT_BY_HANDLE_QUERY, {
    handle,
  });
  return normalizeProduct(data.product);
}
