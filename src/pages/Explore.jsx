import React from 'react'
import Back from "../assets/left-arrow.png"
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import Display from '../components/Display';

const Explore = () => {
    const navigate = useNavigate();
    return (
        <div className='page background-fit'>
            <div className="container app-border">
                <div className='nav'>
                    <img src={ Back } alt="" onClick={ () => navigate( -1 ) } />
                    <div className="title">
                        <span className='post'>Explore</span>
                    </div>
                </div>
                <Display componentName={ "ImageCard" } />
                <Menu />
            </div>
        </div>
    )
}

export default Explore