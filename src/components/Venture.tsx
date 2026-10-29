import type { ventures } from "@/lib/site";

type Venture = (typeof ventures)[number];
type VentureLink = Venture["links"][number];

function LinkIcon({ icon }: { icon: VentureLink["icon"] }) {
  if (icon === "apple") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    );
  }
  if (icon === "play") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function VentureLinks({ links }: { links: Venture["links"] }) {
  return (
    <div className="venture-pills">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="pill">
          <span className="pill-ico"><LinkIcon icon={l.icon} /></span>
          {l.label}
          <span aria-hidden="true" className="pill-ext">↗</span>
        </a>
      ))}
    </div>
  );
}

export function VenturePreview({ v }: { v: Venture }) {
  if (v.kind === "app" && v.screens) {
    return (
      <div className="venture-art venture-art-app">
        <div className="vscreens">
          {v.screens.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${v.title} screen ${i + 1}`} loading="lazy" className={`vscreen vscreen-${i + 1}`} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="venture-art venture-art-web">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={v.site} alt={`${v.title} website`} loading="lazy" />
    </div>
  );
}
