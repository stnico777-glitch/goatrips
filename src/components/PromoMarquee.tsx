"use client";

import { siteCopy } from "@/content/siteCopy";

export function PromoMarquee() {
  const lines = siteCopy.promo.lines;
  return (
    <div
      className="relative flex h-[var(--promo-marquee-height)] items-center overflow-hidden border-b border-collectible/25 bg-rich-earth text-[10px] font-semibold uppercase tracking-[0.22em] text-precious md:text-[11px]"
      aria-hidden
    >
      <div className="marquee-track flex w-max shrink-0">
        <div className="flex items-center gap-x-10 px-6 md:gap-x-14">
          {lines.map((line) => (
            <span key={line} className="whitespace-nowrap">
              {line}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-x-10 px-6 md:gap-x-14" aria-hidden>
          {lines.map((line) => (
            <span key={`dup-${line}`} className="whitespace-nowrap">
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
