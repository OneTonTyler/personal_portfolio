import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

import logo from '../../assests/logo/logo.svg';
import './navbar.css';

const Menu = () => (
    <>
        <p><a href='/'>Home</a></p>
        <p><a href='/resume'>Resume</a></p>
        <p><a href='/projects'>Projects</a></p>
        <p><a href='/blog'>Blog</a></p>
        <p><a href='/login'>Login</a></p>
    </>
);

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <div className='profile__navbar'>
            <div className='profile__navbar-links'>
                <div className='profile__navbar-links_logo'>
                    <img src={logo} alt='logo'/>
                </div>

                <div className='profile__navbar-links_container'>
                    <Menu />
                </div>
            </div>

            <div className='profile__navbar-menu'>
                {toggleMenu
                    ? <RiCloseLine color='#fff' size='27' onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color='#fff' size='27' onClick={() => setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <div className='profile__navbar-menu_container scale-up-center'>
                        <div className='profile__navbar-menu_container-links'>
                            <Menu />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;