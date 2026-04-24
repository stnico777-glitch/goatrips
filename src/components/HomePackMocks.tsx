import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { siteCopy } from "@/content/siteCopy";
import { mockSpotlightCards } from "@/lib/mockCards";
import { routes } from "@/lib/site";

export function HomePackMocks() {
  const copy = siteCopy.home.productRail;
  return (
    <div className="mt-10">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-collectible">
          {copy.mockRibbon}
        </p>
        <p className="max-w-xl text-sm text-midtone">{copy.mockCaption}</p>
      </div>

      <div className="rail-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1 md:gap-5">
        {mockSpotlightCards.map((item, i) => (
          <Reveal
            key={item.src}
            className="w-[min(11.5rem,74vw)] shrink-0 snap-start sm:w-[min(12.5rem,42vw)] md:w-[min(13rem,28vw)]"
            delay={Math.min(i, 8) * 0.04}
            trigger="view"
          >
            <Link
              href={routes.shop}
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm"
            >
              <div className="relative aspect-[63/88] overflow-hidden rounded-2xl border-2 border-collectible/40 bg-gradient-to-b from-deep-shadow to-[#0d0d0d] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1 group-hover:border-collectible/70 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] group-hover:ring-precious/25">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-deep-shadow/80">
                  <Image
                    src={item.src}
                    alt={`${item.name} Pokémon card (sample)`}
                    fill
                    className="object-contain p-0.5 transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 280px, 208px"
                    unoptimized
                  />
                </div>
              </div>
              <div className="mt-3 px-0.5 text-center">
                <p className="text-display text-lg leading-tight tracking-[0.1em] text-rich-earth group-hover:text-collectible md:text-xl">
                  {item.name}
                </p>
                <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-midtone">
                  {item.note}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={routes.shop}
          className="inline-flex rounded-full bg-collectible px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-muzzle shadow-md transition hover:bg-precious hover:text-rich-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm"
        >
          {copy.mockCtaPrimary}
        </Link>
        <Link
          href={routes.packs}
          className="inline-flex rounded-full border-2 border-rich-earth bg-surface/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-rich-earth transition hover:bg-rich-earth hover:text-muzzle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rich-earth focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm"
        >
          {copy.mockCtaSecondary}
        </Link>
      </div>
    </div>
  );
}
