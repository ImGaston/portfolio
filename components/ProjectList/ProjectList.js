import React from 'react';
import Image from 'next/image'
import CardProject from '../CardProject/CardProject';

const ProjectList = () => {
    return (
        <section className='projects'>
            <div className='cards'>
                <h3>1</h3>
                <span></span>
            </div>
            <div className='cards'>
                <h3>2</h3>
                <span></span>
            </div>
            <div className='cards'>
                <h3>3</h3>
                <span></span>
            </div>
            <div className='cards'>
                <h3>4</h3>
                <span></span>
            </div>
            <CardProject />
            <style jsx>{`
                .projects {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .cards {
                    width: 250px;
                    height: 250px;
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
    )
}

export default ProjectList;