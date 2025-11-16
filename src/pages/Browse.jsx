import React, { useState } from "react";
import BasicMovieCard from "../components/BasicMovieCard";
import Popup from "../components/Popup";
import { useMovies } from "../context/MoviesContext";

const Browse = () => {
  const { movies: movieData, loading } = useMovies();
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.title === movie.title)) {
      const updatedList = [...watchlist, movie];
      setWatchlist(updatedList);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
      
      setPopupMessage(`"${movie.title}" has been added to Watchlist`);
      setShowPopup(true);
    } else {
      setPopupMessage(`"${movie.title}" is already in your watchlist!`);
      setShowPopup(true);
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
        {moviesToShow.map((movie, index) => {
          // Calculate the actual index in the full movieData array (add 1 because we sliced from index 1)
          const actualIndex = index + 1;
          return (
            <BasicMovieCard
              key={index}
              title={movie.title}
              image={movie.image.startsWith('http') ? movie.image : `/${movie.image}`}
              addToWatchlist={() => handleAddToWatchlist(movie)}
              movieId={actualIndex}
            />
          );
        })}
      </div>
      {showPopup && popupMessage && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Browse;
