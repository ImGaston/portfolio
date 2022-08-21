import React from 'react';
import work from '../../data/data';
import { RiArrowRightLine } from "react-icons/ri"
import { SiGithub } from "react-icons/si"


// BUG: map of a list of object, how to return it
// ADD: key prop to each value map

const mapProjectsToCards = () =>
    work.map(( work ) => (
            <div className='cards' key={work.id}>
                <h3>{work.name}</h3>
                <p className="Card-description">
                    {work.description} 
                </p>
                <div className="Card-links">
                    <a 
                        href={work.linkProject} 
                        className="Card-link-project"
                        target="_blank"
                        >
                        View Project <RiArrowRightLine className="Card-icon-arrow"/>
                    </a>
                    <a 
                        href={work.linkGithub} 
                        className="Card-link-github"
                        target="_blank"
                        >
                        <SiGithub className="Card-icon-github"/>
                    </a>
                </div>
                <style jsx>{`
                    .cards {
                        display: flex;
                        justify-content: space-around;
                        flex-direction: column;
                        width: 86%;
                        height: 320px;
                        padding: 1.5rem;
                        border: 5px solid #1a202c;
                        border-radius: 50px;
                        margin: 1px;
                    }
                    .Card-links{
                        display: flex;
                        justify-content: space-between;
                    }
                    a {
                        text-decoration: none;
                        color: #e2e8f0;
                    }
                    .Card-link-project{
                        display: inline-block;
                        position: relative;
                        font-size: 20px;
                        font-weight: bold;
                        overflow: hidden;
                    }
                    .Card-link-project::before{
                        content: '';
                        position: absolute;
                        bottom: 20px;
                        height: 4px;
                        width: 100%;
                        transition: .2s ease;
                    }
                    .Card-link-project:hover::before{
                        transform: translateX(-100%);
                    }
                    .Card-link-github {
                        font-size: 40px;
                    }
                    @media (prefers-color-scheme: light) {
                        .cards {
                            border: 5px solid #1a202c;
                        }
                        a {
                            color: #1a202c;
                        }
                        .Card-link-project::before {
                            background-color: #1a202c;
                        }
                    }
                    @media (prefers-color-scheme: dark) {
                        .cards {
                            border: 5px solid #e2e8f0;
                        }
                        a {
                            color: #e2e8f0;
                        }
                        .Card-link-project::before {
                            background-color: #e2e8f0;
                        }
                    }
                    `}
                </style>
            </div>
    ))



const CardProject = () => {
    return (
        <>
            {mapProjectsToCards()}
        </>
    )
}

export default CardProject;