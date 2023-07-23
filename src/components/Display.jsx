/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import ImageCard from './ImageCard'
import SearchDisplay from './SearchDisplay'
import ProfileDisplay from './ProfileDisplay'
import HomepageStore from '../context/HomepageStore'
import { AuthContext } from '../context/AuthContext'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'

function Display ( { componentName } ) {
    const homeFeed = HomepageStore( ( state ) => state.homeFeed )
    const setHomeFeed = HomepageStore( ( state ) => state.setHomeFeed )
    const userFollowing = HomepageStore( ( state ) => state.userFollowing )
    const setUserFollowing = HomepageStore( ( state ) => state.setUserFollowing )
    const { currentUser } = useContext( AuthContext )
    const userID = currentUser.id; // the id of the user
    /* 
        The display on the homepage will include the posts of the user and all of the users the user is following
    */

    useEffect( () => {

        const fetchFollowing = async () => {
            const res = await getDoc( doc( db, "following", userID ) )
            setUserFollowing( res.data().following )
        }
        const fetchAllPosts = async () => {
            try {
                const usersArray = [ ...userFollowing, currentUser ]
                const promises = usersArray.map( async user => {
                    const userID = user.id;
                    console.log( "user.id: ", userID )
                    const q = query( collection( db, "posts" ), where( "ownerID", "==", userID ) )
                    const userSnapshots = await getDocs( q );

                    const userPosts = userSnapshots.docs.map( ( doc ) => ( {
                        id: doc.id,
                        user: user,
                        ...doc.data(),
                    } ) )
                    return userPosts;
                } )
                const snapshots = await Promise.all( promises )

                snapshots.sort( ( a, b ) => b.createdAt - a.createdAt )

                setHomeFeed( snapshots[0] )
            } catch ( error ) {
                console.error( error )
            }
        }
        return () => {
            fetchFollowing();
            fetchAllPosts()
        }
    }, [ userID ] )
    console.log( homeFeed )
    return (
        <div className="displayContainer">
            { componentName === "ImageCard" && <div className="displayWrapper">
                { homeFeed.length > 0 && homeFeed.map( ( post ) => ( <ImageCard key={ post.id } post={ post } user={ post.user } /> ) ) }
            </div> }
            { componentName === "SearchDisplay" && <div className='searchWrapper'>
                <SearchDisplay />
            </div> }
            { componentName === "Profile" && <div className='profileWrapper'>
                <ProfileDisplay />
            </div> }
        </div>
    )
}

export default Display