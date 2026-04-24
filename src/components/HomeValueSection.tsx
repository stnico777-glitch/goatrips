import Link from "next/link";
import { BrandRaster } from "@/components/BrandRaster";
import { Reveal } from "@/components/motion/Reveal";
import { siteCopy } from "@/content/siteCopy";
import { brandAssets } from "@/lib/brandAssets";
import { routes } from "@/lib/site";

const valueIcons = [
  brandAssets.iconCard,
  brandAssets.iconRippedPack,
  brandAssets.iconGoatHead,
] as const;

export function HomeValueSection() {
  return (
    <section className="bg-surface-warm px-[var(--container-pad)] py-[var(--section-y)]">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl space-y-4">
          <h2 className="text-display text-4xl tracking-[0.12em] text-rich-earth md:text-5xl">
            {siteCopy.home.valueTitle}
          </h2>
          <p className="text-lg leading-relaxed text-midtone">{siteCopy.home.valueLead}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {siteCopy.home.valuePoints.map((pt, i) => (
            <Reveal key={pt.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-collectible/45 hover:shadow-lg">
                <BrandRaster
                  src={valueIcons[i]!}
                  alt=""
                  className="relative mb-5 h-[4.5rem] w-[4.5rem] shrink-0 opacity-95 transition group-hover:opacity-100"
                  sizes="144px"
                />
                <h3 className="text-display text-xl tracking-[0.1em] text-rich-earth">
                  {pt.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-midtone">{pt.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeCtaBand() {
  return (
    <section className="border-y border-border bg-collectible/15 px-[var(--container-pad)] py-16">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:text-left">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-5">
          <BrandRaster
            src={brandAssets.iconPack}
            alt=""
            className="relative h-24 w-24 shrink-0 opacity-95 md:h-28 md:w-28"
            sizes="160px"
          />
          <div>
            <h2 className="text-display text-3xl tracking-[0.12em] text-rich-earth md:text-4xl">
              {siteCopy.home.ctaBandTitle}
            </h2>
            <p className="mt-2 max-w-xl text-midtone">{siteCopy.home.ctaBandBody}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <Link
            href={routes.shop}
            className="inline-flex rounded-full bg-rich-earth px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-muzzle shadow-md transition hover:bg-deep-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-precious focus-visible:ring-offset-2 focus-visible:ring-offset-collectible/20"
          >
            Shop
          </Link>
          <Link
            href={routes.about}
            className="inline-flex rounded-full border-2 border-rich-earth bg-surface/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-rich-earth backdrop-blur-sm transition hover:bg-rich-earth hover:text-muzzle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rich-earth focus-visible:ring-offset-2 focus-visible:ring-offset-collectible/20"
          >
            About us
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
