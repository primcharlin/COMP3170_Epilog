import React, { useState } from "react";
import BasicMovieCard from "../components/BasicMovieCard";
import movieData from "../data/epilog.json";

const Browse = () => {
  const [watchlist, setWatchlist] = useState([]);

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.title === movie.title)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };


  const moviesToShow = movieData.slice(1);

  return (
    <>
      <h2>Browse Movies</h2>
      <div className="browse-grid">
        {moviesToShow.map((movie, index) => (
          <BasicMovieCard
            key={index}
            title={movie.title}
            image={movie.image}
            trailer={movie.trailer}
            addToWatchlist={() => handleAddToWatchlist(movie)}
          />
        ))}
      </div>
    </>
  );
};

export default Browse;
