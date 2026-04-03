import React from 'react';

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center gap-10 py-16">
      <div className="first-view space-y-5">
        <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight text-verdant">
          Gastón Corbalán
        </h1>
        <p className="subtitle text-base text-slate">
          Partner at{' '}
          <a
            target="_blank"
            href="https://revfactor.io//"
            rel="noreferrer"
            className="border-b-2 border-amber hover:text-verdant transition-colors"
          >
            📊 <span>Revfactor</span>
          </a>
        </p>
        <p className="subtitle text-base text-slate">
          Revenue Management and Pricing specialist based in Madrid at{' '}
          <a
            target="_blank"
            href="https://blackbirdhm.com//"
            rel="noreferrer"
            className="border-b-2 border-amber hover:text-verdant transition-colors"
          >
            🐦‍⬛ <span>Blackbird HM</span>
          </a>
        </p>
        <p className="text-base leading-relaxed text-slate max-w-prose">
          Revenue management specialist based in Madrid. Apart from my current role, working to
          bring hotel revenue techniques to Airbnb listings using data analytics.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <a
          target="_blank"
          href="https://calendar.app.google/Nu8B7evvfjS8apX79/"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-amber text-verdant font-semibold hover:brightness-110 transition-all w-fit"
        >
          🗓️ <span>Schedule a call</span>
        </a>
        <a
          target="_blank"
          href="https://cv.gastoncorbalan.com/"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-verdant text-verdant font-medium hover:bg-verdant hover:text-parchment transition-all w-fit"
        >
          🔗 <span>CV</span>
        </a>
        <a
          href="mailto: hola@gastoncorbalan.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-verdant text-verdant font-medium hover:bg-verdant hover:text-parchment transition-all w-fit"
        >
          ✉️ <span>Contact</span>
        </a>
      </div>
    </main>
  );
};

export default Home;
