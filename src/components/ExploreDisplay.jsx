import React from 'react'
import ExploreStore from '../context/ExploreStore'
import ImageCard from './ImageCard'

const ExploreDisplay = () => {
    const explorePosts = ExploreStore( ( state ) => state.explorePosts )
    return (
        <div>{ explorePosts.map( ( post ) => { ( <ImageCard key={ post.id } post={ post } /> ) } ) }</div>
    )
}

export default ExploreDisplay