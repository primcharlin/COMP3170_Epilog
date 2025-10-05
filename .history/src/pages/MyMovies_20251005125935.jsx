import React, { useState } from "react";
import Modal from "../components/Modal";
import AddMyMovie from "../components/AddMyMovie";
import EditMyMovie from "../components/EditMyMovie";
import DVDMovie from "../components/DVDMovie";
import { createRoutesFromChildren, createRoutesFromElements } from "react-router-dom";

const MyMovies = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(current);

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
                <DVDMovie title="50 First Dates" onClick={() => { setSelectedTitle("50 First Dates"); setIsEditModalOpen(true); }} />
                <DVDMovie title="Happy Gilmore" onClick={() => { setSelectedTitle("Happy Gilmore"); setIsEditModalOpen(true); }} />
                <DVDMovie title="Happy Gilmore 2" onClick={() => { setSelectedTitle("Happy Gilmore 2"); setIsEditModalOpen(true); }} />
                <DVDMovie title="Mr. Deeds" onClick={() => { setSelectedTitle("Mr. Deeds"); setIsEditModalOpen(true); }} />
                <DVDMovie title="The Hot Chick" onClick={() => { setSelectedTitle("The Hot Chick"); setIsEditModalOpen(true); }} />
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit My Movie"
            >
                <EditMyMovie movie={{ title: selectedTitle }} />
            </Modal>
        </div>
    );
};

export default MyMovies;
