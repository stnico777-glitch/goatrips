export const SHOPIFY_API_VERSION = "2025-01";

export function getShopifyConfig(): {
  domain: string;
  storefrontToken: string;
} | null {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
  const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  if (!domain || !storefrontToken) return null;
  return { domain, storefrontToken };
}

export function storefrontEndpoint(domain: string): string {
  return `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;
}
