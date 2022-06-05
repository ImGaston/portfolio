import React from 'react';
import ProjectList from '../components/ProjectList/ProjectList';

const Home = () => {
    return (
    <div>
        <h1>Gastón Corbalán</h1>
        <p> Hi! <span>👋</span>, I'm Gastón a frontend dev based in Buenos Aires. I’ve spent the past 10+ years been a Bussiness owner and now I'm looking to make new digital products.</p>
        <ProjectList></ProjectList>
    </div>
    )
}

export default Home;