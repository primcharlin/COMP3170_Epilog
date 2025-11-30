import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BasicMovieCard from "../components/BasicMovieCard";
import Popup from "../components/Popup";
import { useMovies } from "../context/MoviesContext";

const GenreMovies = () => {
  const { genreName } = useParams();
  const navigate = useNavigate();
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

  // Get all movies for this genre
  const genreMovies = useMemo(() => {
    const moviesToShow = movieData.slice(1); // Exclude the "No Movie Found" placeholder
    const genreMoviesList = [];
    
    moviesToShow.forEach((movie, index) => {
      const actualIndex = index + 1;
      const movieWithIndex = { ...movie, actualIndex };
      
      if (genreName === "Other") {
        // If genre is "Other", include movies with no genres
        if (!movie.genres || movie.genres.length === 0) {
          genreMoviesList.push(movieWithIndex);
        }
      } else {
        // Check if movie belongs to this genre
        if (movie.genres && movie.genres.includes(genreName)) {
          genreMoviesList.push(movieWithIndex);
        }
      }
    });
    
    return genreMoviesList;
  }, [movieData, genreName]);

  if (loading) {
    return (
      <div className='page-section'>
        <div>Loading movies...</div>
      </div>
    );
  }

  // Decode genre name from URL
  const decodedGenreName = decodeURIComponent(genreName || "");

  return (
    <div className='page-section'>
      <button 
        className="back-button" 
        onClick={() => navigate('/browse')}
      >
        ← Back to Browse
      </button>
      <h2>{decodedGenreName} Movies</h2>
      {genreMovies.length === 0 ? (
        <div className="empty-text">
          <p>No movies found in this genre.</p>
        </div>
      ) : (
        <>
          <p className="genre-count">Found {genreMovies.length} movie{genreMovies.length !== 1 ? 's' : ''}</p>
          <div className="browse-grid">
            {genreMovies.map((movie, index) => (
              <BasicMovieCard
                key={`${decodedGenreName}-${index}-${movie.title}`}
                title={movie.title}
                image={movie.image.startsWith('http') ? movie.image : `/${movie.image}`}
                addToWatchlist={() => handleAddToWatchlist(movie)}
                movieId={movie.actualIndex}
              />
            ))}
          </div>
        </>
      )}
      {showPopup && popupMessage && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default GenreMovies;

