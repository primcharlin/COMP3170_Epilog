import React, { useState } from "react";
import Modal from "../components/Modal";
import AddMyMovie from "../components/AddMyMovie";

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
        </div>
    );
};

export default MyMovies;
