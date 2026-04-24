import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { FooterTrustBadges } from "@/components/FooterTrustBadges";
import { siteCopy } from "@/content/siteCopy";
import { contactEmail, routes } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-footer-bg text-muzzle">
      <div className="border-b border-white/10 px-[var(--container-pad)] py-4 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muzzle/70 md:text-xs">
          {siteCopy.footer.payRow}
        </p>
      </div>
      <FooterTrustBadges />
      <div className="px-[var(--container-pad)] py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-3">
              <BrandLogo variant="footer" />
              <p className="text-display text-2xl tracking-[0.12em] text-muzzle">
                {siteCopy.brand}
              </p>
            </div>
            <p className="text-sm text-muzzle/85">{siteCopy.footer.tagline}</p>
          </div>
          <nav
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-muzzle/90"
            aria-label="Footer"
          >
            {siteCopy.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm transition hover:text-precious focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-precious focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={routes.cart}
              className="rounded-sm transition hover:text-precious focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-precious focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg"
            >
              Cart
            </Link>
          </nav>
          <div className="text-sm text-muzzle/80">
            <a
              href={`mailto:${contactEmail}`}
              className="rounded-sm underline-offset-4 transition hover:text-precious hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-precious focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg"
            >
              {contactEmail}
            </a>
            <p className="mt-4 text-xs text-muzzle/60">
              © {new Date().getFullYear()} {siteCopy.brand}. {siteCopy.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
