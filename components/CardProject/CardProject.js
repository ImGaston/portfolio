import React from 'react';
import work from '../../data/data';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { SiGithub } from 'react-icons/si';

// BUG: map of a list of object, how to return it
// ADD: key prop to each value map

const mapProjectsToCards = () =>
    work.map((work) => (
        <div className="cards" key={work.id}>
            <h3>{work.name}</h3>
            <p className="Card-description">{work.description}</p>
            <div className="Card-links">
                <button className="button">
                    <a
                        href={work.linkProject}
                        className="Card-link-project"
                        target="_blank"
                    >
                        View Project{' '}
                        <RiArrowRightUpLine className="Card-icon-arrow" />
                    </a>
                </button>
                <a
                    href={work.linkGithub}
                    className="Card-link-github"
                    target="_blank"
                >
                    <SiGithub className="Card-icon-github" />
                </a>
            </div>
            <style jsx>
                {`
                    .cards {
                        display: flex;
                        justify-content: space-around;
                        flex-direction: column;
                        width: 86%;
                        height: 320px;
                        padding: 1.5rem;
                        border: 5px solid #003d3d;
                        border-radius: 50px;
                        margin: 1px;
                        box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px
                                inset,
                            rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                        background-color: #f07e1b;
                    }
                    .cards:hover {
                        background-color: transparent;
                        transition: 0.6s ease;
                    }
                    .Card-links {
                        display: flex;
                        justify-content: space-between;
                    }
                    a {
                        text-decoration: none;
                    }
                    .Card-link-project {
                        display: inline-block;
                        position: relative;
                        font-size: 20px;
                        font-weight: bold;
                        overflow: hidden;
                    }
                    .button {
                        width: fit-content;
                        min-width: 200px;
                        height: 50px;
                        cursor: pointer;
                        border-radius: 1rem;
                        letter-spacing: 1px;
                        border: 2px solid #003d3d;
                        box-shadow: inset 0 0 0 0 #e2e8f0;
                        -webkit-transition: all ease 0.8s;
                        -moz-transition: all ease 0.8s;
                        transition: all ease 0.8s;
                    }
                    .button:hover {
                        box-shadow: inset 100px 0 0 0 #f07d1b;
                        background-color: #f07d1b;
                        color: #e2e8f0;
                    }
                    .Card-link-project:hover {
                        font-weight: 700;
                        color: #e2e8f0;
                        transition: 0.6s ease;
                    }
                    .Card-icon-github {
                        font-size: 22px;
                    }
                    .Card-link-github {
                        font-size: 40px;
                    }
                    @media (prefers-color-scheme: light) {
                        .cards {
                            border: 5px solid #003d3d;
                        }
                        a {
                            color: #003d3d;
                        }
                        .Card-link-project::before {
                            background-color: #003d3d;
                        }
                        .Card-link-github:hover {
                            color: #f07d1b;
                            transition: 0.6s ease;
                        }
                    }
                    @media (prefers-color-scheme: dark) {
                        .cards {
                            border: 5px solid #f07d1b;
                        }
                        a {
                            color: #e2e8f0;
                        }
                        .Card-link-project {
                            color: #003d3d;
                        }
                        .Card-link-project:hover {
                            color: #e2e8f0;
                        }
                        .Card-link-project::before {
                            background-color: #f07d1b;
                        }
                        .Card-link-github:hover {
                            color: #f07d1b;
                            transition: 0.6s ease;
                        }
                    }
                `}
            </style>
        </div>
    ));

const CardProject = () => {
    return <>{mapProjectsToCards()}</>;
};

export default CardProject;
