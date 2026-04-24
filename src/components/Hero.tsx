"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { siteCopy } from "@/content/siteCopy";
import { brandAssets } from "@/lib/brandAssets";
import { routes } from "@/lib/site";

export function Hero() {
  return (
    <section
      className="hero-viewport-h relative flex flex-col items-center justify-center overflow-hidden bg-hero-bg px-[var(--container-pad)] pb-24 pt-[calc(var(--header-offset)+1.25rem)] md:pb-20 md:pt-[calc(var(--header-offset)+1.75rem)]"
      aria-label="Intro"
    >
      <div className="absolute inset-0 z-0 overflow-hidden motion-reduce:hidden">
        <video
          className="absolute inset-0 h-full w-full origin-center scale-[1.06] object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        >
          <source src={brandAssets.heroVideo} type="video/mp4" />
        </video>
      </div>

      <div
        className="absolute inset-0 z-0 hidden bg-hero-bg motion-reduce:block"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-rich-earth/15 via-rich-earth/22 to-rich-earth/28 motion-reduce:from-rich-earth/18 motion-reduce:via-rich-earth/22 motion-reduce:to-rich-earth/26"
        aria-hidden
      />

      <Reveal
        className="relative z-10 max-w-3xl text-center"
        from="up"
        trigger="mount"
        delay={0.15}
      >
        <h1 className="text-display text-hero-headline text-muzzle text-4xl leading-[1.05] tracking-[0.08em] md:text-6xl md:tracking-[0.1em]">
          {siteCopy.hero.line1}
        </h1>
        <p className="text-display text-hero-subline mt-3 text-3xl text-precious tracking-[0.12em] md:text-5xl">
          {siteCopy.hero.line2}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={routes.shop}
            className="text-hero-subline inline-flex items-center justify-center rounded-full border-2 border-collectible bg-collectible px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-muzzle shadow-lg transition hover:bg-precious hover:text-rich-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-precious focus-visible:ring-offset-2 focus-visible:ring-offset-rich-earth"
          >
            {siteCopy.hero.ctaShop}
          </Link>
          <Link
            href={routes.packs}
            className="text-hero-subline inline-flex items-center justify-center rounded-full border-2 border-muzzle/50 bg-muzzle/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-muzzle backdrop-blur-sm transition hover:border-muzzle hover:bg-muzzle/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muzzle focus-visible:ring-offset-2 focus-visible:ring-offset-rich-earth"
          >
            {siteCopy.hero.ctaPacks}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
