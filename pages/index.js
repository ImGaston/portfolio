import React from 'react';

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center gap-6">
      <div className="first-view space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Gastón Corbalán</h1>
        <p className="subtitle text-base">
          Partner at{' '}
          <a
            target="_blank"
            href="https://revfactor.io//"
            rel="noreferrer"
            className="underline decoration-sky-700 hover:bg-[#76574C] hover:text-white transition-colors"
          >
            📊 <span>Revfactor</span>
          </a>
        </p>
        <p className="subtitle text-base">
          Revenue Management and Pricing specialist based in Madrid at{' '}
          <a
            target="_blank"
            href="https://blackbirdhm.com//"
            rel="noreferrer"
            className="underline decoration-sky-700 hover:bg-[#76574C] hover:text-white transition-colors"
          >
            🐦‍⬛ <span>Blackbird HM</span>
          </a>
        </p>
        <p className="text-base leading-relaxed">
          Revenue management specialist based in Madrid. Apart from my current role, working to
          bring hotel revenue techniques to Airbnb listings using data analytics.
        </p>
      </div>
      <div className="space-y-2">
        <p>
          <a
            target="_blank"
            href="https://calendar.app.google/Nu8B7evvfjS8apX79/"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-slate-500 hover:bg-[#76574C] hover:text-white transition-colors"
          >
            🗓️ <span>Schedule a call</span>
          </a>
        </p>
        <p>
          <a
            target="_blank"
            href="https://cv.gastoncorbalan.com/"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-slate-500 hover:bg-[#76574C] hover:text-white transition-colors"
          >
            🔗 <span>CV</span>
          </a>
        </p>
        <p>
          <a
            href="mailto: hola@gastoncorbalan.com"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border-slate-500 hover:bg-[#76574C] hover:text-white transition-colors"
          >
            ✉️ <span>Contact</span>
          </a>
        </p>
      </div>
    </main>
  );
};

export default Home;
