import React, { useContext, useEffect, useState } from 'react'
import Blank from "../assets/blank.png"
import Feed from "../assets/feed.png"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import ProfileStore from "../context/ProfileStore"
import PostStore from '../context/PostStore'

/* Dispaly profile data for users other than the current user */
const ViewProfile = () => {
    // const [ posts, setPosts ] = useState( [] )
    // const [ profileData, setProfileData ] = useState( [] )
    const [ isPostFeed, setIsPostFeed ] = useState( true )
    const navigate = useNavigate();
    // <--------- RETRIEVE DATA FROM PROFILE STORE ---------------->
    // const profileID = ProfileStore( ( state ) => state.profileID );
    //const setProfileData = ProfileStore( ( state ) => state.setProfileData )
    const externalProfileData = ProfileStore( ( state ) => state.externalProfileData )
    const posts = ProfileStore( ( state ) => state.posts )
    const setPosts = ProfileStore( ( state ) => state.setPosts )
    const followers = ProfileStore( ( state ) => state.followers )
    const setFollowers = ProfileStore( ( state ) => state.setFollowers )
    const following = ProfileStore( ( state ) => state.following )
    const setFollowing = ProfileStore( ( state ) => state.setFollowing )
    // <------------------------------------------------------------->
    // <--------- RETRIEVE DATA FROM Post STORE ---------------->
    const setPost = PostStore( ( state ) => state.setPost )
    const setPostOwner = PostStore( ( state ) => state.setPostOwner )
    // <------------------------------------------------------------->
    // get current user by context
    const { state: { currentUser } } = useContext( AuthContext )

    useEffect( () => {
        const fetchPost = onSnapshot( query( collection( db, "posts" ), where( 'ownerID', "==", externalProfileData.id ) ),
            ( querySnapShot ) => {
                const documents = querySnapShot.docs.map( ( doc ) => ( {
                    id: doc.id,
                    ...doc.data()
                } ) )
                setPosts( documents )
            }
        )
        const fetchFollowers = onSnapshot( doc( db, "followers", externalProfileData.id ), ( docSnapshot ) => {
            if ( docSnapshot.exists() ) {
                setFollowers( docSnapshot.data().followers )
            }
        } )

        const fetchFollowing = onSnapshot( doc( db, "following", externalProfileData.id ), ( docSnapshot ) => {
            if ( docSnapshot.exists() ) {
                setFollowing( docSnapshot.data().following )
            }
        } )

        // clean up
        return () => {
            // fetchUser()
            fetchPost()
            fetchFollowers()
            fetchFollowing()
        }
    }, [ externalProfileData ] )

    // function to handle the follow status of user
    const handleFollow = async () => {
        const currentUserID = currentUser.id;
        if ( followers.includes( currentUser.id ) ) {
            // if the current profile contains the current user's id, remove it to unfollow
            await updateDoc( doc( db, "followers", externalProfileData.id ), {
                followers: arrayRemove( currentUser )
            } )
            // remove the current profile Id from current users list of people following
            await updateDoc( doc( db, "following", currentUserID ), {
                following: arrayRemove( externalProfileData )
            } )
        }
        else {
            // not following so add user Id to the current profiles list of followers
            await updateDoc( doc( db, "followers", externalProfileData.id ), {
                followers: arrayUnion( currentUser )
            } )
            // add the current profile Id from current users list of people following
            await updateDoc( doc( db, "following", currentUserID ), {
                following: arrayUnion( externalProfileData )
            } )
        }
    }

    const handleViewPost = ( doc ) => {
        setPost( doc )
        setPostOwner( externalProfileData )
        navigate( '/view_post' )
        navigate( `/view_profile/${externalProfileData.userName}` )
        navigate( "/view_post" )
    }

    return (
        <div className='profileContainer'>
            <div className="profile">
                <div className="profileInfo">
                    <div className="imgContainer">
                        <img src={ externalProfileData.photoURL ? externalProfileData.photoURL : Blank } alt="" />
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
                    <span>{ `${externalProfileData.firstName} ${externalProfileData.lastName}` }</span>
                    <span className='description'>{ externalProfileData.caption }</span>
                </div>
                <br />
                { /* profileID !== currentUser.id && <label><img src={ isFollowing ? Following : Follow } alt="" onClick={ () => setIsFollowing( !isFollowing ) } /></label> */ }
                <button onClick={ handleFollow }>{ followers.some( ( user ) => user.id === currentUser.id ) ? 'Following' : 'Follow' }</button>
                <br />
                <br />
                <div className="line-break"></div>
                <br />
                <div className="feed">
                    <div className="icons">
                        <div className='feed'><img src={ Feed } alt="" onClick={ () => setIsPostFeed( true ) } /></div>
                        {/* <div className='saved'><img src={ Saved } alt="" onClick={ () => setIsPostFeed( false ) } /></div> */ }
                    </div>
                    { isPostFeed && <div className="userPosts">
                        { posts.length > 0 && posts.map( ( doc ) => ( <img key={ doc.id } src={ doc.photoURL } alt="" onClick={ () => handleViewPost( doc ) } /> ) ) }
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

export default ViewProfile