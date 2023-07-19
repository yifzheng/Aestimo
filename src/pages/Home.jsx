import React from 'react'
import Navbar from '../components/Navbar'
import Display from '../components/Display'
import Menu from '../components/Menu'
import ImageCard from '../components/ImageCard'

function Home () {
    return (
        <div className='page background-fit'>
            <div className="container app-border">
                <Navbar componentName={ "Navbar" } />
                <Display componentName="ImageCard" />
                <Menu />
            </div>
        </div>
    )
}

export default Home