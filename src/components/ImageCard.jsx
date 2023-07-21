/* eslint-disable react/prop-types */
import React from 'react'
import Lily from "../assets/orange-lily.jpg"
import Man from "../assets/man.png"
import Heart from "../assets/heart.png"
import RedHeart from "../assets/red-heart.png"
import Save from "../assets/save.png"

function ImageCard ( { post, user } ) {
    console.log( post )
    return (
        <div className='cardContainer'>
            <div className="userWrapper">
                <img src={ Man } alt='' />
                <div className='info'>
                    <span>{user.userName}</span>
                    {/* <span className='location'>Your Imagination</span> */}
                </div>
            </div>
            <div className="cardWrapper">
                <img src={ post.photoURL } alt='' />
            </div>
            <div className="reactions">
                <img src={ Heart } alt="" />
                <img src={ Save } alt="" />
            </div>
            <div className="likes"><span>{ post.likes.length } Likes</span></div>
            <div className="comment">
                <span>{ post.caption }</span>
            </div>
        </div>
    )
}

export default ImageCard