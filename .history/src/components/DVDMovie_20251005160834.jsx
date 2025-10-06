import React, { useState } from "react";
import moviesData from "../data/epilog.json";

function DVDMovie({ title, onClick, onRemove }) {
    const [isFlipping, setIsFlipping] = useState(false);
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

    const handleClick = () => {
        setIsFlipping(true);
        // Wait for flip animation to complete, then open modal
        setTimeout(() => {
            if (onClick) {
                onClick();
            }
            // Reset flip state after modal opens
            setTimeout(() => {
                setIsFlipping(false);
            }, 100);
        }, 300); // Half of the 0.6s animation
    };

    return (
        <div
            className={`vhs-card ${isFlipping ? 'flipping' : ''}`}
            style={{ backgroundImage: `url(${bgUrl})` }}
            role="img"
            aria-label={title}
            onClick={handleClick}
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


