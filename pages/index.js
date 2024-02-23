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
        <p className='subtitle'>STR Revenue Management and Pricing strategies</p>
      </div>
      <p>
        <a target='_blank' href='https://notes.gastoncorbalan.com/'>
          🔗 <span>Notes</span>
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
