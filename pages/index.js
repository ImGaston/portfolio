import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import { formatShortDate } from '../lib/format';

const Home = ({ posts }) => {
  return (
    <main className="py-16 md:py-28 space-y-14">
      <header>
        <Link href="/" className="font-medium">
          Gastón Corbalán
        </Link>
      </header>

      <section className="space-y-4">
        <h1 className="text-muted">Revenue Manager based in Madrid.</h1>
        <p>
          Co-founder of{' '}
          <a
            target="_blank"
            href="https://revfactor.io/"
            rel="noreferrer"
            className="link"
          >
            Revfactor
          </a>
          . Revenue Management and Pricing specialist at{' '}
          <a
            target="_blank"
            href="https://blackbirdhm.com/"
            rel="noreferrer"
            className="link"
          >
            Blackbird HM
          </a>
          .
        </p>
        <p>
          Apart from my current role, working to bring hotel revenue techniques
          to Airbnb listings using data analytics.
        </p>
      </section>

      {posts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-muted">
            <Link href="/blog" className="hover:text-fg transition-colors">
              Blog
            </Link>
          </h2>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-1"
                >
                  <span className="group-hover:underline decoration-muted underline-offset-[3px]">
                    {post.title}
                  </span>
                  <span className="shrink-0 text-sm text-muted tabular-nums">
                    {formatShortDate(post.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="flex flex-wrap gap-x-5 gap-y-2 text-muted">
        <a
          target="_blank"
          href="https://calendar.app.google/Nu8B7evvfjS8apX79/"
          rel="noreferrer"
          className="hover:text-fg transition-colors"
        >
          Schedule a call
        </a>
        <a
          target="_blank"
          href="https://cv.gastoncorbalan.com/"
          rel="noreferrer"
          className="hover:text-fg transition-colors"
        >
          CV
        </a>
        <a
          href="mailto:hola@gastoncorbalan.com"
          className="hover:text-fg transition-colors"
        >
          Contact
        </a>
      </nav>
    </main>
  );
};

export function getStaticProps() {
  return { props: { posts: getAllPosts().slice(0, 5) } };
}

export default Home;
