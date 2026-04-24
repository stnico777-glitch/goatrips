import { siteCopy } from "@/content/siteCopy";

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 11V8a5 5 0 0110 0v3M6 11h12v9H6V11z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 16V5H3v11M14 16h5l3-4V9h-4M14 16H3M6 20a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const icons = [LockIcon, TruckIcon, ChatIcon] as const;

export function FooterTrustBadges() {
  return (
    <div className="border-b border-white/10 bg-footer-bg px-[var(--container-pad)] py-10 text-muzzle">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {siteCopy.footer.trustBadges.map((badge, i) => {
          const Icon = icons[i] ?? LockIcon;
          return (
            <div key={badge.title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-precious">
                <Icon className="shrink-0" />
              </span>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muzzle">
                  {badge.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muzzle/75">{badge.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
