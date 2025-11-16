import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import Popup from "../components/Popup";
import movieData from "../data/epilog.json";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddToWatchlist = (movie) => {
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!existing.some((m) => m.title === movie.title)) {
      const updated = [...existing, movie];
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setPopupMessage(`${movie.title} added to Watchlist!`);
      setShowPopup(true);
    } else {
      setPopupMessage(`${movie.title} is already in your Watchlist!`);
      setShowPopup(true);
    }
  };

  return (
    <>
      <h1>
        Your Personal Movie <span className="catalog-text">Catalog</span>
      </h1>
      <h3>
        Track movies you've watched, discover new favorites, and keep your
        personal reviews all in one place. Your cinematic journey starts here.
      </h3>

      <SearchBar />

      <MovieCarousel
        movies={movieData.slice(1)}
        onAdd={handleAddToWatchlist}
      />

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default Home;
