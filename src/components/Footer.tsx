import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="logo">
            <span className="logo-mark">MZ</span>
            <span className="logo-text">
              {site.name.toLowerCase().slice(0, 2)}
              <span className="accent">{site.name.toLowerCase().slice(2)}</span>
            </span>
          </Link>
          <p className="muted">
            {site.role} · {site.location}. Turning ideas into scalable products.
          </p>
        </div>
        <div>
          <h4 className="mono">Site</h4>
          <Link href="/">Home</Link>
          <Link href="/#ventures">Work</Link>
          <Link href="/#experience">About</Link>
          <Link href="/blog">Writing</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div>
          <h4 className="mono">Connect</h4>
          <a href={site.socials.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </div>
        <div>
          <h4 className="mono">Contact</h4>
          <Link href="/#contact">Say hello</Link>
          <a href={site.resume} target="_blank" rel="noopener">
            Résumé PDF
          </a>
        </div>
      </div>
      <div className="container footer-bottom mono muted">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <Link href="/#top">back to top ↑</Link>
      </div>
    </footer>
  );
}
