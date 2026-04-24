import { getShopifyConfig, storefrontEndpoint } from "@/lib/shopify/config";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function storefrontRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const cfg = getShopifyConfig();
  if (!cfg) {
    throw new Error("Shopify is not configured");
  }

  const res = await fetch(storefrontEndpoint(cfg.domain), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": cfg.storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Empty Shopify response");
  }
  return json.data;
}
