import Link from "next/link";

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  href: string;
  label: string;
  className?: string;
};

/** Zardo-style “View all →” row action */
export function ViewAllLink({ href, label, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-collectible transition hover:gap-2 hover:text-rich-earth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collectible focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {label}
      <ChevronRight className="shrink-0 opacity-90" />
    </Link>
  );
}
