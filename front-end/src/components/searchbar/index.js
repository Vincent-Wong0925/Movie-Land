import React, { useState } from "react";
import './searchbar.css';

const Searchbar = () => {
    const [search, setSearch] = useState();

    return (
        <div className="Searchbar">
            <input className="search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for a movie" />
            <button className="search-btn">
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </button>
        </div>
    )
}

export default Searchbar;