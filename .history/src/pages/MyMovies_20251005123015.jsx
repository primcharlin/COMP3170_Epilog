import React, { useState } from "react";
import Modal from "../components/Modal";
import AddMyMovie from "../components/AddMyMovie";
import EditMyMovie from "../components/EditMyMovie";
import DVDMovie from "../components/DVDMovie";

const MyMovies = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
                <DVDMovie title="50 First Dates" />
                <DVDMovie title="Happy Gilmore" />
                <DVDMovie title="Happy Gilmore 2" />
                <DVDMovie title="Mr. Deeds" />
                <DVDMovie title="The Hot Chick" />
            </div>
        </div>
    );
};

export default MyMovies;
