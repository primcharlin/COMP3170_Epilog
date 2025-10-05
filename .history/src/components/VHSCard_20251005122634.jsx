import React from "react";
import moviesData from "../../data/epilog.json";

function VHSCard({ title }) {
    const movie = moviesData.find((m) => m.title === title);
    const bgUrl = movie && movie.image ? `/${movie.image}` : "/images/NoMovie.avif";

    return (
        <div
            className="vhs-card"
            style={{ backgroundImage: `url(${bgUrl})` }}
            role="img"
            aria-label={title}
        >
            <div className="vhs-card-overlay" />
            <div className="vhs-card-title">{title}</div>
        </div>
    );
}

export default VHSCard;


