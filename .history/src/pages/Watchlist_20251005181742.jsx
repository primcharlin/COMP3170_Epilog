import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        // Clear any existing watchlist data first
        localStorage.removeItem('watchlist');
        
        // Add sample movies for demonstration
        const sampleMovies = [
            {
                title: "50 First Dates",
                image: "/images/50FirstDates.jpg"
            },
            {
                title: "Happy Gilmore",
                image: "/images/HappyGilmore.jpg"
            },
            {
                title: "Mr. Deeds",
                image: "/images/MrDeeds.jpg"
            },
            {
                title: "The Waterboy",
                image: "/images/TheWaterboy.jpg"
            },
            {
                title: "Billy Madison",
                image: "/images/BillyMadison.jpg"
            }
        ];
        
        setWatchlist(sampleMovies);
        localStorage.setItem('watchlist', JSON.stringify(sampleMovies));
        
        console.log('Sample movies added to watchlist:', sampleMovies);
    }, []);

    const removeFromWatchlist = (movieTitle) => {
        const updatedWatchlist = watchlist.filter(movie => movie.title !== movieTitle);
        setWatchlist(updatedWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    };

    return (
        <div className='page-section'>
            <h2>My Watchlist</h2>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty. Add some movies to get started!</p>
            ) : (
                <div className="watchlist-container">
                    {watchlist.map((movie, index) => (
                        <div key={index} className="watchlist-item">
                            <Link to={`/movie/${index}`} className="movie-link">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="watchlist-poster"
                                />
                                <h3 className="watchlist-title">{movie.title}</h3>
                            </Link>
                            <button
                                className="remove-btn-watchlist"
                                onClick={() => removeFromWatchlist(movie.title)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;