import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import movieData from "../../data/epilog.json";

const Home = () => {
    const [watchlist, setWatchlist] = useState([]);

    const handleAddToWatchlist = (movie) => {
        if (!watchlist.some((m) => m.title === movie.title)) {
            setWatchlist((prev) => [...prev, movie]);
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

            <MovieCarousel movies={movieData} onAdd={handleAddToWatchlist} />

            {/* Watchlist 顯示 */}
            <h3>My Watchlist:</h3>
            {watchlist.length === 0 ? (
                <p>No movies added yet.</p>
            ) : (
                <ul>
                    {watchlist.map((movie, index) => (
                        <li key={index}>{movie.title}</li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Home;
