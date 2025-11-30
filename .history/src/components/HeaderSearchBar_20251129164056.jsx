import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/MoviesContext";

const resolvePosterUrl = (imagePath) => {
    const normalized = typeof imagePath === "string" ? imagePath : "";
    if (!normalized) {
        return "/images/NoMovie.avif";
    }
    if (normalized.startsWith('http') || normalized.startsWith('/')) {
        return normalized;
    }
    return `/${normalized}`;
};

const HeaderSearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { movies } = useMovies();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            const normalized = searchTerm.toLowerCase().trim();
            const filtered = movies
                .filter(m => m.title && m.title.toLowerCase().includes(normalized))
                .filter(m => m.title !== "No Movie Found")
                .slice(0, 10); // Show max 10 results
            setFilteredMovies(filtered);
            setShowDropdown(filtered.length > 0);
        } else {
            setFilteredMovies([]);
            setShowDropdown(false);
        }
    }, [searchTerm, movies]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current && 
                !searchRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (filteredMovies.length > 0) {
            const firstMovie = filteredMovies[0];
            const movieIndex = movies.findIndex(m => m.title === firstMovie.title);
            if (movieIndex !== -1) {
                navigate(`/movie/${movieIndex}`);
            }
            setSearchTerm("");
            setShowDropdown(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMovieSelect = (movie) => {
        const movieIndex = movies.findIndex(m => m.title === movie.title);
        if (movieIndex !== -1) {
            navigate(`/movie/${movieIndex}`);
        }
        setSearchTerm("");
        setShowDropdown(false);
    };

    return (
        <div className='header-search-container' ref={searchRef}>
            <form
                onSubmit={handleSearch}
                className='header-search-form'>
                <div className='header-search-wrapper'>
                    <input
                        type='text'
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={() => {
                            if (filteredMovies.length > 0) {
                                setShowDropdown(true);
                            }
                        }}
                        className='header-search-input'
                    />
                    <button
                        type='submit'
                        className='header-search-button'>
                        <svg
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </button>
                </div>
            </form>
            {showDropdown && filteredMovies.length > 0 && (
                <div className='header-search-dropdown' ref={dropdownRef}>
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie.watchmode_id || movie.title}
                            className='header-search-result'
                            onClick={() => handleMovieSelect(movie)}
                        >
                            <img 
                                src={resolvePosterUrl(movie.image)} 
                                alt={movie.title}
                                className='header-search-result-img'
                                onError={(e) => {
                                    e.target.src = "/images/NoMovie.avif";
                                }}
                            />
                            <span className='header-search-result-title'>{movie.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeaderSearchBar;
