import React from "react";
import moviesData from "../../data/epilog.json";

function DVDMovie({ title }) {
    const movie = moviesData.find((m) => m.title === title);
    const bgUrl = movie && movie.image ? `/${movie.image}` : "/images/NoMovie.avif";
    const titleLength = (title || "").length;
    const titleSizeClass = titleLength > 18 ? "xlong" : titleLength > 12 ? "long" : "";

    return (
        <div
            className="vhs-card"
            style={{ backgroundImage: `url(${bgUrl})` }}
            role="img"
            aria-label={title}
        >
            <div className="vhs-card-overlay" />
            <div className={`vhs-card-title ${titleSizeClass}`}>{title}</div>
        </div>
    );
}

export default DVDMovie;


