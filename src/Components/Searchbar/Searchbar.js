import './Searchbar.css';

import React from 'react'

const Searchbar = () => {
    return (
        <div className='Searchbar'>
            <label>Search User :</label>
            <input type= 'text' name='search-bar' placeholder='Search user by typing here'>
            </input>
            <button type='button'>Search</button>
        </div>
    )
};

export default Searchbar;
