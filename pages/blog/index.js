import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';
import { formatDate } from '../../lib/format';

const Blog = ({ posts }) => {
  return (
    <main lang="es" className="min-h-screen flex flex-col gap-10 py-16">
      <Head>
        <title>Blog · Gastón Corbalán</title>
      </Head>
      <div className="space-y-3">
        <Link
          href="/"
          className="text-sm font-medium text-verdant hover:brightness-110 dark:text-parchment"
        >
          ← Gastón Corbalán
        </Link>
        <h1 className="text-4xl md:text-5xl pb-4 font-black font-serif tracking-tight text-verdant dark:text-amber">
          Blog
        </h1>
      </div>
      {posts.length === 0 ? (
        <p className="font-accent italic text-slate dark:text-parchment">Pronto.</p>
      ) : (
        <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block space-y-1">
                <p className="font-accent italic text-sm text-slate/70 dark:text-parchment/70 mb-0">
                  {formatDate(post.date)}
                </p>
                <h2 className="font-serif font-bold text-2xl tracking-tight text-verdant group-hover:underline decoration-amber underline-offset-4 dark:text-amber">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="text-slate dark:text-parchment">{post.summary}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}

export default Blog;
