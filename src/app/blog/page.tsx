import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Writing",
  description: "Build logs and write-ups — how I built everything, step by step.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <div className="page-head">
        <Link href="/" className="back-link">
          ← Home
        </Link>
        <h1>Notes from the build</h1>
        <p>
          Long-form write-ups of what I&apos;m building — the decisions, the dead ends and
          the details. New posts land here as I ship.
        </p>
      </div>

      <section className="article" style={{ paddingTop: 0 }}>
        {posts.length === 0 ? (
          <p className="muted">
            No posts yet. Add a Markdown file to <code>content/blog/</code> to publish one.
          </p>
        ) : (
          <div className="posts-list">
            {posts.map((p) => (
              <Reveal as="article" className="post" key={p.slug}>
                <Link href={`/blog/${p.slug}`} style={{ display: "contents" }}>
                  <span className="mono muted">
                    {formatDate(p.date)} · {p.category} · {p.readingTime}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  {p.tags.length > 0 && (
                    <span className="chips">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
