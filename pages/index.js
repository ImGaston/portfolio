import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProjectList from '../components/ProjectList/ProjectList';
import StackList from '../components/StackList/StackList';

const Home = () => {
    return (
        <main>
            <div className="first-view">
                <h1>Gastón Corbalán</h1>
                <p>Hi! <span>👋</span>, I'm Gastón a Front End Developer looking to create digital products. My 10 years in business allow me to have a global vision of a product, understand the problems that it solves and for who it is.</p>
                <p>An entrepreneur mindset with frontend coding skills.</p>
                <p>I focus on constant search for improve and build. Today my technical knowledge in programming opened a new set of skills to create solutions which I am looking to develop in a team.
                </p>
                <StackList></StackList>
            </div>
            <ProjectList></ProjectList>
        </main>
    );
};

export default Home;
