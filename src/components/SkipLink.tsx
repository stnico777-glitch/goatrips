export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-[100] rounded-full bg-collectible px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-muzzle shadow-lg focus:fixed focus:left-4 focus:top-[calc(var(--header-offset)+0.5rem)] focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-precious focus:ring-offset-2 focus:ring-offset-muzzle"
    >
      Skip to content
    </a>
  );
}
