import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");
  const paths = [
    "",
    "/shop",
    "/cart",
    "/packs",
    "/blog",
    "/blog/welcome-to-goat-rips",
    "/blog/how-we-source-sealed",
    "/about",
  ];
  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
