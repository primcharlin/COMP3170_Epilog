import React from "react";

function EditMyMovie({ movie = {}, onEdit }) {
    const {
        title= "Movie Title",
        posterUrl= "/images/NoMovie.avif",
        rating= 0,
        notes= "",
        dateWatched= "",
        status= "ongoing",
    } = movie;

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="form-container">
            {posterUrl && (
                <div className="selected-movie">
                    <img src={posterUrl} alt={`${title} poster`} />
                    <div className="selected-movie-title">{title}</div>
                </div>
            )}

            <div className="form-control">
                <label>Rating</label>
                <div className="rating-group" aria-label="Rating">
                    {stars.map((star) => (
                        <span
                            key={star}
                            className={`rating-star ${star <= (rating || 0) ? "active" : ""}`}
                            aria-hidden="true"
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            <div className="form-control form-control--stack">
                <label>Notes</label>
                <textarea value={notes || ""} readOnly rows="4" />
            </div>

            <div className="form-control">
                <label>Date Watched</label>
                <input type="date" value={dateWatched || ""} readOnly />
            </div>

            <div className="form-control">
                <label>Status</label>
                <select value={status || "ongoing"} disabled>
                    <option value="ongoing">ongoing</option>
                    <option value="complete">complete</option>
                    <option value="cancelled">cancelled</option>
                </select>
            </div>

            <button type="button" className="save" onClick={onEdit}>EDIT</button>
        </div>
    );
}

export default EditMyMovie;


