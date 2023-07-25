import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Back from "../assets/left-arrow.png"
import ImageCard from '../components/ImageCard'
import { useLocation, useNavigate } from 'react-router-dom'
import ProfileStore from '../context/ProfileStore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const ViewPost = () => {
    const [ user, setUser ] = useState( {} )
    const navigate = useNavigate();
    const location = useLocation()
    const post = location.state
    const setProfileID = ProfileStore( ( state ) => state.setProfileID )

    useEffect( () => {
        const unsub = async () => {
            const res = await getDoc( doc( db, "users", post.ownerID ) )
            setUser( res.data() )
        }
        // clean up
        return () => {
            unsub();
        }
    }, [ post.ownerID ] )

    const handleBack = () => {
        setProfileID( post.ownerID )
        navigate( -1 )
    }

    return (
        <div className='page background-fit'>
            <div className="container app-border">
                <div className='nav'>
                    <img src={ Back } alt="" onClick={ handleBack } />
                    <div className="title">
                        <span className='user-name'>{ user && user.userName }</span>
                        <span className='post'>Posts</span>
                    </div>
                </div>
                <div className="displayContainer">
                    <div className="displayWrapper">
                        <ImageCard post={ post } user={ user } />
                    </div>
                </div>
                <Menu />
            </div>
        </div>
    )
}

export default ViewPost