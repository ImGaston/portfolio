import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getPost, getPostSlugs } from '../../lib/posts';
import { formatDate } from '../../lib/format';

const Post = ({ post }) => {
  return (
    <main lang="es" className="py-16 md:py-28 space-y-14">
      <Head>
        <title>{`${post.title} · Gastón Corbalán`}</title>
        {post.summary && <meta name="description" content={post.summary} />}
        <meta property="og:title" content={post.title} />
        {post.summary && <meta property="og:description" content={post.summary} />}
        <meta property="og:type" content="article" />
      </Head>
      <header>
        <Link href="/" className="font-medium">
          Gastón Corbalán
        </Link>
        <span className="text-muted"> / </span>
        <Link href="/blog" className="text-muted hover:text-fg transition-colors">
          Blog
        </Link>
      </header>
      <div className="space-y-8">
        <div>
          <h1 className="font-medium">{post.title}</h1>
          <p className="text-muted">{formatDate(post.date)}</p>
        </div>
        <article className="post" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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
