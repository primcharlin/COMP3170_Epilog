import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import Popup from "../components/Popup";
import { useMovies } from "../context/MoviesContext";

const Home = () => {
  const { movies: movieData, loading } = useMovies();
  const [watchlist, setWatchlist] = useState(() => {
    
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [randomMovie, setRandomMovie] = useState(null);

  const getRandomMovie = () => {
    const availableMovies = movieData.filter(m => m.title !== "No Movie Found");
    if (availableMovies.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableMovies.length);
    return availableMovies[randomIndex];
  };

  useEffect(() => {
    if (movieData.length > 0) {
      setRandomMovie(getRandomMovie());
    }
  }, [movieData]);

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

  if (loading) {
    return (
      <div className="home-page">
        <div>Loading movies...</div>
      </div>
    );
  }

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
            <h2>Discover a New Movie</h2>
            <div className="random-movie-description">
              <p>Not sure what to watch? Feeling adventurous? Just click on the random button and let the universe decide for you. Each tap serves you a totally unexpected movie from our huge selection ofhidden gems, comfort films, wildcards, the works. It's like shaking a mystery box of movies and seeing what pops out.</p>
              <p>Whether you're indecisive, bored of scrolling, or just love surprises, this feature is your shortcut to discovering something new without the endless "what should we watch?" debate. One click, one surprise, infinite movie nights..</p>
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
                  <span className="info-value">{randomMovie.genres?.join(', ') || 'N/A'}</span>
                </div>
                <div className="movie-info-item">
                  <span className="info-label">Rating:</span>
                  <span className="info-value">{randomMovie.imdb_rating || randomMovie.tmdb_rating || 'N/A'}</span>
                </div>
              </div>
            )}
          </div>
          <div className="random-movie-right">
            {randomMovie && (
              <img 
                src={randomMovie.image.startsWith('http') ? randomMovie.image : `/${randomMovie.image}`} 
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
