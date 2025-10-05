import React from "react";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
    return (
        <header className='header'>
            <h1>Epilog</h1>
            <div className="header-right">
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
                <HeaderSearchBar />
            </div>
        </header>
    );
};

export default Header;
