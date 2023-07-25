import React from 'react'
import Blank from "../assets/blank.png"
import { useNavigate } from 'react-router-dom'
import ProfileStore from '../context/ProfileStore'

function ResultCard ( { user } ) {
    const navigate = useNavigate()
    const setProfileID = ProfileStore( ( state ) => state.setProfileID )

    const handleViewProfile = () => {
        setProfileID( user.id )
        navigate( "/profile" )
    }


    return (
        <div className='resultCard' onClick={ handleViewProfile }>
            <img src={ user.photoURL ? user.photoURL : Blank } alt='' />
            <span>{ user.userName }</span>
        </div>
    )
}

export default ResultCard