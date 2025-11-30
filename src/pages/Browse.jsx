import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BasicMovieCard from "../components/BasicMovieCard";
import Popup from "../components/Popup";
import { useMovies } from "../context/MoviesContext";

const Browse = () => {
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

  // Group movies by genre and limit to 5 movies per genre for preview
  const moviesByGenre = useMemo(() => {
    const moviesToShow = movieData.slice(1); // Exclude the "No Movie Found" placeholder
    const grouped = {};
    const allMoviesByGenre = {}; // Store all movies for each genre (for "See All" functionality)
    
    moviesToShow.forEach((movie, index) => {
      const actualIndex = index + 1;
      const movieWithIndex = { ...movie, actualIndex };
      
      if (movie.genres && movie.genres.length > 0) {
        // Add movie to each of its genres
        movie.genres.forEach(genre => {
          if (!grouped[genre]) {
            grouped[genre] = [];
            allMoviesByGenre[genre] = [];
          }
          // Store all movies for this genre
          allMoviesByGenre[genre].push(movieWithIndex);
          // Only add to preview if the genre hasn't reached 5 movies yet
          if (grouped[genre].length < 5) {
            grouped[genre].push(movieWithIndex);
          }
        });
      } else {
        // If movie has no genre, put it in "Other" category
        if (!grouped["Other"]) {
          grouped["Other"] = [];
          allMoviesByGenre["Other"] = [];
        }
        // Store all movies for "Other"
        allMoviesByGenre["Other"].push(movieWithIndex);
        // Only add to preview if "Other" hasn't reached 5 movies yet
        if (grouped["Other"].length < 5) {
          grouped["Other"].push(movieWithIndex);
        }
      }
    });
    
    return { preview: grouped, all: allMoviesByGenre };
  }, [movieData]);

  const handleSeeAll = (genre) => {
    // Navigate to genre page with encoded genre name
    navigate(`/genre/${encodeURIComponent(genre)}`);
  };

  if (loading) {
    return (
      <div className='page-section'>
        <div>Loading movies...</div>
      </div>
    );
  }

  const genreKeys = Object.keys(moviesByGenre.preview).sort();

  return (
    <div className='page-section'>
      <h2>Browse Movies</h2>
      {genreKeys.length === 0 ? (
        <div className="empty-text">
          <p>No movies available.</p>
        </div>
      ) : (
        genreKeys.map((genre) => {
          const previewMovies = moviesByGenre.preview[genre];
          const allMovies = moviesByGenre.all[genre] || [];
          const hasMoreMovies = allMovies.length > 5;
          
          return (
            <div key={genre} className="genre-container">
              <div className="genre-header">
                <h3 className="genre-title">{genre}</h3>
                {hasMoreMovies && (
                  <button 
                    className="see-all-button"
                    onClick={() => handleSeeAll(genre)}
                  >
                    See All ({allMovies.length})
                  </button>
                )}
              </div>
              <div className="browse-grid">
                {previewMovies.map((movie, index) => (
                  <BasicMovieCard
                    key={`${genre}-${index}-${movie.title}`}
                    title={movie.title}
                    image={movie.image.startsWith('http') ? movie.image : `/${movie.image}`}
                    addToWatchlist={() => handleAddToWatchlist(movie)}
                    movieId={movie.actualIndex}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
      {showPopup && popupMessage && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Browse;
