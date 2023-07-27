/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react'
import ImageCard from './ImageCard'
import SearchDisplay from './SearchDisplay'
import ProfileDisplay from './ProfileDisplay'
import HomepageStore from '../context/HomepageStore'
import { AuthContext } from '../context/AuthContext'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../firebase'
import ViewProfile from '../pages/ViewProfile'
import ExploreDisplay from './ExploreDisplay'

function Display ( { componentName } ) {
    const [ homeFeed, setHomeFeed ] = useState( [] )
    /* const homeFeed = HomepageStore( ( state ) => state.homeFeed )
    const setHomeFeed = HomepageStore( ( state ) => state.setHomeFeed ) */
    const userFollowing = HomepageStore( ( state ) => state.userFollowing )
    const setUserFollowing = HomepageStore( ( state ) => state.setUserFollowing )
    const { state: { currentUser } } = useContext( AuthContext )
    const userID = currentUser.id; // the id of the user
    /* 
        The display on the homepage will include the posts of the user and all of the users the user is following
    */

    useEffect( () => {
        /* Fetch all the users that the current user is following */
        const fetchFollowing = async () => {
            const res = await getDoc( doc( db, "following", userID ) )
            setUserFollowing( res.data().following )
        }
        /* Fetch all the posts of the currentUser and following users: Sorted by most recent posts */
        const fetchAllPosts = async () => {
            try {
                const usersArray = [ ...userFollowing, currentUser ] // array of users
                // create promises that retreive all the posts of the current users and return it
                const promises = usersArray.map( async user => {
                    const userID = user.id;
                    const q = query( collection( db, "posts" ), where( "ownerID", "==", userID ) )
                    const userSnapshots = await getDocs( q );

                    const userPosts = userSnapshots.docs.map( ( doc ) => ( {
                        id: doc.id,
                        user: user,
                        ...doc.data(),
                    } ) )
                    return userPosts;
                } )
                const snapshots = await Promise.all( promises ) // call and resolve all the promises
                let newArray = snapshots.flat()
                // sort based on most recent date
                newArray.sort( ( a, b ) => b.createdAt - a.createdAt )

                // set the homefeed
                setHomeFeed( newArray )
            } catch ( error ) {
                console.error( error )
            }
        }

        // clean up useEffect
        return () => {
            fetchFollowing();
            fetchAllPosts()
        }
    }, [ userFollowing ] )

    return (
        <div className="displayContainer">
            { componentName === "ImageCard" && <div className="displayWrapper">
                { homeFeed.length > 0 && homeFeed.map( ( post ) => ( <ImageCard key={ post.id } post={ post } /> ) ) }
            </div> }
            { componentName === "SearchDisplay" && <div className='searchWrapper'>
                <SearchDisplay />
            </div> }
            { componentName === "Profile" && <div className='profileWrapper'>
                <ProfileDisplay />
            </div> }
            { componentName === "UserProfile" && <div className='profileWrapper'>
                <ViewProfile />
            </div> }
            { componentName === "Explore" && <div className='displayWrapper'>
                {/*  explorePosts.map( ( post ) => ( <ImageCard key={ post.id } post={ post } id={ post.id } /> ) ) */ }
                <ExploreDisplay />
            </div> }
        </div >
    )
}

export default Display