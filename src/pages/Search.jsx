import React from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Display from '../components/Display'

function Search () {
    return (
        <div className='homepage background-fit'>
            <div className="homeContainer app-border">
                <Navbar />
                <Display componentName="SearchDisplay" />
                <Menu />
            </div>
        </div>
    )
}

export default Search