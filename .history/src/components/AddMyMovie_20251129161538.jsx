import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useMovies } from "../context/MoviesContext";

const resolvePosterUrl = (imagePath) => {
    const normalized = typeof imagePath === "string" ? imagePath : "";
    if (!normalized) {
        return "/images/NoMovie.avif";
    }
    if (normalized.startsWith('http') || normalized.startsWith('/')) {
        return normalized;
    }
    return `/${normalized}`;
};

function AddMyMovie({ onSave }) {
    const { movies: moviesData } = useMovies();
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");
    const [dateWatched, setDateWatched] = useState("");
    const [status, setStatus] = useState("ongoing");
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSetRating = (value) => {
        setRating(value);
    };

    const handleSearchSubmit = async (term) => {
        const normalized = (term || "").trim().toLowerCase();
        const match = moviesData.find((m) => m.title && m.title.toLowerCase().includes(normalized));
        if (match) {
            setSelectedMovie({
                title: match.title,
                posterUrl: resolvePosterUrl(match.image),
            });
            return;
        }
        if (moviesData.length > 0) {
            setSelectedMovie({
                title: moviesData[0].title,
                posterUrl: resolvePosterUrl(moviesData[0].image),
            });
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedMovie && onSave) {
            const newMovie = {
                title: selectedMovie.title,
                rating: rating,
                notes: notes,
                dateWatched: dateWatched,
                status: status,
                image: moviesData.find(m => m.title === selectedMovie.title)?.image || "images/NoMovie.avif",
                watchmode_id: moviesData.find(m => m.title === selectedMovie.title)?.watchmode_id || ""
            };
            onSave(newMovie);
        }
    };

    const handleKeyDown = (e) => {
        // Submit form on Enter (except in textarea where we use Ctrl+Enter or Shift+Enter)
        // Also exclude search input - it handles its own Enter key
        if (e.key === 'Enter') {
            const isSearchInput = e.target.closest('.search-input-wrapper') || 
                                  e.target.classList.contains('search-input');
            
            if (isSearchInput) {
                // Let SearchBar handle its own Enter key
                return;
            }
            
            if (e.target.tagName === 'TEXTAREA') {
                // For textarea, submit on Ctrl+Enter or Shift+Enter
                if (e.ctrlKey || e.shiftKey) {
                    e.preventDefault();
                    handleSave(e);
                }
            } else {
                // For other inputs, submit on Enter
                e.preventDefault();
                handleSave(e);
            }
        }
    };

    // Listen for Enter key on document level when form is active
    useEffect(() => {
        const handleDocumentKeyDown = (e) => {
            if (e.key === 'Enter' && selectedMovie) {
                const activeElement = document.activeElement;
                const isFormElement = activeElement.tagName === 'INPUT' || 
                                     activeElement.tagName === 'TEXTAREA' || 
                                     activeElement.tagName === 'SELECT' ||
                                     activeElement.tagName === 'BUTTON';
                
                // If search input is focused, let SearchBar handle it
                if (activeElement.classList.contains('search-input')) {
                    return;
                }
                
                // If no form element is focused, submit the form
                if (!isFormElement) {
                    e.preventDefault();
                    if (onSave) {
                        const newMovie = {
                            title: selectedMovie.title,
                            rating: rating,
                            notes: notes,
                            dateWatched: dateWatched,
                            status: status,
                            image: moviesData.find(m => m.title === selectedMovie.title)?.image || "images/NoMovie.avif",
                            watchmode_id: moviesData.find(m => m.title === selectedMovie.title)?.watchmode_id || ""
                        };
                        onSave(newMovie);
                    }
                }
            }
        };

        document.addEventListener('keydown', handleDocumentKeyDown);
        return () => {
            document.removeEventListener('keydown', handleDocumentKeyDown);
        };
    }, [selectedMovie, rating, notes, dateWatched, status, onSave, moviesData]);

    return (
        <div className="form-container">
            {selectedMovie && (
                <div className="selected-movie">
                    <img src={selectedMovie.posterUrl} alt={`${selectedMovie.title} poster`} />
                    <div className="selected-movie-title">{selectedMovie.title}</div>
                </div>
            )}
            <form onSubmit={handleSave} onKeyDown={handleKeyDown}>
                <div className="form-control form-control--stack">
                    <label htmlFor="SearchMovie">Search Movie...</label>
                    <SearchBar onSearch={handleSearchSubmit} placeholder="Search for a movie title..." />
                </div>
                <div className="form-control">
                    <label htmlFor="rating">Rating</label>
                    <div role="radiogroup" aria-label="Rating" className="rating-group">
                        {[1,2,3,4,5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                                onClick={() => handleSetRating(star)}
                                className={`rating-star ${star <= rating ? "active" : ""}`}
                            >
                                ★
                            </button>
                        ))}
                        <input type="hidden" name="rating" value={rating} />
                    </div>
                </div>
                <div className="form-control form-control--stack">
                    <label htmlFor="notes">Notes</label>
                    <textarea 
                        name="notes" 
                        placeholder="Notes" 
                        rows="4"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="date-watched">Date Watched</label>
                    <input 
                        type="date" 
                        id="date-watched"
                        name="date-watched"
                        value={dateWatched}
                        onChange={(e) => setDateWatched(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="status">Status</label>
                    <select 
                        name="status" 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="ongoing">ongoing</option>
                        <option value="complete">complete</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <button type="submit" className="save">SAVE</button>
            </form>
        </div>
    );
}

export default AddMyMovie;