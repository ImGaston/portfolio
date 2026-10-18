import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getPost, getPostSlugs } from '../../lib/posts';
import { formatDate } from '../../lib/format';

const Post = ({ post }) => {
  return (
    <main lang="es" className="min-h-screen flex flex-col gap-8 py-16">
      <Head>
        <title>{`${post.title} · Gastón Corbalán`}</title>
        {post.summary && <meta name="description" content={post.summary} />}
        <meta property="og:title" content={post.title} />
        {post.summary && <meta property="og:description" content={post.summary} />}
        <meta property="og:type" content="article" />
      </Head>
      <Link
        href="/blog"
        className="text-sm font-medium text-verdant hover:brightness-110 dark:text-parchment"
      >
        ← Blog
      </Link>
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight text-verdant dark:text-amber">
          {post.title}
        </h1>
        <p className="font-accent italic text-slate/70 dark:text-parchment/70">
          {formatDate(post.date)}
        </p>
      </header>
      <article className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
};

export function getStaticPaths() {
  return {
    paths: getPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { post: getPost(params.slug) } };
}

export default Post;
