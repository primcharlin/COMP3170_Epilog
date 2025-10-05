import React from "react";
import SearchBar from "../components/SearchBar";

const Home = () => {
    return (
        <>
            <h1>
                {" "}
                Your Personal Movie{" "}
                <span className='catalog-text'>Catalog</span>{" "}
            </h1>
            <h3>
                Track movies you've watched, discover new favorites, and keep
                your personal reviews all in one place. Your cinematic journey
                starts here.
            </h3>
            <SearchBar />
        </>
    );
};

export default Home;
