import React from "react";

const Header = () => {
    return (
        <header className='header'>
            <h1>Epilog</h1>
            <nav>
                <ul>
                    <li>
                        <a href='#home'>Home</a>
                    </li>
                    <li>
                        <a href='#browse'>Browse</a>
                    </li>
                    <li>
                        <a href='#my-movies'>My Movies</a>
                    </li>
                    <li>
                        <a href='#favourites'>Favourites</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
