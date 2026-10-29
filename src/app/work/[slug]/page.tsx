import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ventures } from "@/lib/site";
import { VenturePreview, VentureLinks } from "@/components/Venture";

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = ventures.find((x) => x.slug === slug);
  if (!v) return {};
  return {
    title: `${v.title} · Case study`,
    description: v.body,
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = ventures.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const v = ventures[index];
  const cs = v.caseStudy;
  const next = ventures[(index + 1) % ventures.length];

  return (
    <article className="case">
      <div className="container">
        <Link href="/#ventures" className="back-link mono">
          ← all work
        </Link>

        <header className="case-head">
          <span className="eyebrow mono">
            <span className="accent">{cs.n}</span> / Case study
          </span>
          <h1>{v.title}</h1>
          <p className="case-lede">{v.body}</p>
          <VentureLinks links={v.links} />

          <dl className="case-meta mono">
            <div>
              <dt>Type</dt>
              <dd>{cs.type}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{cs.year}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{cs.roleLong}</dd>
            </div>
            <div>
              <dt>For</dt>
              <dd>{cs.for}</dd>
            </div>
          </dl>
        </header>

        <div className="case-cover">
          <VenturePreview v={v} />
        </div>

        <div className="case-grid">
          <div className="case-body">
            <p className="case-intro">{cs.intro}</p>

            <h2>The problem</h2>
            <p>{cs.problem}</p>

            <h2>What I built</h2>
            <ul className="case-list">
              {cs.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <h2>Outcome</h2>
            <ul className="case-list">
              {cs.outcome.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>

          <aside className="case-aside">
            <div className="case-aside-block">
              <span className="eyebrow mono">Stack</span>
              <div className="chips">
                {cs.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
            <div className="case-aside-block">
              <span className="eyebrow mono">Links</span>
              <VentureLinks links={v.links} />
            </div>
          </aside>
        </div>

        <Link href={`/work/${next.slug}`} className="case-next">
          <span className="eyebrow mono">Next project</span>
          <div className="case-next-row">
            <h3>
              {next.title} <span aria-hidden="true">→</span>
            </h3>
            <p>{next.body}</p>
          </div>
        </Link>
      </div>
    </article>
  );
}
