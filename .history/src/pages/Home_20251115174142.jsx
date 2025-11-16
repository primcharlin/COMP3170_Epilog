import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import Popup from "../components/Popup";
import movieData from "../data/epilog.json";

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

  useEffect(() => {
    setRandomMovie(getRandomMovie());
  }, []);

  const handleRandomMovie = () => {
    setRandomMovie(getRandomMovie());
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
            {randomMovie && (
              <div className="random-movie-info">
                <div className="movie-info-item">
                  <span className="info-label">Title:</span>
                  <span className="info-value">{randomMovie.title}</span>
                </div>
                <div className="movie-info-item">
                  <span className="info-label">Genre:</span>
                  <span className="info-value">Comedy</span>
                </div>
                <div className="movie-info-item">
                  <span className="info-label">Rating:</span>
                  <span className="info-value">4.5/5</span>
                </div>
              </div>
            )}
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
