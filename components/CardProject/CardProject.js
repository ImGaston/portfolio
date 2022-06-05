import React from 'react';

const project = {
    '2zd33b8c': {
        name: 'Anotador',
        image: '/images/anotador.jpg',
        description: 'My first problem solved with code',
        github: 'https://github.com/ImGaston/anotador',
        url: 'https://anotador.com.ar/',
    },
    '6trfgkkj': {
        name: 'To-do App',
        image: '/images/todo-app.jpg',
        description: `Do I am really learning if I'm not have a To-do app?`,
        github: 'https://github.com/ImGaston/to-do-list',
        url: 'https://to-do-platzi.vercel.app/',
    }
};

const project2 = [
        'Anotador',
        'My first problem solved with code',
        2,
        4
]

// BUG: map of a list of object, how to return it
// ADD: key prop to each value map

const mapProjectsToCards = () =>
    project2.map(({ project }) => (
        <p>{project}</p>
    ))



const CardProject = () => {
    return (
        <section>
            {mapProjectsToCards()}
        </section>
    )
}

export default CardProject;