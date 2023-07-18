import React from 'react'
import Navbar from '../components/Navbar'
import Display from '../components/Display'
import Menu from '../components/Menu'
import ImageCard from '../components/ImageCard'

function Home () {
    return (
        <div className='homepage background-fit'>
            <div className="homeContainer">
                <Navbar />
                <Display componentName="SearchDisplay" />
                <Menu />
            </div>
        </div>
    )
}

export default Home