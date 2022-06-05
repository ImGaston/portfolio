import React from 'react';
import Image from 'next/image'
import resumeIcon from '../../public/cv.png'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <a href='https://drive.google.com/file/d/1Dxg8jbDcKFodlWSdY9nKqXvR4a_zdNDe/view?usp=sharing' target='_blank' className='resumeLink' title="Download resume">
            <Image
                src={resumeIcon}
                alt="resume" width="60" height="60"    />
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
            `}</style>
        </nav>
    )
}

export default Navbar;