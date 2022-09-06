import React from 'react';
import * as icon from 'react-icons/io5';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
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
                }
                .navbar-list {
                    margin: 0px;
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
