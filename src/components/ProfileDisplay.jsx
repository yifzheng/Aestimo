import React from 'react'
import Man from "../assets/man.png"
import Feed from "../assets/feed.png"
import Saved from "../assets/save.png"
import Lily from "../assets/orange-lily.jpg"
import { useNavigate } from 'react-router-dom'


const ProfileDisplay = () => {
    const navigate = useNavigate();
    const saved = false;
    return (
        <div className='profileContainer'>
            <div className="profile">
                <div className="profileInfo">
                    <img src={ Man } alt="" />
                    <div className="profileData">
                        <div className="data">
                            <span>12</span>
                            <span>Posts</span>
                        </div>
                        <div className="data">
                            <span>12</span>
                            <span>Followers</span>
                        </div>
                        <div className="data">
                            <span>12</span>
                            <span>Following</span>
                        </div>
                    </div>
                </div>
                <div className="profileBio">
                    <span>John Doe</span>
                    <span className='description'>I am unicorn rider from the world of Neo Narnia. I have lived for 1,500 years on this planet.</span>
                </div>
                <br />
                <div className="line-break"></div>
                <br />
                <div className="feed">
                    <div className="icons">
                        <div className='feed' ><img src={ Feed } alt="" /></div>
                        <div className='saved'><img src={ Saved } alt="" /></div>
                    </div>
                    { !saved && <div className="userPosts">
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                    </div> }
                    { saved && <div className="userPosts">
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                    </div> }
                </div>
            </div>
        </div >
    )
}

export default ProfileDisplay