import React from 'react';
import ProjectList from '../components/ProjectList/ProjectList';
import StackList from '../components/StackList/StackList';

const Home = () => {
    return (
    <main>
        <h1>Gastón Corbalán</h1>
        <p> Hi! <span>👋</span>, I'm Gastón a frontend dev based in Buenos Aires. I’ve been a Bussiness owner for the last +10 years and now I'm looking to create digital products.</p>
        <StackList></StackList>
        <ProjectList></ProjectList>
    </main>
    )
}

export default Home;