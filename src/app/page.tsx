import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { HomeCategoryTiles } from "@/components/HomeCategoryTiles";
import { HomeFaq } from "@/components/HomeFaq";
import { HomeProductRail } from "@/components/HomeProductRail";
import { HomeCtaBand, HomeValueSection } from "@/components/HomeValueSection";
import { PromoMarquee } from "@/components/PromoMarquee";
import { TrustStrip } from "@/components/TrustStrip";
import { defaultDescription, defaultTitle, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  alternates: { canonical: siteUrl },
};

function ProductRailFallback() {
  return (
    <section className="border-y border-border bg-surface-warm px-[var(--container-pad)] py-[var(--section-y)]">
      <div className="mx-auto max-w-6xl animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-border" />
        <div className="h-4 w-full max-w-md rounded bg-border" />
        <div className="mt-8 flex gap-4">
          {["a", "b", "c"].map((k) => (
            <div key={k} className="h-64 w-[min(280px,78vw)] shrink-0 rounded-2xl bg-border/80" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoMarquee />
      <TrustStrip />
      <HomeCategoryTiles />
      <Suspense fallback={<ProductRailFallback />}>
        <HomeProductRail />
      </Suspense>
      <HomeValueSection />
      <HomeFaq />
      <HomeCtaBand />
    </>
  );
}
