/** Offset for fixed `SiteHeader` — use on non-hero pages */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-[var(--header-offset)] md:pt-[calc(var(--header-offset)+0.25rem)]">
      {children}
    </div>
  );
}
