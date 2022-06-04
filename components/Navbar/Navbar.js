import React from 'react';
import Image from 'next/image'
import resumeIcon from '../../public/cv.png'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <a href='https://drive.google.com/file/d/1Dxg8jbDcKFodlWSdY9nKqXvR4a_zdNDe/view?usp=sharing' target='_blank'>
            <Image
                src={resumeIcon}
                alt="resume" width="50" height="50"    />
            </a>
            <style jsx>{`
                .navbar {
                display: flex;
                justify-content: flex-end;
                }
            `}</style>
        </nav>
    )
}

export default Navbar;