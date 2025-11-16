import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MoviesContext';
import Modal from './Modal';
import EditMyMovie from './EditMyMovie';
import Popup from './Popup';

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
        const savedWatched = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
        setWatchlist(savedWatchlist);
        setWatchedMovies(savedWatched);
    }, [movieId, epilogData]);

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
        if (movie) {
            // Set up the movie data for the edit form
            setSelectedMovie({
                title: movie.title,
                posterUrl: movie.image.startsWith('http') ? movie.image : `/${movie.image}`,
                rating: "4",
                notes: "",
                dateWatched: new Date().toISOString().split('T')[0],
                status: "completed"
            });
            // Open the edit modal
            setIsEditModalOpen(true);
        }
    };

    if (!movie) {
        return <div className="movie-details-loading">Loading...</div>;
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-content">
                <img
                    className="movie-details-background"
                    src={movie.image.startsWith('http') ? movie.image : `/${movie.image}`}
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
                        src={movie.image.startsWith('http') ? movie.image : `/${movie.image}`}
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
                {selectedMovie && <EditMyMovie movie={selectedMovie} />}
            </Modal>
            {/* Popup for notifications */}
            {showPopup && popupMessage && (
                <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
};

export default MovieDetails;
