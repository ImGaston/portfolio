import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';
import { formatShortDate } from '../../lib/format';

const Blog = ({ posts }) => {
  return (
    <main lang="es" className="py-16 md:py-28 space-y-14">
      <Head>
        <title>Blog · Gastón Corbalán</title>
      </Head>
      <header>
        <Link href="/" className="font-medium">
          Gastón Corbalán
        </Link>
      </header>
      <section className="space-y-4">
        <h1 className="text-muted">Blog</h1>
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
                  {post.summary && (
                    <span className="block text-muted">{post.summary}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}

export default Blog;
