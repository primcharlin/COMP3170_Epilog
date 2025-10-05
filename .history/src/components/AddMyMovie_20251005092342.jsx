import React, { useState } from "react";

function AddMyMovie() {
    const [rating, setRating] = useState(0);

    const handleSetRating = (value) => {
        setRating(value);
    };

    return (
        <div className="form-container">
            <form>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Movie Title..."/>
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