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
                {/* Left Column */}
                <div className="movie-details-left">
                    {/* Movie Title and Basic Info */}
                    <div className="movie-title-section">
                        <h1 className="movie-title">{movie.title}</h1>
                        <div className="movie-meta">
                            {movie.year && <span className="movie-year">{movie.year}</span>}
                            {movie.runtime_minutes && <span className="movie-runtime">{movie.runtime_minutes} min</span>}
                        </div>
                    </div>

                    {/* Movie Poster */}
                    <div className="movie-poster-section">
                        <img
                            src={movie.image.startsWith('http') ? movie.image : `/${movie.image}`}
                            alt={movie.title}
                            className="movie-poster"
                        />
                    </div>

                    {/* Genre Tags */}
                    <div className="movie-genres">
                        {movie.genres && movie.genres.length > 0 ? (
                            movie.genres.map((genre, index) => (
                                <span key={index} className="genre-tag">{genre}</span>
                            ))
                        ) : (
                            <span className="genre-tag">N/A</span>
                        )}
                    </div>

                    {/* Synopsis */}
                    <div className="movie-synopsis">
                        <p>{movie.description || "No description available."}</p>
                    </div>

                    {/* Credits */}
                    <div className="movie-credits">
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

                {/* Right Column */}
                <div className="movie-details-right">
                    {/* IMDb Rating */}
                    <div className="rating-section">
                        <div className="imdb-rating">
                            <span className="rating-label">IMDb RATING</span>
                            <div className="rating-score">
                                <span className="star">★</span>
                                <span className="score">{movie.imdb_rating || movie.tmdb_rating || 'N/A'}/10</span>
                            </div>
                        </div>
                        <div className="user-rating">
                            <span className="rating-label">YOUR RATING</span>
                            <div className="rating-action">
                                <span className="star-outline">☆</span>
                                <span className="rate-text">Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button
                            className="watchlist-btn"
                            onClick={addToWatchlist}
                        >
                            <span className="btn-icon">+</span>
                            <span className="btn-text">Add to Watchlist</span>
                            <span className="btn-count">Added by 26.5K users</span>
                        </button>
                        <button
                            className="watched-btn"
                            onClick={markAsWatched}
                        >
                            <span className="btn-icon">👁</span>
                            <span className="btn-text">Mark as watched</span>
                        </button>
                    </div>

                    {/* Reviews */}
                    <div className="reviews-section">
                        <div className="review-links">
                            <span className="review-link">83 User reviews</span>
                            <span className="review-link">29 Critic reviews</span>
                            <span className="metascore">30 Metascore</span>
                        </div>
                    </div>
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
