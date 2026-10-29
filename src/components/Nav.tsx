import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/#ventures", label: "Work" },
  { href: "/#experience", label: "About" },
  { href: "/blog", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

const Icon = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  ),
  writing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20 18 6l-2-2L2 18z" />
      <path d="m14 4 6 6" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
};

const tabs = [
  { href: "/", label: "Home", icon: Icon.home },
  { href: "/#ventures", label: "Work", icon: Icon.work },
  { href: "/#experience", label: "About", icon: Icon.about },
  { href: "/blog", label: "Writing", icon: Icon.writing },
  { href: "/#contact", label: "Contact", icon: Icon.contact },
];

export function Nav() {
  const handle = site.name.toLowerCase();
  const monogram = "MZ";

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Link href="/" className="logo" aria-label={site.name}>
            <span className="logo-mark">{monogram}</span>
            <span className="logo-text">
              {handle.slice(0, 2)}
              <span className="accent">{handle.slice(2)}</span>
            </span>
          </Link>
          <nav className="nav-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="btn btn-small" href={site.resume} target="_blank" rel="noopener">
              Resume
            </a>
          </div>
        </div>
      </header>

      <nav className="bottom-nav" aria-label="Primary">
        {tabs.map((t) => (
          <Link key={t.label} href={t.href}>
            {t.icon}
            {t.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
