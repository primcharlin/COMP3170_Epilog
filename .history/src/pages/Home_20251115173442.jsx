import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import Popup from "../components/Popup";
import movieData from "../data/epilog.json";

// Get a random movie from the data
const getRandomMovie = () => {
  const availableMovies = movieData.filter(m => m.title !== "No Movie Found");
  const randomIndex = Math.floor(Math.random() * availableMovies.length);
  return availableMovies[randomIndex];
};

const Home = () => {
  const [watchlist, setWatchlist] = useState(() => {
    
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [randomMovie, setRandomMovie] = useState(null);
  const [isManual, setIsManual] = useState(false);

  // Set initial random movie
  useEffect(() => {
    setRandomMovie(getRandomMovie());
  }, []);

  // Auto-rotate random movie every 5 seconds if not manually triggered
  useEffect(() => {
    if (!isManual) {
      const interval = setInterval(() => {
        setRandomMovie(getRandomMovie());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isManual]);

  const handleRandomMovie = () => {
    setIsManual(true);
    setRandomMovie(getRandomMovie());
    // Reset manual flag after 5 seconds to resume auto-rotation
    setTimeout(() => {
      setIsManual(false);
    }, 5000);
  };

  const handleAddToWatchlist = (movie) => {
    
    if (!watchlist.some((m) => m.title === movie.title)) {
      const updatedList = [...watchlist, movie];
      setWatchlist(updatedList);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));

    
      setPopupMessage(`"${movie.title}" has been added to Watchlist`);
      setShowPopup(true);
    }
  };

  return (
    <div className="home-page">
      <h1>
        Your Personal Movie <span className="catalog-text">Catalog</span>
      </h1>
      <h3>
        Track movies you've watched, discover new favorites, and keep your
        personal reviews all in one place. Your cinematic journey starts here.
      </h3>
      <SearchBar />
      <div className="random-movie-section">
        <div className="random-movie-content">
          <div className="random-movie-left">
            <h2>Homepage Header</h2>
            <div className="random-movie-description">
              <p className="description-label">Site Description-</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <button 
              className="random-movie-button" 
              onClick={handleRandomMovie}
            >
              Random Movie
            </button>
          </div>
          <div className="random-movie-right">
            {randomMovie && (
              <img 
                src={`/${randomMovie.image}`} 
                alt={`${randomMovie.title} poster`}
                className="random-movie-poster-img"
              />
            )}
          </div>
        </div>
      </div>


      <MovieCarousel
        movies={movieData.slice(1)}
        onAdd={handleAddToWatchlist}
      />

      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Home;
