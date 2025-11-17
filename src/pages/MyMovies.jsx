import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import AddMyMovie from "../components/AddMyMovie";
import EditMyMovie from "../components/EditMyMovie";
import DVDMovie from "../components/DVDMovie";
import { useMovies } from "../context/MoviesContext";

const LOCAL_STORAGE_KEY = 'watchedMovies';

const MyMovies = () => {
    const { movies: moviesData } = useMovies();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [myMoviesData, setMyMoviesData] = useState([]);

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
        setMyMoviesData(savedMovies);
    }, []);

    const persistMovies = (updater) => {
        setMyMoviesData((prev) => {
            const updated = typeof updater === "function" ? updater(prev) : updater;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const handleAddMovie = (newMovie) => {
        persistMovies((prev) => {
            if (prev.find(movie => movie.title === newMovie.title)) {
                return prev;
            }
            return [...prev, newMovie];
        });
        setIsAddModalOpen(false);
    };

    const handleRemoveMovie = (titleToRemove) => {
        persistMovies((prev) => prev.filter(movie => movie.title !== titleToRemove));
    };

    const handleUpdateMovie = (updatedMovie) => {
        persistMovies((prev) => 
            prev.map(movie => 
                movie.title === updatedMovie.title ? { ...movie, ...updatedMovie } : movie
            )
        );
        setIsEditModalOpen(false);
    };

    return (
        <div className='page-section'>
            <h2>My Movies</h2>
            <p>Your personal collection of watched movies.</p>
            <button className="add-movie-button" onClick={() => setIsAddModalOpen(true)}>Add Movie</button>
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add My Movie"
            >
                <AddMyMovie onSave={handleAddMovie} />
            </Modal>
            <div className="my-movies-container">
                {myMoviesData.map((myMovie) => {
                    // Find the corresponding movie data from API for the image
                    const movieData = moviesData.find(m => m.title === myMovie.title);
                    const prioritizedImage = movieData?.image || myMovie.image;
                    const posterUrl = prioritizedImage
                        ? (prioritizedImage.startsWith('http') || prioritizedImage.startsWith('/') 
                            ? prioritizedImage 
                            : `/${prioritizedImage}`)
                        : "/images/NoMovie.avif";
                    
                    return (
                        <DVDMovie
                            key={myMovie.title}
                            title={myMovie.title}
                            posterUrl={posterUrl}
                            onClick={() => { 
                                setSelectedMovie({
                                    ...myMovie,
                                    image: prioritizedImage || "images/NoMovie.avif"
                                }); 
                                setIsEditModalOpen(true); 
                            }}
                            onRemove={handleRemoveMovie}
                        />
                    );
                })}
                {/* Example hardcoded movies */}
               {/* <DVDMovie title="50 First Dates" posterUrl="/images/50FirstDates.jpg" onClick={() => { setSelectedMovie ({title: "50 First Dates", posterUrl: "/images/50FirstDates.jpg", rating: "4", notes: "One of the best Adam Sandlar movies!", dateWatched: "2025-08-15", status: "completed"}); setIsEditModalOpen(true)}} />
                <DVDMovie title="Happy Gilmore" posterUrl="/images/HappyGilmore.jpg" onClick={() => { setSelectedMovie("Happy Gilmore"); setIsEditModalOpen(true); }} />
                <DVDMovie title="Happy Gilmore 2" posterUrl="/images/HappyGilmore2.webp" onClick={() => { setSelectedMovie("Happy Gilmore 2"); setIsEditModalOpen(true); }} />
                <DVDMovie title="Mr. Deeds" posterUrl="/images/MrDeeds.jpg" onClick={() => { setSelectedMovie("Mr. Deeds"); setIsEditModalOpen(true); }} />
                <DVDMovie title="The Hot Chick" onClick={() => { setSelectedMovie("The Hot Chick"); setIsEditModalOpen(true); }} />*/}
    
            </div>
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit My Movie"
            >
                {selectedMovie && <EditMyMovie movie={selectedMovie} onSave={handleUpdateMovie} />}
            </Modal>
        </div>
    );
};

export default MyMovies;
