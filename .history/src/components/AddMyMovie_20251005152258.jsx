import React, { useState } from "react";
import SearchBar from "./SearchBar";
import moviesData from "../data/epilog.json";

function AddMyMovie() {
    const [rating, setRating] = useState(0);

    const handleSetRating = (value) => {
        setRating(value);
    };

    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSearchSubmit = async (term) => {
        const normalized = (term || "").trim().toLowerCase();
        const match = moviesData.find((m) => m.title && m.title.toLowerCase().includes(normalized));
        if (match) {
            setSelectedMovie({
                title: match.title,
                posterUrl: `/${match.image}`,
            });
            return;
        }
        if (moviesData.length > 0) {
            setSelectedMovie({
                title: moviesData[0].title,
                posterUrl: `/${moviesData[0].image}`,
            });
        }
    };

    return (
        <div className="form-container">
            {selectedMovie && (
                <div className="selected-movie">
                    <img src={selectedMovie.posterUrl} alt={`${selectedMovie.title} poster`} />
                    <div className="selected-movie-title">{selectedMovie.title}</div>
                </div>
            )}
            <form>
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
                    <textarea name="notes" placeholder="Notes" rows="4"/>
                </div>
                <div className="form-control">
                    <label htmlFor="date-watched">Date Watched</label>
                    <input type="date" name="date-watched"/>
                </div>
                <div className="form-control">
                    <label htmlFor="status">Status</label>
                    <select name="status" defaultValue="ongoing">
                        <option value="ongoing">ongoing</option>
                        <option value="complete">complete</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <button className="save">SAVE</button>
            </form>
        </div>
    );
}

export default AddMyMovie;