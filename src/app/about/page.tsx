import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "About",
  "GOAT RIPS — collectible trading cards, sealed packs, and the unboxing experience.",
);

export default function AboutPage() {
  return (
    <PageShell>
      <div className="bg-surface-warm px-[var(--container-pad)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl space-y-8">
          <Reveal>
            <h1 className="text-display text-5xl tracking-[0.12em] text-rich-earth">About</h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-lg text-midtone">
              GOAT RIPS is a collectible trading card destination built around the rush of the rip.
              We combine earthy, premium presentation with a straight-shooting love for the hobby —
              from modern hits to nostalgic chases.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-midtone">
              Our storefront runs on Shopify so inventory, taxes, and checkout stay battle-tested.
              Questions about a product or a drop? Email us from the footer — a real human reads the
              inbox.
            </p>
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
