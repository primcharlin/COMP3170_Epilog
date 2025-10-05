import React from "react";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
    return (
        <header className='header'>
            <h1>Epilog</h1>
            <div className='header-right'>
                <nav>
                    <ul>
                        <li>
                            <a href='#home'>
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
                            </a>
                        </li>
                        <li>
                            <a href='#browse'>
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
                            </a>
                        </li>
                        <li>
                            <a href='#my-movies'>
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
                            </a>
                        </li>
                        <li>
                            <a href='#favourites-myreviews'>
                                {/* Favourites & My Reviews (star) */}
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M12 3l2.9 5.88 6.1.89-4.4 4.29 1.04 6.07L12 17.77l-5.64 2.96L7.4 14.06 3 9.77l6.1-.89L12 3Z'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                                <span>Favourites & My Reviews</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <HeaderSearchBar />
            </div>
        </header>
    );
};

export default Header;
