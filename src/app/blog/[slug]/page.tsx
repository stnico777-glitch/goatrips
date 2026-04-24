import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

const posts: Record<
  string,
  { title: string; body: string[] }
> = {
  "welcome-to-goat-rips": {
    title: "Welcome to GOAT RIPS",
    body: [
      "GOAT RIPS exists for the moment the seal breaks — when cardboard, ink, and luck collide. We are building a premium, approachable home for collectors who chase grails and love the ritual of the rip.",
      "This site connects to our Shopify storefront so you can shop sealed product with confidence and check out on Shopify’s trusted rails. Watch this space for drops, events, and community highlights.",
    ],
  },
  "how-we-source-sealed": {
    title: "How we source sealed product",
    body: [
      "Every pack we sell passes through the same lens: provenance, condition, and transparency. We work with established distributors and verify chain-of-custody wherever possible.",
      "If you ever have a question about a SKU, reach out before you buy — we would rather over-communicate than leave collectors guessing.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Not found" };
  return pageMetadata(post.title, post.body[0]);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <PageShell>
      <article className="bg-surface-warm px-[var(--container-pad)] py-14 md:py-20">
        <div className="mx-auto max-w-2xl">
          <Link href="/blog" className="text-sm font-semibold text-collectible hover:underline">
            ← Blog
          </Link>
          <h1 className="text-display mt-6 text-4xl tracking-[0.1em] text-rich-earth md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-8 space-y-4 text-midtone">
            {post.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </article>
    </PageShell>
  );
}
