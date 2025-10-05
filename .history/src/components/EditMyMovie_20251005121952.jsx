import React from "react";

function EditMyMovie({
    movie = {
        title: "Movie Title",
        posterUrl: "/images/NoMovie.avif",
        rating: 0,
        notes: "",
        dateWatched: "",
        status: "ongoing",
    },
    onEdit,
}) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="form-container">
            {movie.posterUrl && (
                <div className="selected-movie">
                    <img src={movie.posterUrl} alt={`${movie.title} poster`} />
                    <div className="selected-movie-title">{movie.title}</div>
                </div>
            )}

            <div className="form-control">
                <label>Rating</label>
                <div className="rating-group" aria-label="Rating">
                    {stars.map((star) => (
                        <span
                            key={star}
                            className={`rating-star ${star <= (movie.rating || 0) ? "active" : ""}`}
                            aria-hidden="true"
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            <div className="form-control form-control--stack">
                <label>Notes</label>
                <textarea value={movie.notes || ""} readOnly rows="4" />
            </div>

            <div className="form-control">
                <label>Date Watched</label>
                <input type="date" value={movie.dateWatched || ""} readOnly />
            </div>

            <div className="form-control">
                <label>Status</label>
                <select value={movie.status || "ongoing"} disabled>
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


