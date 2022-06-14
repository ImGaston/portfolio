import React from 'react';
import CardProject from '../CardProject/CardProject';
import Data from '../../data/data';

const ProjectList = () => {
    return (
        <>
        <h3>Projects</h3>
        <section className='projects'>
            <CardProject />
            <style jsx>{`
                .projects {
                    display: grid;
                    grid-template-columns: repeat(auto-fill,minmax(min(400px,100%),1fr));
                    justify-items: center;
                    gap: 60px;
                }
                .cards {
                    width: 86%;
                    height: 320px;
                    padding: 1.5rem;
                    border: 5px solid #1a202c;
                    border-radius: 50px;
                    margin: 1px;
                }
                @media (prefers-color-scheme: light) {
                    .cards {
                        border: 5px solid #1a202c;
                    }
                }
                @media (prefers-color-scheme: dark) {
                    .cards {
                        border: 5px solid #e2e8f0;
                    }
                }
                `}
            </style>
        </section>
        </>
    )
}

export default ProjectList;