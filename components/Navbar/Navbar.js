import React from 'react';
import Image from 'next/image'
import resumeIcon from '../../public/cv.svg'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <a href='https://drive.google.com/file/d/1Dxg8jbDcKFodlWSdY9nKqXvR4a_zdNDe/view?usp=sharing' target='_blank' className='resumeLink' title="Download resume">
            <Image
                src={resumeIcon}
                alt="resume" width="60" height="60" className='navbar-icon'/>
            </a>
            <style jsx>{`
                .navbar {
                    display: flex;
                    justify-content: flex-end;
                }
                .resumeLink {
                    padding-right: 4px;
                    padding-top: 4px; 
                }
                @media (prefers-color-scheme: light) {
                    .navbar-icon {
                        color: black;
                    }
                    }
                
                @media (prefers-color-scheme: dark) {
                    .navbar-icon {
                        color: white;
                    }
                    }
            `}</style>
        </nav>
    )
}

export default Navbar;