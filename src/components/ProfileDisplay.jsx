import React, { useContext, useEffect, useState } from 'react'
import Blank from "../assets/blank.png"
import Feed from "../assets/feed.png"
import Saved from "../assets/save.png"
import Lily from "../assets/orange-lily.jpg"
import Follow from "../assets/follow.png"
import Following from "../assets/following.png"
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'


const ProfileDisplay = () => {
    const [ profileUser, setProfileUser ] = useState( {} )
    const [ posts, setPosts ] = useState( {} )
    const [ following, setFollowing ] = useState( false );
    const navigate = useNavigate();
    // get id from parameters if exist
    const { id } = useParams();

    // get current user by context
    const { currentUser } = useContext( AuthContext )

    let saved = false;

    useEffect( () => {
        const fetchUser = async () => {
            const res = await getDoc( doc( db, "users", id ) )
            console.log( res.data() )
            setProfileUser( res.data() )
        }
        const fetchPost = async () => {
            const res = await getDoc( doc( db, "posts", id ) );
            setPosts( res.data() )
        }
        // clean up
        return () => {
            fetchUser()
        }
    }, [ id ] )

    return (
        <div className='profileContainer'>
            <div className="profile">
                <div className="profileInfo">
                    <img src={ profileUser.photoUrl ? profileUser.photoUrl : Blank } alt="" />
                    <div className="profileData">
                        <div className="data">
                            <span>{ Object.entries( posts ).length }</span>
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
                    <span>{ `${profileUser.firstName} ${profileUser.lastName}` }</span>
                    <span className='description'>{ profileUser.caption }</span>
                </div>
                { id !== currentUser.id && <br /> }
                { id !== currentUser.id && <label><img src={ following ? Following : Follow } alt="" onClick={ () => setFollowing( !following ) } /></label> }
                <br />
                <div className="line-break"></div>
                <br />
                <div className="feed">
                    <div className="icons">
                        <div className='feed'><img src={ Feed } alt="" /></div>
                        <div className='saved'><img src={ Saved } alt="" /></div>
                    </div>
                    { !saved && <div className="userPosts">
                        { Object.entries( posts ).map( ( id ) => ( <img key={ id } src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } /> ) ) }

                        {/* <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } /> */}
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