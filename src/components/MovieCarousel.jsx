import React, { useRef } from "react";
import BasicMovieCard from "./BasicMovieCard";
import "../App.css";

function MovieCarousel({ movies, onAdd }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="carousel-wrapper">
      <button className="arrow left" onClick={() => scroll("left")}>
        &#10094;
      </button>
      <div className="carousel" ref={carouselRef}>
        {movies.map((movie, index) => {
          // Calculate the actual index in the full movieData array (add 1 because movies are sliced from index 1)
          const actualIndex = index + 1;
          return (
            <BasicMovieCard
              key={index}
              image={movie.image}
              title={movie.title}
              addToWatchlist={() => onAdd(movie)}
              movieId={actualIndex}
            />
          );
        })}
      </div>
      <button className="arrow right" onClick={() => scroll("right")}>
        &#10095;
      </button>
    </div>
  );
}

export default MovieCarousel;
