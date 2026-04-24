import { Reveal } from "@/components/motion/Reveal";
import { siteCopy } from "@/content/siteCopy";

export function HomeFaq() {
  const { faqTitle, faqIntro, faq } = siteCopy.home;
  return (
    <section className="bg-background px-[var(--container-pad)] py-[var(--section-y)]">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-display text-3xl tracking-[0.12em] text-rich-earth md:text-4xl">
            {faqTitle}
          </h2>
          <p className="mt-4 text-midtone">{faqIntro}</p>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="rounded-xl border border-border bg-surface px-5 py-1 shadow-sm open:border-collectible/35 open:shadow-md open:[&_.faq-chev]:rotate-45">
                <summary className="cursor-pointer list-none rounded-lg py-4 font-sans text-sm font-semibold text-rich-earth marker:content-none outline-none transition hover:text-collectible [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <span className="flex items-center justify-between gap-3">
                    {item.q}
                    <span className="faq-chev text-collectible transition" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t border-border pb-4 pt-2 text-sm leading-relaxed text-midtone">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
