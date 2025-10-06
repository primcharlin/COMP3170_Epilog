import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className='header'>
            <h1>Epilog</h1>
            <div className='header-right'>
                <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul>
                        <li>
                            <Link to='/' onClick={closeMobileMenu}>
                                {/* Home icon */}
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M3 10.75L12 3l9 7.75V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.25Z'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/browse' onClick={closeMobileMenu}>
                                {/* Browse (search) */}
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M21 21l-4.5-4.5M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <span>Browse</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/my-movies' onClick={closeMobileMenu}>
                                {/* My Movies (film) */}
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <rect
                                        x='3'
                                        y='5'
                                        width='18'
                                        height='14'
                                        rx='2'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                    />
                                    <path
                                        d='M7 5v14M17 5v14M3 9h4M17 9h4M3 15h4M17 15h4'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                    />
                                </svg>
                                <span>My Movies</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/watchlist' onClick={closeMobileMenu}>
                                {/* Favourites & My Reviews (heart) */}
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <span>Watchlist</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <HeaderSearchBar />
                <button 
                    className='mobile-menu-toggle'
                    onClick={toggleMobileMenu}
                    aria-label='Toggle mobile menu'>
                    <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>
        </header>
    );
};

export default Header;
