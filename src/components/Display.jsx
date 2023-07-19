import React from 'react'
import ImageCard from './ImageCard'
import SearchDisplay from './SearchDisplay'
import ProfileDisplay from './ProfileDisplay'

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
            { componentName === "Profile" && <div className='profileWrapper'>
                <ProfileDisplay />
            </div> }
        </div>
    )
}

export default Display