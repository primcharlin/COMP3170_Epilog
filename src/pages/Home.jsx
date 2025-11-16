import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import Popup from "../components/Popup";
import { useMovies } from "../context/MoviesContext";

const Home = () => {
    const { movies: movieData, loading } = useMovies();
    const navigate = useNavigate();
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem("watchlist");
        return saved ? JSON.parse(saved) : [];
    });

    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [randomMovie, setRandomMovie] = useState(null);
    const [randomMovieIndex, setRandomMovieIndex] = useState(null);

    const getRandomMovie = () => {
        const availableMovies = movieData.filter(
            (m) => m.title !== "No Movie Found"
        );
        if (availableMovies.length === 0) return { movie: null, index: null };
        const randomIndex = Math.floor(Math.random() * availableMovies.length);
        const selectedMovie = availableMovies[randomIndex];
        // Find the index in the original movieData array
        const originalIndex = movieData.findIndex(
            (m) => m.title === selectedMovie.title
        );
        return { movie: selectedMovie, index: originalIndex };
    };

    useEffect(() => {
        if (movieData.length > 0) {
            const { movie, index } = getRandomMovie();
            setRandomMovie(movie);
            setRandomMovieIndex(index);
        }
    }, [movieData]);

    const handleRandomMovie = () => {
        const { movie, index } = getRandomMovie();
        setRandomMovie(movie);
        setRandomMovieIndex(index);
    };

    const handlePosterClick = () => {
        if (randomMovieIndex !== null && randomMovieIndex !== undefined) {
            navigate(`/movie/${randomMovieIndex}`);
        }
    };

    const handleAddToWatchlist = (movie) => {
        if (!watchlist.some((m) => m.title === movie.title)) {
            const updatedList = [...watchlist, movie];
            setWatchlist(updatedList);
            localStorage.setItem("watchlist", JSON.stringify(updatedList));

            setPopupMessage(`"${movie.title}" has been added to Watchlist`);
            setShowPopup(true);
        } else {
            setPopupMessage(`"${movie.title}" is already in your watchlist!`);
            setShowPopup(true);
        }
    };

    const handleSearch = (searchTerm) => {
        if (!searchTerm || !searchTerm.trim()) {
            setPopupMessage("Please enter a movie title to search");
            setShowPopup(true);
            return;
        }

        const normalizedSearch = searchTerm.trim().toLowerCase();
        const foundMovie = movieData.find(
            (movie) =>
                movie.title &&
                movie.title.toLowerCase().includes(normalizedSearch) &&
                movie.title !== "No Movie Found"
        );

        if (foundMovie) {
            const movieIndex = movieData.findIndex(
                (m) => m.title === foundMovie.title
            );
            if (movieIndex !== -1) {
                navigate(`/movie/${movieIndex}`);
            }
        } else {
            setPopupMessage(`No movie found matching "${searchTerm}"`);
            setShowPopup(true);
        }
    };

    if (loading) {
        return (
            <div className='home-page'>
                <div>Loading movies...</div>
            </div>
        );
    }

    return (
        <div className='home-page'>
            <h1>
                Your Personal Movie{" "}
                <span className='catalog-text'>Catalog</span>
            </h1>
            <h3>
                Track movies you've watched, discover new favorites, and keep
                your personal reviews all in one place. Your cinematic journey
                starts here.
            </h3>
            <SearchBar onSearch={handleSearch} />
            <div className='random-movie-section'>
                {randomMovie && (
                    <div className='random-movie-content'>
                        <img
                            className='random-movie-background'
                            src={
                                randomMovie.image.startsWith("http")
                                    ? randomMovie.image
                                    : `/${randomMovie.image}`
                            }
                            alt={randomMovie.title}
                        />
                        <div className='random-movie-gradient'></div>
                        <div className='random-movie-left'>
                            <h2 className='random-movie-title'>
                                {randomMovie.title}
                            </h2>
                            <div className='random-movie-description'>
                                <p>
                                    Not sure what to watch? Feeling adventurous?
                                    Just click on the random button and let the
                                    universe decide for you. Each tap serves you
                                    a totally unexpected movie from our huge
                                    selection ofhidden gems, comfort films,
                                    wildcards, the works. It's like shaking a
                                    mystery box of movies and seeing what pops
                                    out.
                                </p>
                            </div>
                            <div className='random-movie-buttons'>
                                <button
                                    className='random-movie-button'
                                    onClick={handleRandomMovie}>
                                    Random Movie
                                </button>
                                <button
                                    className='add-to-watchlist-button'
                                    onClick={() =>
                                        handleAddToWatchlist(randomMovie)
                                    }
                                    disabled={watchlist.some(
                                        (m) => m.title === randomMovie.title
                                    )}>
                                    {watchlist.some(
                                        (m) => m.title === randomMovie.title
                                    )
                                        ? "In Watchlist"
                                        : "Add to Watchlist"}
                                </button>
                            </div>
                            <div className='random-movie-info'>
                                <div className='movie-info-item'>
                                    <span className='info-label'>Title:</span>
                                    <span className='info-value'>
                                        {randomMovie.title}
                                    </span>
                                </div>
                                <div className='movie-info-item'>
                                    <span className='info-label'>Genre:</span>
                                    <span className='info-value'>
                                        {randomMovie.genres?.join(", ") ||
                                            "N/A"}
                                    </span>
                                </div>
                                <div className='movie-info-item'>
                                    <span className='info-label'>Rating:</span>
                                    <span className='info-value'>
                                        {randomMovie.imdb_rating ||
                                            randomMovie.tmdb_rating ||
                                            "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='random-movie-right'>
                            <img
                                className='random-movie-poster'
                                src={
                                    randomMovie.image.startsWith("http")
                                        ? randomMovie.image
                                        : `/${randomMovie.image}`
                                }
                                alt={`${randomMovie.title} poster`}
                                onClick={handlePosterClick}
                            />
                        </div>
                    </div>
                )}
            </div>

            <MovieCarousel
                movies={movieData.slice(1)}
                onAdd={handleAddToWatchlist}
            />

            {showPopup && (
                <Popup
                    message={popupMessage}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default Home;
