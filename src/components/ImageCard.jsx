/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import Lily from "../assets/orange-lily.jpg"
import Blank from "../assets/blank.png"
import Heart from "../assets/heart.png"
import RedHeart from "../assets/red-heart.png"
import Save from "../assets/save.png"
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import ProfileStore from '../context/ProfileStore'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import ExploreStore from '../context/ExploreStore'

function ImageCard ( { post } ) {
    const [ postData, setPostData ] = useState( null )
    const [ postUser, setPostUser ] = useState( {} )
    const imageRef = useRef();
    const navigate = useNavigate();
    const setProfileID = ProfileStore( ( state ) => state.setProfileID )
    const postRef = ExploreStore( ( state ) => state.postRef )
    const setPostRef = ExploreStore( ( state ) => state.setPostRef )
    const { state: { currentUser } } = useContext( AuthContext )

    const handleAccount = () => {
        setProfileID( postUser.id )
        if ( currentUser.id === postUser.id ) {

            navigate( "/profile" )
            setPostRef( null )
        }
        else {
            navigate( `/viewprofile/${postUser.userName}` )
            setPostRef( null )
        }
    }

    useEffect( () => {
        const fetchUser = async () => {
            const res = await getDoc( doc( db, "users", post.ownerID ) )
            setPostUser( res.data() )
        }
        const fetchDoc = onSnapshot( doc( db, "posts", post.id ), ( docSnapshot ) => {
            if ( docSnapshot.exists() ) {
                setPostData( { id: docSnapshot.id, ...docSnapshot.data() } )
            }
            else {
                setPostData( null )
            }
        } )
        const targetPost = document.getElementById( postRef )
        if ( targetPost ) {
            console.log( targetPost )
            targetPost.scrollIntoView( { behavior: 'smooth', block: 'start' } )
        }
        return () => {
            fetchUser()
            fetchDoc()
        }
    }, [ post, postRef ] )

    // when the post is unliked, user can click the empty heart to like and the heart will be red
    // if the post is liked by the user, red heart will become blank and the user will unlike the post
    const handleLike = async () => {
        const like = imageRef.current; // reference to the heart component
        const postID = post.id; // post id
        // check if the user likes post
        if ( postData.likes.includes( currentUser.id ) ) {
            // remove the currentUser ID from the array (unlike the post)
            like.src = Heart; // blank heart
            await updateDoc( doc( db, "posts", postID ), {
                likes: arrayRemove( currentUser.id )
            } )

        }
        else {
            // like the post
            like.src = RedHeart; // red heart
            await updateDoc( doc( db, "posts", postID ), {
                likes: arrayUnion( currentUser.id )
            } )
        }
    }

    return (
        <div className='cardContainer'>
            <div className="userWrapper">
                <img src={ postUser.photoURL ? postUser.photoURL : Blank } alt='' />
                <div className='info'>
                    <span onClick={ handleAccount }>{ postUser.userName }</span>
                    {/* <span className='location'>Your Imagination</span> */ }
                </div>
            </div>
            <div className="cardWrapper">
                <img src={ postData && postData.photoURL } alt='' />
            </div>
            <div className="reactions">
                <img src={ postData && postData.likes.includes( currentUser.id ) ? RedHeart : Heart } alt="" onClick={ handleLike } ref={ imageRef } />
                {/* <img src={ Save } alt="" /> */ }
            </div>
            <div className="likes"><span>{ postData && postData.likes.length } Likes</span></div>
            <div className="comment">
                <span>{ postData && postData.caption }</span>
            </div>
        </div>
    )
}

export default ImageCard