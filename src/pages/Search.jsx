import React from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Display from '../components/Display'

function Search () {
    return (
        <div className='page background-fit'>
            <div className="container app-border">
                <Navbar componentName={ "Navbar" } />
                <Display componentName="SearchDisplay" />
                <Menu />
            </div>
        </div>
    )
}

export default Search