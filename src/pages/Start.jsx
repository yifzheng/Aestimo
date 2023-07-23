import React from 'react'
import AppHome from "../assets/app-home.png"
import { useNavigate } from 'react-router-dom'

const Start = () => {
    const navigate = useNavigate();
    return (
        <div className='start background-fit'>
            <div className="startWrapper">
                <img src={ AppHome } alt="" />
                <div className="startInfo">
                    <span className='title'>Aestimogram</span>
                    <span className='message'>Unveil your Best Moments! 📷</span>
                    <span className='message'>Rate, Post, and Discover captivating images of people in our community</span>
                    <div className="options">
                        <button onClick={ () => navigate( "/login" ) }>Log in</button>
                        <button onClick={ () => navigate( "/register" ) }>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start