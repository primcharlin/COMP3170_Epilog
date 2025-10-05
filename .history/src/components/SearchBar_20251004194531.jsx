import React, { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
        // Add your search logic here
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='search-bar-container'>
            <form
                onSubmit={handleSearch}
                className='search-form'>
                <div className='search-input-wrapper'>
                    <input
                        type='text'
                        placeholder='Search for movies...'
                        value={searchTerm}
                        onChange={handleInputChange}
                        className='search-input'
                    />
                    <button
                        type='submit'
                        className='search-button'>
                        <svg
                            width='20'
                            height='20'
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
        </div>
    );
};

export default SearchBar;
