import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProjectList from '../components/ProjectList/ProjectList';
import StackList from '../components/StackList/StackList';
import Link from 'next/link';

const Home = () => {
  return (
    <main>
      <div className='first-view'>
        <h1>Gastón Corbalán</h1>
        <p className='subtitle'>
          Partner at{' '}
          <a target='_blank' href='https://revfactor.io//'>
          📊 <span>Revfactor</span>
          </a>
        </p>
        <p className='subtitle'>
    Revenue Management and Pricing specialist based in Madrid at{' '}
  <a target='_blank' href='https://blackbirdhm.com//'>
    🐦‍⬛ <span>Blackbird HM</span>
  </a>
</p>
        <p>
          Revenue management specialist based in Madrid. Apart from my current role, working to
          bring hotel revenue techniques to Airbnb listings using data analytics.
        </p>
      </div>
      <p>
        <a target='_blank' href='https://calendar.app.google/Nu8B7evvfjS8apX79/'>
          🗓️ <span>Schedule a call</span>
        </a>
      </p>
      <p>
        <a target='_blank' href='https://cv.gastoncorbalan.com/'>
          🔗 <span>CV</span>
        </a>
      </p>
      <p>
        <a href='mailto: hola@gastoncorbalan.com'>
          ✉️ <span>Contact</span>
        </a>
      </p>
    </main>
  );
};

export default Home;
