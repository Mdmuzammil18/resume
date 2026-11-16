import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { getAllSlugs, getPost, formatDate } from "@/lib/posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="article">
      <div className="article-wrap">
        <Link href="/blog" className="back-link">
          ← All posts
        </Link>
        <header className="article-head">
          <div className="article-meta">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="excerpt">{post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="chips" style={{ marginTop: 16 }}>
              {post.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
        </header>
        <div className="prose">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
          >
            {post.content}
          </Markdown>
        </div>
      </div>
    </article>
  );
}
