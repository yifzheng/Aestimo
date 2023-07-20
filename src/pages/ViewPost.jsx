import React from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Back from "../assets/left-arrow.png"
import ImageCard from '../components/ImageCard'
import { useNavigate } from 'react-router-dom'

const ViewPost = () => {
    const navigate = useNavigate();
    return (
        <div className='page background-fit'>
            <div className="container app-border">
                <div className='nav'>
                    <img src={ Back } alt="" onClick={ () => navigate( -1 ) } />
                    <div className="title">
                        <span className='user-name'>JohnTheDoe</span>
                        <span className='post'>Posts</span>
                    </div>
                </div>
                <div className="displayContainer">
                    <div className="displayWrapper">
                        <ImageCard />
                    </div>
                </div>
                <Menu />
            </div>
        </div>
    )
}

export default ViewPost