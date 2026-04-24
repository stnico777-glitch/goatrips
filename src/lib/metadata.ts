import type { Metadata } from "next";
import { brandAssets } from "@/lib/brandAssets";
import { defaultDescription, defaultTitle, siteUrl } from "@/lib/site";

export const defaultBrandImage = brandAssets.logo;

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: "%s | GOAT RIPS",
    },
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      locale: "en_US",
      type: "website",
      siteName: "GOAT RIPS",
      images: [{ url: defaultBrandImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [defaultBrandImage],
    },
    robots: { index: true, follow: true },
  };
}

export function pageMetadata(
  title: string,
  description?: string,
): Metadata {
  return {
    title,
    description: description ?? defaultDescription,
    openGraph: { title: `${title} | GOAT RIPS`, description },
    twitter: { title: `${title} | GOAT RIPS`, description },
  };
}
