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
      </div>
      <div>
        <a target='_blank' href='https://notes.gastoncorbalan.com/'>
          Notes
        </a>
      </div>
      <div>
        <a target='_blank' href='https://cv.gastoncorbalan.com/'>
          CV
        </a>
      </div>
    </main>
  );
};

export default Home;
