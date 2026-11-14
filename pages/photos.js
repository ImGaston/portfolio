import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPhotos } from '../lib/photos';

// The column is 36rem wide minus 1.25rem of padding on each side.
const SIZES = '(min-width: 36rem) 33.5rem, calc(100vw - 2.5rem)';

// The page is in English, so dates are too ("21 Oct 2026"). Camera dates carry
// no time zone: they are stored as the day and shown as is.
const formatDate = (day) =>
  day
    ? new Date(`${day}T12:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : '';

const src = (id, w) => `/photos/${id}-${w}.webp`;

const Photo = ({ photo, first }) => {
  const largest = photo.widths[photo.widths.length - 1];
  const details = [photo.camera, photo.settings].filter(Boolean).join(' · ');
  const date = (
    <span className="shrink-0 text-sm text-muted tabular-nums">{formatDate(photo.date)}</span>
  );
  return (
    <figure>
      <img
        src={src(photo.id, largest)}
        srcSet={photo.widths.map((w) => `${src(photo.id, w)} ${w}w`).join(', ')}
        sizes={SIZES}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading={first ? 'eager' : 'lazy'}
        fetchPriority={first ? 'high' : undefined}
        decoding="async"
        className="photo"
        style={{ backgroundColor: photo.color || undefined }}
      />
      <figcaption className="mt-3">
        {photo.title ? (
          <span className="flex items-baseline justify-between gap-4">
            <span>{photo.title}</span>
            {date}
          </span>
        ) : (
          <span className="block">{date}</span>
        )}
        {details && <span className="block text-sm text-muted">{details}</span>}
      </figcaption>
    </figure>
  );
};

const Photos = ({ photos }) => {
  return (
    <main className="py-16 md:py-28 space-y-14">
      <Head>
        <title>Photos · Gastón Corbalán</title>
      </Head>
      <header className="site-header">
        <Link href="/" className="font-medium">
          Gastón Corbalán
        </Link>
      </header>
      <section className="space-y-4">
        <h1 className="text-muted">Photos</h1>
        {photos.length === 0 ? (
          <p>Soon.</p>
        ) : (
          <ul className="space-y-14">
            {photos.map((photo, i) => (
              <li key={photo.id}>
                <Photo photo={photo} first={i === 0} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export function getStaticProps() {
  return { props: { photos: getAllPhotos() } };
}

export default Photos;
