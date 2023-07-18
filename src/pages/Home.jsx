import React from 'react'
import Navbar from '../components/Navbar'
import Display from '../components/Display'
import Menu from '../components/Menu'

function Home () {
    return (
        <div className='homepage'>
            <div className="homeContainer">
                <Navbar />
                <Display />
                <Menu />
            </div>
        </div>
    )
}

export default Home