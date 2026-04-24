import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { routes } from "@/lib/site";

export default function ProductNotFound() {
  return (
    <PageShell>
      <div className="px-[var(--container-pad)] py-20 text-center">
        <h1 className="text-display text-3xl tracking-[0.1em] text-rich-earth">Product not found</h1>
        <p className="mt-4 text-midtone">That handle is not in the catalog.</p>
        <Link
          href={routes.shop}
          className="mt-8 inline-flex rounded-full bg-collectible px-6 py-3 text-sm font-semibold uppercase tracking-wider text-muzzle"
        >
          Back to shop
        </Link>
      </div>
    </PageShell>
  );
}
