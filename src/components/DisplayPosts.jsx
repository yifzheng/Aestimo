/* import React, { useEffect } from 'react'
import ProfileStore from '../context/ProfileStore'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const DisplayPosts = ( { profileID } ) => {
    const navigate = useNavigate()
    const posts = ProfileStore( ( state ) => state.posts )
    const setPosts = ProfileStore( ( state ) => state.setPosts )

    useEffect( () => {
        const fetchPost = onSnapshot( query( collection( db, "posts" ), where( 'ownerID', "==", profileID ) ),
            ( querySnapShot ) => {
                const documents = querySnapShot.docs.map( ( doc ) => ( {
                    id: doc.id,
                    ...doc.data()
                } ) )
                console.log( "documents: ", documents )
                setPosts( documents )
            }
        )

        fetchPost()
    }, [ profileID ] )

    return (
        <>{ posts.length > 0 && posts.map( ( doc ) => ( <img key={ doc.id } src={ doc.photoURL } alt="" onClick={ () => navigate( "/view_post", { state: doc } ) } /> ) ) }</>
    )
}

export default DisplayPosts */