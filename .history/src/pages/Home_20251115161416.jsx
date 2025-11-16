import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import Popup from "../components/Popup";
import movieData from "../data/epilog.json";

const Home = () => {
  const [watchlist, setWatchlist] = useState(() => {
    // 初始化 watchlist 從 localStorage
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddToWatchlist = (movie) => {
    // 如果 movie 不在 watchlist，才加入
    if (!watchlist.some((m) => m.title === movie.title)) {
      const updatedList = [...watchlist, movie];
      setWatchlist(updatedList);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));

      // 顯示 popup
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

      <MovieCarousel
        movies={movieData.slice(1)}
        onAdd={handleAddToWatchlist}
      />

      {/* Popup 出現在 Carousel 下方 */}
      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Home;
