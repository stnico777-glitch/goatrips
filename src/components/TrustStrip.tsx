import { BrandRaster } from "@/components/BrandRaster";
import { siteCopy } from "@/content/siteCopy";
import { brandAssets } from "@/lib/brandAssets";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-precious drop-shadow-sm" aria-hidden>
      {"★".repeat(count)}
    </span>
  );
}

export function TrustStrip() {
  const t = siteCopy.home.trustStrip;
  return (
    <div className="border-b border-border bg-surface-warm px-[var(--container-pad)] py-4 md:py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center md:flex-row md:items-center md:gap-8 md:text-left">
        <div className="flex shrink-0 items-center gap-4">
          <BrandRaster
            src={brandAssets.iconGoatHead}
            alt=""
            className="relative h-11 w-11 opacity-90 md:h-12 md:w-12"
            sizes="96px"
          />
          <div className="hidden h-10 w-px bg-border md:block" aria-hidden />
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <Stars count={t.stars} />
            <p className="font-sans text-sm font-semibold tracking-wide text-rich-earth">
              Rated {t.score}/{t.scoreMax}
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-midtone md:border-l md:border-border md:pl-8">
          <span className="text-rich-earth/90">{t.line}</span>{" "}
          <span className="text-midtone">{t.sub}</span>
        </p>
      </div>
    </div>
  );
}
