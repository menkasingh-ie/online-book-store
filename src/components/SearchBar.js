import React, { useState } from 'react';
import '../assets/css/search.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <>
            <div className="d-flex w-50">
                <input type="text" className="form-control me-2" 
                    value={query} onChange={handleChange} placeholder="Search books..." aria-label="Search" />
                <button onClick={handleSearch} className="btn search-btn">Search</button>
            </div>
        </>
    );
};

export default SearchBar;


