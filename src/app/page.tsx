import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Terminal } from "@/components/Terminal";
import { Stats } from "@/components/Stats";
import { LocalTime } from "@/components/LocalTime";
import { VenturePreview, VentureLinks } from "@/components/Venture";
import {
  services,
  ventures,
  timeline,
  stack,
  site,
} from "@/lib/site";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <div className="now-pill">
              <span className="dot" />
              <span className="mono">Now</span> Software Engineer · building with AI
            </div>
            <h1>
              I build the <em>product</em>,
              <br />
              not just the feature.
            </h1>
            <p className="lead">
              Software engineer taking ideas from a blank page to production — web, mobile
              and, lately, agentic AI. I care about the whole thing: the data model, the
              API, the pixels, and whether anyone actually uses it.
            </p>
            <div className="hero-ctas">
              <Link className="btn" href="#ventures">
                See the work →
              </Link>
              <Link className="btn btn-ghost" href="#contact">
                Get in touch
              </Link>
              <a className="link mono" href={site.resume} target="_blank" rel="noopener">
                résumé.pdf ↓
              </a>
            </div>
            <div className="shipped-at">
              <span className="mono label">Shipped at</span>
              <span>Emids</span>
              <span>KPMG</span>
              <span>Lemnisk</span>
            </div>
          </Reveal>
          <Terminal />
        </div>
        <Stats />
      </section>

      {/* 01 WHAT I DO */}
      <section className="section" id="services">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow mono">01 / What I do</span>
            <h2>From blank page to something people actually use</h2>
            <p>
              I&apos;m happiest owning a product slice end to end — talking to users,
              shaping the data model, building the API and polishing the last 10% of the UI.
            </p>
          </Reveal>
          <div className="cards cards-4">
            {services.map((s) => (
              <Reveal as="article" className={`card${s.focus ? " card-focus" : ""}`} key={s.n}>
                <span className="num mono">
                  {s.n} {s.focus && <span className="badge">current focus</span>}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="tags mono">{s.tags}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 02 VENTURES */}
      <section className="section" id="ventures">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow mono">02 / Ventures</span>
            <h2>Things I&apos;m building on my own</h2>
            <p>
              Products I founded or co-founded — designed, built and shipped to the web,
              the App Store and Google Play.
            </p>
          </Reveal>
          <div className="cards cards-2">
            {ventures.map((v) => (
              <Reveal as="article" className="venture" key={v.title}>
                <Link
                  className="venture-cover"
                  href={`/work/${v.slug}`}
                  aria-label={`${v.title} case study`}
                >
                  <VenturePreview v={v} />
                </Link>
                <div className="venture-body">
                  <div className="venture-top">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="venture-icon" src={v.icon} alt="" loading="lazy" />
                    <div className="venture-head">
                      <h3>
                        <Link href={`/work/${v.slug}`}>{v.title}</Link>
                      </h3>
                      <span className="mono muted">{v.platforms}</span>
                    </div>
                    <span className="badge">{v.role}</span>
                  </div>
                  <p>{v.body}</p>
                  <div className="venture-foot">
                    <VentureLinks links={v.links} />
                    <Link className="case-link mono" href={`/work/${v.slug}`}>
                      case study →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 EXPERIENCE */}
      <section className="section" id="experience">
        <div className="container">
          <Reveal className="section-head section-head-row">
            <div>
              <span className="eyebrow mono">03 / Experience</span>
              <h2>Where I&apos;ve worked</h2>
            </div>
          </Reveal>
          <ol className="timeline">
            {timeline.map((t) => (
              <Reveal as="li" key={t.company}>
                <div className="tl-company">
                  <div className="tl-logo">{t.logo}</div>
                  <div>
                    <h3>
                      {t.company} {t.current && <span className="badge">Current</span>}
                    </h3>
                    <span className="mono muted">{t.meta}</span>
                    {t.promo && <span className="promo mono">{t.promo}</span>}
                  </div>
                </div>
                <div className="tl-roles">
                  {t.roles.map((r) => (
                    <div className="role" key={r.title}>
                      <h4>{r.title}</h4>
                      <span className="mono muted">{r.period}</span>
                      {r.body && <p>{r.body}</p>}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 TOOLING */}
      <section className="section" id="stack">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow mono">04 / Tooling</span>
            <h2>The stack I reach for</h2>
            <p>
              Proven tools for the foundations, so the novelty budget goes where users can
              feel it.
            </p>
          </Reveal>
          <div className="cards cards-3">
            {stack.map((s) => (
              <Reveal className="stack" key={s.title}>
                <span className="mono muted">{s.tag}</span>
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 WRITING */}
      <section className="section" id="writing">
        <div className="container">
          <Reveal className="section-head section-head-row">
            <div>
              <span className="eyebrow mono">05 / Writing</span>
              <h2>How I built this portfolio</h2>
              <p>A write-up of the build — the decisions, what broke, and what I&apos;d do again.</p>
            </div>
            <Link className="link mono" href="/blog">
              all posts →
            </Link>
          </Reveal>
          {posts.length > 0 ? (
            <div className="posts">
              {posts.map((p, idx) => (
                <Reveal
                  as="article"
                  className={`post${idx === 0 ? " post-latest" : ""}`}
                  key={p.slug}
                >
                  <Link href={`/blog/${p.slug}`} style={{ display: "contents" }}>
                    <span className="mono muted">
                      {idx === 0 && <span className="badge">Latest</span>} {formatDate(p.date)} ·{" "}
                      {p.category} · {p.readingTime}
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="muted">No posts yet — add Markdown files in content/blog.</p>
          )}
        </div>
      </section>

      {/* 06 CONTACT */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal>
            <span className="eyebrow mono">06 / Say hello</span>
            <h2>
              Got an idea that should be a <em>product</em>?
            </h2>
            <p>
              Always up for a good product conversation — a role, a collaboration, or just
              comparing notes on shipping.
            </p>
            <ul className="contact-meta">
              <li>
                <span className="mono muted">Local time</span>
                <LocalTime />
              </li>
              <li>
                <span className="mono muted">Status</span>
                <span>
                  <span className="dot" /> Open to interesting conversations
                </span>
              </li>
              <li>
                <span className="mono muted">Elsewhere</span>
                <span>
                  <a href={site.socials.linkedin} target="_blank" rel="noopener">
                    LinkedIn ↗
                  </a>
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
