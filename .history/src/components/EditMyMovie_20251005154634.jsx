import React, { useState } from "react";

function EditMyMovie({ movie, onEdit }) {
    const {
        title= "Movie Title",
        image= "images/NoMovie.avif",
        rating= 0,
        notes= "",
        dateWatched= "",
        status= "ongoing",
    } = movie || {};
    
    const posterUrl = image ? `/${image}` : "/images/NoMovie.avif";

    const [isEditing, setIsEditing] = useState(false);
    const [currentRating, setCurrentRating] = useState(rating);
    const [currentNotes, setCurrentNotes] = useState(notes);
    const [currentDateWatched, setCurrentDateWatched] = useState(dateWatched);
    const [currentStatus, setCurrentStatus] = useState(status);

    const handleSetRating = (value) => {
        if (isEditing) {
            setCurrentRating(value);
        }
    };

    const handleEditClick = () => {
        if (isEditing) {
            // Save changes
            setIsEditing(false);
            // You can add save logic here
        } else {
            // Enter edit mode
            setIsEditing(true);
        }
    };

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="form-container">
            {title && (
                <div className="selected-movie">
                    <img src={posterUrl} alt={`${title} poster`} />
                    <div className="selected-movie-title">{title}</div>
                </div>
            )}

            <div className="form-control">
                <label>Rating</label>
                <div className="rating-group" aria-label="Rating">
                    {stars.map((star) => (
                        <button
                            key={star}
                            type="button"
                            aria-label={`${star} star${star > 1 ? "s" : ""}`}
                            onClick={() => handleSetRating(star)}
                            className={`rating-star ${star <= currentRating ? "active" : ""}`}
                            disabled={!isEditing}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-control form-control--stack">
                <label>Notes</label>
                <textarea 
                    value={currentNotes} 
                    onChange={(e) => isEditing && setCurrentNotes(e.target.value)}
                    rows="4" 
                    readOnly={!isEditing}
                />
            </div>

            <div className="form-control">
                <label>Date Watched</label>
                <input 
                    type="date" 
                    value={currentDateWatched} 
                    onChange={(e) => isEditing && setCurrentDateWatched(e.target.value)}
                    readOnly={!isEditing}
                />
            </div>

            <div className="form-control">
                <label>Status</label>
                <select 
                    value={currentStatus} 
                    onChange={(e) => isEditing && setCurrentStatus(e.target.value)}
                    disabled={!isEditing}
                >
                    <option value="ongoing">ongoing</option>
                    <option value="complete">complete</option>
                    <option value="cancelled">cancelled</option>
                </select>
            </div>

            <button type="button" className="save" onClick={handleEditClick}>
                {isEditing ? "SAVE" : "EDIT"}
            </button>
        </div>
    );
}

export default EditMyMovie;


