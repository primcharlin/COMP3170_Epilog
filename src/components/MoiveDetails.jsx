import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MoviesContext';
import Modal from './Modal';
import EditMyMovie from './EditMyMovie';
import Popup from './Popup';

const LOCAL_STORAGE_KEY = 'watchedMovies';
const resolveImagePath = (imagePath) => {
    if (!imagePath) return "/images/NoMovie.avif";
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
    }
    return `/${imagePath}`;
};

const MovieDetails = ({ movieId }) => {
    const { movies: epilogData } = useMovies();
    const [movie, setMovie] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {
        if (epilogData.length > 0) {
            // Find the movie by ID or index
            const foundMovie = epilogData[movieId] || epilogData[0];
            setMovie(foundMovie);
        }
        // Load watchlist and watched movies from localStorage
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        const savedWatched = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        setWatchlist(savedWatchlist);
        setWatchedMovies(savedWatched);
    }, [movieId, epilogData]);

    const persistWatchedMovies = (updater) => {
        setWatchedMovies((prev) => {
            const updatedList = typeof updater === 'function' ? updater(prev) : updater;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
            return updatedList;
        });
    };

    const addToWatchlist = () => {
        if (movie && !watchlist.find(item => item.title === movie.title)) {
            const newWatchlist = [...watchlist, movie];
            setWatchlist(newWatchlist);
            localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
            setPopupMessage(`"${movie.title}" has been added to Watchlist`);
            setShowPopup(true);
        } else {
            setPopupMessage(`"${movie.title}" is already in your watchlist!`);
            setShowPopup(true);
        }
    };

    const markAsWatched = () => {
        if (!movie) return;

        const baseWatchedMovie = {
            title: movie.title,
            image: movie.image,
            rating: 0,
            notes: "",
            dateWatched: new Date().toISOString().split('T')[0],
            status: "completed",
            watchmode_id: movie.watchmode_id || movie.id || movie.tmdb_id || movie.imdb_id || ""
        };

        const existingIndex = watchedMovies.findIndex(
            (item) =>
                (item.watchmode_id && baseWatchedMovie.watchmode_id && item.watchmode_id === baseWatchedMovie.watchmode_id) ||
                item.title === baseWatchedMovie.title
        );

        let updatedWatchedMovies = [];
        if (existingIndex !== -1) {
            updatedWatchedMovies = watchedMovies.map((item, index) =>
                index === existingIndex ? { ...item, ...baseWatchedMovie } : item
            );
            setPopupMessage(`"${movie.title}" is already in Watched. You can update its details.`);
        } else {
            updatedWatchedMovies = [...watchedMovies, baseWatchedMovie];
            setPopupMessage(`"${movie.title}" has been added to Watched`);
        }

        persistWatchedMovies(updatedWatchedMovies);

        setSelectedMovie({
            ...baseWatchedMovie,
            image: movie.image
        });
        setIsEditModalOpen(true);
        setShowPopup(true);
    };

    const handleWatchedSave = (updatedMovie) => {
        persistWatchedMovies((current) =>
            current.map((item) => {
                const matchesById =
                    item.watchmode_id &&
                    updatedMovie.watchmode_id &&
                    item.watchmode_id === updatedMovie.watchmode_id;
                const matchesByTitle = item.title === updatedMovie.title;
                if (matchesById || matchesByTitle) {
                    return { ...item, ...updatedMovie };
                }
                return item;
            })
        );
        setSelectedMovie(updatedMovie);
        setIsEditModalOpen(false);
        setPopupMessage(`"${updatedMovie.title}" has been updated`);
        setShowPopup(true);
    };

    if (!movie) {
        return <div className="movie-details-loading">Loading...</div>;
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-content">
                <img
                    className="movie-details-background"
                    src={resolveImagePath(movie.image)}
                    alt={movie.title}
                />
                <div className="movie-details-gradient"></div>
                
                {/* Left Column */}
                <div className="movie-details-left">
                    <h1 className="movie-details-title">{movie.title}</h1>
                    
                    <div className="movie-details-meta">
                        {movie.year && <span className="movie-year">{movie.year}</span>}
                        {movie.runtime_minutes && <span className="movie-runtime">{movie.runtime_minutes} min</span>}
                        {movie.genres && movie.genres.length > 0 && (
                            <span className="movie-genres-text">{movie.genres.join(" • ")}</span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="movie-details-rating">
                        <span className="rating-star">★</span>
                        <span className="rating-value">{movie.imdb_rating || movie.tmdb_rating || 'N/A'}</span>
                    </div>

                    {/* Synopsis */}
                    <div className="movie-details-synopsis">
                        <p>{movie.description || "No description available."}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="movie-details-buttons">
                        <button
                            className="movie-details-watchlist-btn"
                            onClick={addToWatchlist}
                        >
                            Add to Watchlist
                        </button>
                        <button
                            className="movie-details-watched-btn"
                            onClick={markAsWatched}
                        >
                            Mark as Watched
                        </button>
                    </div>

                    {/* Credits */}
                    <div className="movie-details-credits">
                        <div className="credit-item">
                            <span className="credit-label">Director:</span>
                            <span className="credit-name">Ernest R. Dickerson</span>
                        </div>
                        <div className="credit-item">
                            <span className="credit-label">Writers:</span>
                            <span className="credit-name">Joe Gayton, Lewis Colick</span>
                        </div>
                        <div className="credit-item">
                            <span className="credit-label">Stars:</span>
                            <span className="credit-name">Damon Wayans, Adam Sandler, James Caan</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Poster */}
                <div className="movie-details-right">
                    <img
                        className="movie-details-poster"
                        src={resolveImagePath(movie.image)}
                        alt={`${movie.title} poster`}
                    />
                </div>
            </div>
            {/* Edit Movie Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit My Movie"
            >
                {selectedMovie && <EditMyMovie movie={selectedMovie} onSave={handleWatchedSave} />}
            </Modal>
            {/* Popup for notifications */}
            {showPopup && popupMessage && (
                <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
};

export default MovieDetails;
