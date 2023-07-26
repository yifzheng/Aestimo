import React, { useContext, useEffect, useState } from 'react'
import Blank from "../assets/blank.png"
import Feed from "../assets/feed.png"
import Saved from "../assets/save.png"
import Lily from "../assets/orange-lily.jpg"
import Follow from "../assets/follow.png"
import Following from "../assets/following.png"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import ProfileStore from "../context/ProfileStore"

const ProfileDisplay = () => {
    // const [ posts, setPosts ] = useState( [] )
    // const [ profileData, setProfileData ] = useState( [] )
    const [ isPostFeed, setIsPostFeed ] = useState( true )
    const navigate = useNavigate();
    // <--------- RETRIEVE DATA FROM PROFILE STORE ---------------->
    const profileID = ProfileStore( ( state ) => state.profileID );
    const setProfileData = ProfileStore( ( state ) => state.setProfileData )
    const profileData = ProfileStore( ( state ) => state.profileData )
    const posts = ProfileStore( ( state ) => state.posts )
    const setPosts = ProfileStore( ( state ) => state.setPosts )
    const followers = ProfileStore( ( state ) => state.followers )
    const setFollowers = ProfileStore( ( state ) => state.setFollowers )
    const following = ProfileStore( ( state ) => state.following )
    const setFollowing = ProfileStore( ( state ) => state.setFollowing )
    // <------------------------------------------------------------->
    // get current user by context
    const { state: { currentUser } } = useContext( AuthContext )

    useEffect( () => {
        const fetchUser = async () => {
            const res = await getDoc( doc( db, "users", profileID ) )
            setProfileData( res.data() )
        }
        const fetchPost = onSnapshot( query( collection( db, "posts" ), where( 'ownerID', "==", profileID ) ),
            ( querySnapShot ) => {
                const documents = querySnapShot.docs.map( ( doc ) => ( {
                    id: doc.id,
                    ...doc.data()
                } ) )
                setPosts( documents )
            }
        )
        const fetchFollowers = onSnapshot( doc( db, "followers", profileID ), ( docSnapshot ) => {
            if ( docSnapshot.exists() ) {
                setFollowers( docSnapshot.data().followers )
            }
        } )

        const fetchFollowing = onSnapshot( doc( db, "following", profileID ), ( docSnapshot ) => {
            if ( docSnapshot.exists() ) {
                setFollowing( docSnapshot.data().following )
            }
        } )

        // clean up
        return () => {
            fetchUser()
            fetchPost()
            fetchFollowers()
            fetchFollowing()
        }
    }, [ profileID ] )

    return (
        <div className='profileContainer'>
            <div className="profile">
                <div className="profileInfo">
                    <div className="imgContainer">
                        <img src={ profileData.photoURL ? profileData.photoURL : Blank } alt="" />
                    </div>

                    <div className="profileData">
                        <div className="data">
                            <span>{ posts.length }</span>
                            <span>Posts</span>
                        </div>
                        <div className="data">
                            <span>{ followers.length }</span>
                            <span>Followers</span>
                        </div>
                        <div className="data">
                            <span>{ following.length }</span>
                            <span>Following</span>
                        </div>
                    </div>
                </div>
                <div className="profileBio">
                    <span>{ `${profileData.firstName} ${profileData.lastName}` }</span>
                    <span className='description'>{ profileData.caption }</span>
                </div>
                <br />
                <div className="line-break"></div>
                <br />
                <div className="feed">
                    <div className="icons">
                        <div className='feed'><img src={ Feed } alt="" onClick={ () => setIsPostFeed( true ) } /></div>
                        {/* <div className='saved'><img src={ Saved } alt="" onClick={ () => setIsPostFeed( false ) } /></div> */ }
                    </div>
                    { isPostFeed && <div className="userPosts">
                        { posts.length > 0 && posts.map( ( doc ) => ( <img key={ doc.id } src={ doc.photoURL } alt="" onClick={ () => navigate( "/view_post", { state: doc } ) } /> ) ) }
                    </div> }
                    {/*  !isPostFeed && <div className="userPosts">
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                        <img src={ Lily } alt="" onClick={ () => navigate( "/view_post" ) } />
                    </div>  */}
                </div>
            </div>
        </div >
    )
}

export default ProfileDisplay