import React from 'react';
import ProjectList from '../components/ProjectList/ProjectList';
import StackList from '../components/StackList/StackList';

const Home = () => {
    return (
    <main>
        <h1>Gastón Corbalán</h1>
        <p> Hi! <span>👋</span>, I'm Gastón a frontend dev based in Buenos Aires. I’ve spent the past 10+ years been a Bussiness owner and now I'm looking to create digital products.</p>
        <StackList></StackList>
        <ProjectList></ProjectList>
    </main>
    )
}

export default Home;