import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { formatShortDate } from '../lib/format';

const navLink = 'text-muted hover:text-fg transition-colors';

// Shared by /blog and /blog/etiqueta/<tag>: tag filter row + post list.
const BlogIndex = ({ posts, tags, active = null }) => {
  const title = active ? `${active.name} · Blog · Gastón Corbalán` : 'Blog · Gastón Corbalán';
  return (
    <main lang="es" className="py-16 md:py-28 space-y-14">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <Link href="/" className="font-medium">
          Gastón Corbalán
        </Link>
      </header>
      <section className="space-y-4">
        <h1 className="text-muted">Blog</h1>
        {tags.length > 0 && (
          <nav aria-label="Etiquetas" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link
              href="/blog"
              aria-current={active ? undefined : 'page'}
              className={active ? navLink : 'text-fg'}
            >
              Todo
            </Link>
            {tags.map((tag) => {
              const current = active?.slug === tag.slug;
              return (
                <Link
                  key={tag.slug}
                  href={`/blog/etiqueta/${tag.slug}`}
                  aria-current={current ? 'page' : undefined}
                  className={current ? 'text-fg' : navLink}
                >
                  {tag.name}
                </Link>
              );
            })}
          </nav>
        )}
        {posts.length === 0 ? (
          <p>Pronto.</p>
        ) : (
          <ul className="space-y-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="group-hover:underline decoration-muted underline-offset-[3px]">
                      {post.title}
                    </span>
                    <span className="shrink-0 text-sm text-muted tabular-nums">
                      {formatShortDate(post.date)}
                    </span>
                  </span>
                  {post.summary && <span className="block text-muted">{post.summary}</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default BlogIndex;
