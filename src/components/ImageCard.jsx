import React from 'react'
import Lily from "../assets/orange-lily.jpg"
import Man from "../assets/man.png"
import Heart from "../assets/heart.png"
import RedHeart from "../assets/red-heart.png"
import Save from "../assets/save.png"

function ImageCard () {
    return (
        <div className='cardContainer'>
            <div className="userWrapper">
                <img src={ Man } alt='' />
                <div className='info'>
                    <span>John Doe</span>
                    <span>Your Imagination</span>
                </div>
            </div>
            <div className="cardWrapper">
                <img src={ Lily } alt='' />
            </div>
            <div className="reactions">
                <img src={ Heart } alt="" />
                <img src={ Save } alt="" />
            </div>
            <div className="likes"><span>231 Likes</span></div>
            <div className="comment">
                <span>Luckly to capture this beautiful lily. Luckly to capture this beautiful lily. Luckly to capture this beautiful lily</span>
            </div>
        </div>
    )
}

export default ImageCard