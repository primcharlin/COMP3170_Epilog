import React, { useState } from "react";
import BasicMovieCard from "../components/BasicMovieCard";
import { useMovies } from "../context/MoviesContext";

const Browse = () => {
  const { movies: movieData, loading } = useMovies();
  const [watchlist, setWatchlist] = useState([]);

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.title === movie.title)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  if (loading) {
    return (
      <div className='page-section'>
        <div>Loading movies...</div>
      </div>
    );
  }

  const moviesToShow = movieData.slice(1);

  return (
    <div className='page-section'>
      <h2>Browse Movies</h2>
      <div className="browse-grid">
        {moviesToShow.map((movie, index) => (
          <BasicMovieCard
            key={index}
            title={movie.title}
            image={movie.image.startsWith('http') ? movie.image : `/${movie.image}`}
            trailer={movie.trailer}
            addToWatchlist={() => handleAddToWatchlist(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;
