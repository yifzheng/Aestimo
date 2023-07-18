import React from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'

function Search () {
    return (
        <div className='searchContainer background-fit'>
            <div className="searchWrapper">
                <Navbar />
                <Menu />
            </div>
        </div>
    )
}

export default Search