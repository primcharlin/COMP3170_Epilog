import React, { useState } from "react";
import Modal from "../components/Modal";
import AddMyMovie from "../components/AddMyMovie";
import EditMyMovie from "../components/EditMyMovie";
import DVDMovie from "../components/DVDMovie";
import { createRoutesFromChildren, createRoutesFromElements } from "react-router-dom";

const MyMovies = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
                <AddMyMovie />
            </Modal>
            <div className="my-movies-container">
                <DVDMovie title="50 First Dates" posterUrl="/images/50FirstDates.jpg" onClick={() => { setSelectedMovie ({title: "50 First Dates", posterUrl: "/images/50FirstDates.jpg", rating: "4", notes: "One of the best Adam Sandlar movies!", dateWatched: "2025-08-15", status: "completed"}); setIsEditModalOpen(true)}} />
                <DVDMovie title="Happy Gilmore" posterUrl="/images/HappyGilmore.jpg" onClick={() => { setSelectedMovie("Happy Gilmore"); setIsEditModalOpen(true); }} />
                <DVDMovie title="Happy Gilmore 2" posterUrl="/images/HappyGilmore2.webp" onClick={() => { setSelectedMovie("Happy Gilmore 2"); setIsEditModalOpen(true); }} />
                <DVDMovie title="Mr. Deeds" posterUrl="/images/MrDeeds.jpg" onClick={() => { setSelectedMovie("Mr. Deeds"); setIsEditModalOpen(true); }} />
                <DVDMovie title="The Hot Chick" onClick={() => { setSelectedMovie("The Hot Chick"); setIsEditModalOpen(true); }} />
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit My Movie"
            >
                {selectedMovie && <EditMyMovie movie={selectedMovie} />}
            </Modal>
        </div>
    );
};

export default MyMovies;
