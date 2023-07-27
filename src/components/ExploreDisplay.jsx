import React, { useEffect } from 'react'
import ExploreStore from '../context/ExploreStore'
import ImageCard from './ImageCard'
import Lily from "../assets/orange-lily.jpg"

const ExploreDisplay = () => {
    const explorePosts = ExploreStore( ( state ) => state.explorePosts )
    const postRef = ExploreStore( ( state ) => state.postRef )

    useEffect( () => {
        const targetPost = document.querySelector( `[data-post-id="${postRef}"]` )
        if ( targetPost ) {
            targetPost.scrollIntoView( { behavior: 'smooth', block: 'start' } )
        }
    }, [ postRef ] )

    return (
        <div>
            { explorePosts.map( ( post ) => ( <div key={ post.id }>
                <ImageCard post={ post } data-post-id={ post.id } />
            </div> ) ) }
        </div>
    )
}

export default ExploreDisplay