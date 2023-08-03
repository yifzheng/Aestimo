import React, { useEffect } from 'react'
import ExploreStore from '../context/ExploreStore'
import ImageCard from './ImageCard'
import Lily from "../assets/orange-lily.jpg"
import PostStore from '../context/PostStore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ExploreDisplay = () => {
    const post = PostStore( ( state ) => state.post )
    const postOwner = PostStore( ( state ) => state.postOwner )
    const setPostOwner = PostStore( ( state ) => state.setPostOwner )

    useEffect( () => {
        const unsub = async () => {
            const res = await getDoc( doc( db, "users", post.ownerID ) )
            setPostOwner( res.data() )
        }
        return () => {
            unsub()
        }
    }, [ post ] )

    return (
        <div>
            <ImageCard post={ post } postOwner={ postOwner } />
        </div>
    )
}

export default ExploreDisplay