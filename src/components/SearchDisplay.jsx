import React, { useState } from 'react'
import ResultCard from './ResultCard'
import Man from "../assets/man.png"
import Search from '../assets/search.png'
import Lily from "../assets/orange-lily.jpg"
import { useNavigate } from 'react-router-dom'

function SearchDisplay () {
    const [ results, setResults ] = useState( false )
    const navigate = useNavigate();
    return (
        <div className='searchContainer'>
            <div className="searchBar">
                <input type="text" placeholder='Search' onFocus={ () => setResults( true ) } />
                <span onClick={ () => setResults( false ) }>Cancel</span>
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
            { !results && <div className="explore">
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
                <img src={ Lily } alt="" onClick={()=> navigate("/explore")}/>
            </div> }
        </div>
    )
}

export default SearchDisplay