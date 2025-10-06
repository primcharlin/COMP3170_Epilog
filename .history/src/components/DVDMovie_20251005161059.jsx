import React from "react";
import moviesData from "../data/epilog.json";

function DVDMovie({ title, onClick, onRemove }) {
    const movie = moviesData.find((m) => m.title === title);
    const bgUrl = movie && movie.image ? `/${movie.image}` : "/images/NoMovie.avif";
    const titleLength = (title || "").length;
    const titleSizeClass = titleLength > 18 ? "xlong" : titleLength > 12 ? "long" : "";

    const handleRemove = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        if (onRemove) {
            onRemove(title);
        }
    };

    return (
        <div
            className="vhs-card"
            style={{ backgroundImage: `url(${bgUrl})` }}
            role="img"
            aria-label={title}
            onClick={onClick}
        >
            <div className="vhs-card-overlay" />
            <div className={`vhs-card-title ${titleSizeClass}`}>{title}</div>
            {onRemove && (
                <button 
                    className="vhs-card-remove" 
                    onClick={handleRemove}
                    aria-label={`Remove ${title}`}
                >
                    ×
                </button>
            )}
        </div>
    );
}

export default DVDMovie;


