import React from 'react';
import Navbar from '../Navbar/Navbar.js'
import Footer from '../Footer/Footer.js'


const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default Layout;