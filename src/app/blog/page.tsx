import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Blog",
  "Rip culture, pull highlights, and collector notes from GOAT RIPS.",
);

const posts = [
  {
    slug: "welcome-to-goat-rips",
    title: "Welcome to GOAT RIPS",
    date: "April 2026",
    excerpt: "Why we built a home for the greatest trading — and what to expect from our drops.",
  },
  {
    slug: "how-we-source-sealed",
    title: "How we source sealed product",
    date: "April 2026",
    excerpt: "Authenticity matters. Here is how we vet distributors and protect collectors.",
  },
] as const;

export default function BlogPage() {
  return (
    <PageShell>
      <div className="bg-surface-warm px-[var(--container-pad)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1 className="text-display text-5xl tracking-[0.12em] text-rich-earth">Blog</h1>
            <p className="mt-4 text-midtone">
              Stories from the table — new posts will land here as we publish.
            </p>
          </Reveal>
          <ul className="mt-12 space-y-8">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <li className="border-b border-border pb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-collectible">
                    {post.date}
                  </p>
                  <h2 className="text-display mt-2 text-2xl tracking-[0.08em] text-rich-earth">
                    <Link href={`/blog/${post.slug}`} className="hover:text-collectible">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-midtone">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-block text-sm font-semibold text-collectible underline-offset-4 hover:underline"
                  >
                    Read more
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
