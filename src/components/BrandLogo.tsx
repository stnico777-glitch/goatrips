import Image from "next/image";
import { brandAssets } from "@/lib/brandAssets";

export type BrandLogoVariant = "header" | "hero" | "footer" | "lane";

/**
 * Local brand PNGs skip the image optimizer to avoid WebP recompression artifacts
 * that soften fine edges on the GOAT RIPS mark.
 */
const configs: Record<
  BrandLogoVariant,
  { shell: string; sizes: string; priority: boolean; pad: string }
> = {
  header: {
    shell:
      "relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-collectible bg-deep-shadow shadow-sm md:h-14 md:w-14",
    sizes: "112px",
    priority: true,
    pad: "p-[5px]",
  },
  hero: {
    shell:
      "relative h-[13.5rem] w-[13.5rem] shrink-0 overflow-hidden rounded-full border-[3px] border-collectible bg-deep-shadow shadow-[0_24px_60px_rgba(0,0,0,0.55)] md:h-[20rem] md:w-[20rem]",
    sizes: "640px",
    priority: true,
    pad: "p-2 md:p-3",
  },
  footer: {
    shell:
      "relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-collectible/60 bg-deep-shadow",
    sizes: "96px",
    priority: false,
    pad: "p-[5px]",
  },
  lane: {
    shell:
      "relative mx-auto h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-full border-2 border-collectible/70 bg-deep-shadow shadow-inner md:h-24 md:w-24",
    sizes: "192px",
    priority: false,
    pad: "p-1.5 md:p-2",
  },
};

type Props = {
  variant: BrandLogoVariant;
  /** Extra classes on the outer shell */
  className?: string;
};

export function BrandLogo({ variant, className = "" }: Props) {
  const c = configs[variant];
  return (
    <span className={`${c.shell} ${className}`.trim()}>
      <Image
        src={brandAssets.logo}
        alt="GOAT RIPS"
        fill
        className={`object-contain ${c.pad}`}
        sizes={c.sizes}
        priority={c.priority}
        unoptimized
      />
    </span>
  );
}
