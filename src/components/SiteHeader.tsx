"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { siteCopy } from "@/content/siteCopy";
import { useCart } from "@/context/CartContext";
import { routes } from "@/lib/site";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M11 19a8 8 0 100-16 8 8 0 000 16zm9 2l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalQuantity } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      const url = q ? `${routes.shop}?q=${encodeURIComponent(q)}` : routes.shop;
      router.push(url);
      setMenuOpen(false);
    },
    [query, router],
  );

  const headerSurface = scrolled
    ? "border-border bg-nav-bg/98 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-nav-bg/95"
    : "border-transparent bg-transparent shadow-none backdrop-blur-none";

  /** Light ink on home hero (video); dark ink on cream pages when the bar is still transparent */
  const navInk = !scrolled && pathname === "/" ? "text-muzzle" : "text-rich-earth";
  const navInkMuted = !scrolled && pathname === "/" ? "text-muzzle/75" : "text-midtone";
  const navSep = !scrolled && pathname === "/" ? "text-muzzle/35" : "text-rich-earth/35";
  const ringOffset = scrolled
    ? "focus-visible:ring-offset-nav-bg"
    : pathname === "/"
      ? "focus-visible:ring-offset-transparent"
      : "focus-visible:ring-offset-muzzle";

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-50 flex flex-col transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <header
          className={`w-full border-b px-[var(--container-pad)] transition-[box-shadow,background-color,border-color,backdrop-filter] duration-300 ${headerSurface}`}
        >
          <div className="mx-auto flex h-[var(--header-nav-height)] max-w-6xl items-center justify-between gap-4 py-2 md:py-3">
          <Link
            href={routes.home}
            className={`flex shrink-0 items-center gap-3 rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 ${ringOffset}`}
            aria-label={`${siteCopy.brand} home`}
          >
            <BrandLogo variant="header" />
            <span
              className={`text-display hidden text-lg tracking-[0.18em] sm:block md:text-xl ${navInk}`}
            >
              {siteCopy.brand}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Primary"
          >
            {siteCopy.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-caps rounded-sm px-1 py-0.5 transition hover:text-collectible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 ${ringOffset} ${navInk} ${
                    active ? "text-collectible underline decoration-2 underline-offset-8" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <span className={navSep} aria-hidden>
              |
            </span>
            <form
              onSubmit={onSearch}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-inner transition focus-within:border-collectible/50 focus-within:ring-1 focus-within:ring-collectible/30 ${
                scrolled || pathname !== "/"
                  ? "border-border bg-surface/90"
                  : "border-muzzle/35 bg-muzzle/10 backdrop-blur-sm"
              }`}
              role="search"
            >
              <SearchIcon className={navInkMuted} />
              <input
                type="search"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className={`w-28 bg-transparent text-sm outline-none md:w-36 ${navInk} ${
                  pathname === "/" && !scrolled
                    ? "placeholder:text-muzzle/55"
                    : "placeholder:text-midtone/70"
                }`}
                aria-label="Search products"
              />
            </form>
            <Link
              href={routes.cart}
              className={`nav-caps relative rounded-sm px-1 py-0.5 transition hover:text-collectible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 ${ringOffset} ${navInk}`}
            >
              Cart
              {totalQuantity > 0 ? (
                <span className="absolute -right-3 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-collectible px-1 text-[10px] font-bold text-muzzle shadow-sm">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              ) : null}
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={routes.cart}
              className={`relative rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wider shadow-sm transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 ${ringOffset} ${navInk} ${
                scrolled || pathname !== "/"
                  ? "border-border bg-surface/80"
                  : "border-muzzle/35 bg-muzzle/10 backdrop-blur-sm"
              }`}
            >
              Cart
              {totalQuantity > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-collectible px-1 text-[9px] text-muzzle">
                  {totalQuantity > 99 ? "+" : totalQuantity}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg shadow-sm transition hover:border-collectible/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 ${ringOffset} ${navInk} ${
                scrolled || pathname !== "/"
                  ? "border-border bg-surface/80"
                  : "border-muzzle/35 bg-muzzle/10 backdrop-blur-sm"
              }`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
          </div>
        </header>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 flex flex-col md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-deep-shadow/40 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`relative ml-auto flex h-full w-[min(100%,20rem)] flex-col border-l border-border bg-nav-bg/98 px-6 pb-10 pt-[calc(var(--header-offset)+0.75rem)] shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center gap-3 border-b border-border pb-6">
            <BrandLogo variant="header" />
            <span className="text-display text-xl tracking-[0.14em] text-rich-earth">
              {siteCopy.brand}
            </span>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {siteCopy.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-3 text-display text-2xl tracking-[0.12em] transition hover:bg-collectible/10 ${
                    active ? "text-collectible" : "text-rich-earth"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={routes.cart}
              className="rounded-xl px-3 py-3 text-display text-2xl tracking-[0.12em] text-rich-earth transition hover:bg-collectible/10"
              onClick={() => setMenuOpen(false)}
            >
              Cart
            </Link>
          </nav>
          <form
            onSubmit={onSearch}
            className="mt-auto flex flex-col gap-3 border-t border-border pt-8"
          >
            <label className="text-xs font-semibold uppercase tracking-wider text-midtone">
              Search the shop
            </label>
            <div className="flex gap-2">
              <input
                className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-rich-earth outline-none transition focus:border-collectible/50 focus:ring-1 focus:ring-collectible/25"
                placeholder="Packs, singles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-collectible px-4 py-3 text-sm font-semibold uppercase tracking-wide text-muzzle transition hover:bg-precious hover:text-rich-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 focus-visible:ring-offset-nav-bg"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
