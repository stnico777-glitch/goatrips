import type {
  CartLineNode,
  CartState,
  ProductSummary,
  ProductVariant,
} from "@/lib/shopify/types";

export type ProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ProductSummary["featuredImage"];
  priceRange: ProductSummary["priceRange"];
  variants: {
    edges: { node: ProductVariant }[];
  };
};

export function normalizeProduct(node: ProductNode | null): ProductSummary | null {
  if (!node) return null;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    featuredImage: node.featuredImage,
    priceRange: node.priceRange,
    variants: node.variants.edges.map((e) => e.node),
  };
}

type CartGQL = {
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
            featuredImage: ProductSummary["featuredImage"];
          };
        };
      };
    }[];
  };
} | null;

export function normalizeCart(cart: CartGQL): CartState {
  if (!cart) return null;
  const lines: CartLineNode[] = cart.lines.edges.map(({ node: line }) => ({
    id: line.id,
    quantity: line.quantity,
    cost: { totalAmount: line.cost.totalAmount },
    merchandise: {
      id: line.merchandise.id,
      title: line.merchandise.title,
      price: line.merchandise.price,
      product: {
        title: line.merchandise.product.title,
        handle: line.merchandise.product.handle,
        featuredImage: line.merchandise.product.featuredImage,
      },
    },
  }));

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: { totalAmount: cart.cost.totalAmount },
    lines,
  };
}
