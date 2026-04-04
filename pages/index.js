import React from 'react';

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center gap-10 py-16">
      <div className="first-view space-y-5">
        <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight text-verdant dark:text-amber">
          Gastón Corbalán
        </h1>
        <p className="subtitle text-base text-slate dark:text-parchment">
          Partner at{' '}
          <a
            target="_blank"
            href="https://revfactor.io//"
            rel="noreferrer"
            className="bg-amber px-1.5 py-0.5 rounded-sm hover:brightness-110 transition-colors"
          >
            📊 <span>Revfactor</span>
          </a>
        </p>
        <p className="subtitle text-base text-slate dark:text-parchment">
          Revenue Management and Pricing specialist based in Madrid at{' '}
          <a
            target="_blank"
            href="https://blackbirdhm.com//"
            rel="noreferrer"
            className="bg-amber px-1.5 py-0.5 rounded-sm hover:brightness-110 transition-colors"
          >
            🐦‍⬛ <span>Blackbird HM</span>
          </a>
        </p>
        <p className="text-base leading-relaxed text-slate dark:text-parchment max-w-prose">
          Revenue management specialist based in Madrid. Apart from my current role, working to
          bring hotel revenue techniques to Airbnb listings using data analytics.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <a
          target="_blank"
          href="https://calendar.app.google/Nu8B7evvfjS8apX79/"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-verdant font-medium hover:brightness-110 transition-all w-fit dark:bg-amber dark:text-verdant"
        >
          🗓️ <span>Schedule a call</span>
        </a>
        <a
          target="_blank"
          href="https://cv.gastoncorbalan.com/"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-verdant font-medium hover:bg-verdant hover:text-parchment transition-all w-fit dark:text-parchment dark:hover:bg-amber dark:hover:text-verdant"
        >
          🔗 <span>CV</span>
        </a>
        <a
          href="mailto: hola@gastoncorbalan.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-verdant font-medium hover:bg-verdant hover:text-parchment transition-all w-fit dark:text-parchment dark:hover:bg-amber dark:hover:text-verdant"
        >
          ✉️ <span>Contact</span>
        </a>
      </div>
    </main>
  );
};

export default Home;
