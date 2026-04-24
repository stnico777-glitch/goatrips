import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Packs",
  "Sealed product, curated drops, and the packs collectors talk about.",
);

export default function PacksPage() {
  return (
    <PageShell>
      <div className="bg-surface-warm px-[var(--container-pad)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1 className="text-display text-5xl tracking-[0.12em] text-rich-earth">Packs</h1>
            <p className="mt-6 text-lg text-midtone">
              We rotate sealed inventory across sports and TCG categories. Follow the blog for drop
              announcements, or head to the shop to see what is live right now.
            </p>
          </Reveal>
          <Reveal className="mt-10" delay={0.08}>
            <Link
              href={routes.shop}
              className="inline-flex rounded-full bg-collectible px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-muzzle transition hover:bg-precious hover:text-rich-earth"
            >
              Browse shop
            </Link>
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
