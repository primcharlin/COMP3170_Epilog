import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const { movies: movieData } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (movieTitle) => {
    const updated = watchlist.filter((m) => m.title !== movieTitle);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const handleMovieClick = (movie) => {
    const movieIndex = movieData.findIndex((m) => m.title === movie.title);
    if (movieIndex !== -1) {
      navigate(`/movie/${movieIndex}`);
    }
  };

  return (
    <div className="page-section">
      <h2>My Watchlist</h2>
      <p>Movies you want to watch later.</p>

      {watchlist.length === 0 ? (
        <p className="empty-text">No movies in your watchlist yet.</p>
      ) : (
        <div className="watchlist-container">
          {watchlist.map((movie, index) => {
            const imageUrl = movie.image?.startsWith('http') 
              ? movie.image 
              : `/${movie.image || 'images/NoMovie.avif'}`;
            
            return (
              <div key={movie.title || index} className="watchlist-item">
                <img
                  src={imageUrl}
                  alt={movie.title}
                  className="watchlist-poster"
                  onClick={() => handleMovieClick(movie)}
                />
                <h3 className="watchlist-title">{movie.title}</h3>
                <button
                  className="remove-btn-watchlist"
                  onClick={() => handleRemove(movie.title)}
                >
                  Remove from Watchlist
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
