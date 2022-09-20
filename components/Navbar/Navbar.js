import React from 'react';
import * as icon from 'react-icons/io5';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {/* <li className="navbar-button">
                    <a
                        href="mailto:corbalan.gaston@gmail.com"
                        title="Send email"
                    >
                        Email Me
                    </a>
                </li> */}
                <li className="navbar-icon">
                    <a
                        href="https://drive.google.com/file/d/1Dxg8jbDcKFodlWSdY9nKqXvR4a_zdNDe/view?usp=sharing"
                        target="_blank"
                        className="resumeLink"
                        title="Download resume"
                    >
                        <icon.IoDocumentTextOutline />
                    </a>
                </li>
            </ul>
            <style jsx>{`
                .navbar {
                    display: flex;
                    justify-content: flex-end;
                    flex-direction: row;
                }
                .navbar-list {
                    margin: 0px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                    align-items: center;
                }
                .navbar-button {
                    list-style: none;
                    background-color: #e2e8f0;
                    width: fit-content;
                    min-width: 100px;
                    height: 30px;
                    cursor: pointer;
                    border-radius: 1rem;
                    letter-spacing: 1px;
                    border: 2px solid #003d3d;
                    box-shadow: inset 0 0 0 0 #e2e8f0;
                    -webkit-transition: all ease 0.8s;
                    -moz-transition: all ease 0.8s;
                    transition: all ease 0.8s;
                }
                .navbar-button:hover {
                    box-shadow: inset 100px 0 0 0 #f07d1b;
                    background-color: #f07d1b;
                    color: #e2e8f0;
                }
                .navbar-icon {
                    font-size: 60px;
                    list-style: none;
                }
                .resumeLink {
                    padding-right: 4px;
                    padding-top: 4px;
                    text-decoration: none;
                }
                .resumeLink:hover {
                    color: #f07d1b;
                }
                @media (prefers-color-scheme: light) {
                    .resumeLink {
                        color: #003d3d;
                    }
                }

                @media (prefers-color-scheme: dark) {
                    .resumeLink {
                        color: #e2e8f0;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
