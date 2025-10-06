import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCarousel from "../components/MovieCarousel";
import movieData from "../data/epilog.json";

const sampleMovies = [
    {
      title: "M3GAN 2.0",
      image: "https://via.placeholder.com/150x220?text=Inception",
      trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    },
    {
      title: "Alice in Borderland",
      image: "https://via.placeholder.com/150x220?text=Titanic",
      trailer: "https://www.youtube.com/watch?v=kVrqfYjkTdQ",
    },
    {
      title: "Unbelievable",
      image: "https://via.placeholder.com/150x220?text=Avengers",
      trailer: "https://www.youtube.com/watch?v=eOrNdBpGMv8",
    },
    {
      title: "The Girlfriend",
      image: "https://via.placeholder.com/150x220?text=Frozen",
      trailer: "https://www.youtube.com/watch?v=TbQm5doF_Uc",
    },
    {
      title: "Monster",
      image: "https://via.placeholder.com/150x220?text=Joker",
      trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
    },
  ];
  

const Home = () => {
    const [watchlist, setWatchlist] = useState([]);

  // 點擊 Add 按鈕，把電影加入 watchlist
  const handleAddToWatchlist = (movie) => {
    // 防止重複加入
    if (!watchlist.some((m) => m.title === movie.title)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };
    return (
        <>
            <h1>
                {" "}
                Your Personal Movie{" "}
                <span className='catalog-text'>Catalog</span>{" "}
            </h1>
            <h3>
                Track movies you've watched, discover new favorites, and keep
                your personal reviews all in one place. Your cinematic journey
                starts here.
            </h3>
            <SearchBar />
        {/* Movie Carousel 放在 SearchBar 後面 */}
      <MovieCarousel movies={sampleMovies} onAdd={handleAddToWatchlist} />

{/* Watchlist 顯示 */}
<h3>My Watchlist:</h3>
{watchlist.length === 0 ? (
  <p>No movies added yet.</p>
) : (
  <ul>
    {watchlist.map((movie, index) => (
      <li key={index}>{movie.title}</li>
    ))}
  </ul>
)}
</>
);
};

export default Home;
