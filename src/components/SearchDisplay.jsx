import React from 'react'
import ResultCard from './ResultCard'
import Man from "../assets/man.png"
import Search from '../assets/search.png'
import Lily from "../assets/orange-lily.jpg"

function SearchDisplay () {
    const results = false;
    return (
        <div className='searchContainer'>
            <div className="searchBar">
                <input type="text" placeholder='Search' />
            </div>
            { results && <div className="searchResults">
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
            </div> }
            <div className="explore">
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
                <img src={ Lily } alt="" />
            </div>
        </div>
    )
}

export default SearchDisplay