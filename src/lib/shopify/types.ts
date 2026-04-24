export type Money = {
  amount: string;
  currencyCode: string;
};

export type StorefrontImage = {
  url: string;
  altText: string | null;
  width?: number | null;
  height?: number | null;
} | null;

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};

export type ProductSummary = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: StorefrontImage;
  priceRange: { minVariantPrice: Money };
  variants: ProductVariant[];
};

export type CartLineMerch = {
  id: string;
  title: string;
  product: { title: string; handle: string; featuredImage: StorefrontImage };
  price: Money;
};

export type CartLineNode = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: CartLineMerch;
};

export type CartState = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { totalAmount: Money };
  lines: CartLineNode[];
} | null;
