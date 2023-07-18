import React from 'react'
import ImageCard from './ImageCard'
import SearchDisplay from './SearchDisplay'

function Display ( { componentName } ) {

    return (
        <div className="displayContainer">
            { componentName === "ImageCard" && <div className="displayWrapper">
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
            </div> }
            { componentName === "SearchDisplay" && <div className='searchWrapper'>
                <SearchDisplay />
            </div> }
        </div>
    )
}

export default Display