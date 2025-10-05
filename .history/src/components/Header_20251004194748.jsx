import React from "react";
import HeaderSearchBar from "./HeaderSearchBar";

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
                        <a href='#favourites-myreviews'>
                            Favourites & My Reviews
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
