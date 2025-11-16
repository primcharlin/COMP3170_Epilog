import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import Popup from "../components/Popup";
import movieData from "../data/epilog.json";

const Home = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(stored);
    }, []);

    const handleAddToWatchlist = (movie) => {
        const exists = watchlist.some((m) => m.title === movie.title);
        if (!exists) {
            const updated = [...watchlist, movie];
            setWatchlist(updated);
            localStorage.setItem("watchlist", JSON.stringify(updated));

            setPopupMessage(`${movie.title} has been added to your watchlist.`);

            setTimeout(() => {
                setPopupMessage("");
            }, 5000);
        }
    };

    return (
        <>
            <h1>
                Your Personal Movie <span className='catalog-text'>Catalog</span>
            </h1>
            <h3>
                Track movies you've watched, discover new favorites, and keep
                your personal reviews all in one place. Your cinematic journey
                starts here.
            </h3>

            <SearchBar />

            <MovieCarousel 
                movies={movieData.slice(1)} 
                onAdd={handleAddToWatchlist} 
            />

            {popupMessage && <Popup message={popupMessage} />}
        </>
    );
};

export default Home;
