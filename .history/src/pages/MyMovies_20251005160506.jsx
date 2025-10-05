import React, { useState } from "react";
import Modal from "../components/Modal";
import AddMyMovie from "../components/AddMyMovie";
import EditMyMovie from "../components/EditMyMovie";
import DVDMovie from "../components/DVDMovie";
import moviesData from "../data/epilog.json";

const MyMovies = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Array of movies with their individual data
    const [myMoviesData, setMyMoviesData] = useState([
        {
            title: "50 First Dates",
            rating: 4,
            notes: "One of the best Adam Sandler movies! Drew Barrymore is amazing in this romantic comedy.",
            dateWatched: "2024-12-15",
            status: "complete"
        },
        {
            title: "Happy Gilmore", 
            rating: 5,
            notes: "Classic Adam Sandler comedy. The golf scenes are hilarious!",
            dateWatched: "2024-11-20",
            status: "complete"
        },
        {
            title: "Mr. Deeds",
            rating: 3,
            notes: "Fun movie but not his best work. Still entertaining though.",
            dateWatched: "2024-10-05",
            status: "complete"
        },
        {
            title: "The Hot Chick",
            rating: 2,
            notes: "Started watching but didn't finish. Not really my type of humor.",
            dateWatched: "2024-09-12",
            status: "cancelled"
        },
        {
            title: "The Wedding Singer",
            rating: 4,
            notes: "Great soundtrack and chemistry between Adam and Drew. Love the 80s setting!",
            dateWatched: "2024-08-30",
            status: "complete"
        }
    ]);

    const handleAddMovie = (newMovie) => {
        setMyMoviesData(prev => [...prev, newMovie]);
        setIsAddModalOpen(false);
    };

    const handleRemoveMovie = (titleToRemove) => {
        setMyMoviesData(prev => prev.filter(movie => movie.title !== titleToRemove));
    };

    const handleUpdateMovie = (updatedMovie) => {
        setMyMoviesData(prev => 
            prev.map(movie => 
                movie.title === updatedMovie.title ? updatedMovie : movie
            )
        );
        setIsEditModalOpen(false);
    };

    return (
        <div className='page-section'>
            <h2>My Movies</h2>
            <p>Your personal collection of watched movies.</p>
            <button onClick={() => setIsAddModalOpen(true)}>Add</button>
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add My Movie"
            >
                <AddMyMovie onSave={handleAddMovie} />
            </Modal>
            <div className="my-movies-container">
                {myMoviesData.map((myMovie) => {
                    // Find the corresponding movie data from epilog.json for the image
                    const movieData = moviesData.find(m => m.title === myMovie.title);
                    const posterUrl = movieData?.image ? `/${movieData.image}` : "/images/NoMovie.avif";
                    
                    return (
                        <DVDMovie
                            key={myMovie.title}
                            title={myMovie.title}
                            posterUrl={posterUrl}
                            onClick={() => { 
                                setSelectedMovie({
                                    ...myMovie,
                                    image: movieData?.image || "images/NoMovie.avif"
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
