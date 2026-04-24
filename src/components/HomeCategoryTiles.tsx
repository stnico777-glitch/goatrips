import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandRaster } from "@/components/BrandRaster";
import { Reveal } from "@/components/motion/Reveal";
import { ViewAllLink } from "@/components/ViewAllLink";
import { siteCopy } from "@/content/siteCopy";
import { brandAssets } from "@/lib/brandAssets";
import { routes } from "@/lib/site";

const LANE_ASSETS = {
  card: brandAssets.iconCard,
  goat: brandAssets.iconGoatHead,
  pack: brandAssets.iconPack,
  ripped: brandAssets.iconRippedPack,
} as const;

type LaneAsset = keyof typeof LANE_ASSETS | "logo";

function LaneVisual({ asset }: { asset: LaneAsset }) {
  if (asset === "logo") {
    return <BrandLogo variant="lane" />;
  }
  const src = LANE_ASSETS[asset];
  return (
    <BrandRaster
      src={src}
      alt=""
      className="relative mx-auto h-[4.5rem] w-[4.5rem] opacity-95 md:h-[5.25rem] md:w-[5.25rem]"
      sizes="168px"
    />
  );
}

export function HomeCategoryTiles() {
  const { categoryLanes } = siteCopy.home;

  return (
    <section className="bg-background px-[var(--container-pad)] py-[var(--section-y)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="text-display text-3xl tracking-[0.12em] text-rich-earth md:text-4xl">
              {categoryLanes.sectionTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-midtone">
              {categoryLanes.sectionSubtitle}
            </p>
          </Reveal>
          <Reveal className="shrink-0" delay={0.04}>
            <ViewAllLink href={routes.shop} label={categoryLanes.viewAllLabel} />
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categoryLanes.tiles.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 0.05}>
              <Link
                href={tile.href}
                className="group flex aspect-square flex-col items-center justify-between overflow-hidden rounded-2xl border border-collectible/25 bg-deep-shadow px-2 pb-4 pt-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-collectible/55 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-precious focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-3 sm:pb-5 sm:pt-8"
              >
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="transition duration-300 group-hover:scale-[1.06]">
                    <LaneVisual asset={tile.asset} />
                  </div>
                </div>
                <div className="w-full text-center">
                  <p className="text-display text-lg leading-none tracking-[0.14em] text-precious drop-shadow-sm md:text-xl">
                    {tile.label}
                  </p>
                  <p className="mt-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-muzzle/70 md:text-[11px]">
                    {tile.sub}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
