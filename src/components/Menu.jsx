import React, { useContext } from 'react'
import Search from "../assets/search.png"
import Create from "../assets/tab.png"
import Account from "../assets/account.png"
import Home from "../assets/home.png"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import ProfileStore from "../context/ProfileStore"

function Menu () {
    const navigate = useNavigate();
    const { state: { currentUser } } = useContext( AuthContext )
    const setProfileID = ProfileStore( ( state ) => state.setProfileID )
    // const setProfileData = ProfileStore( ( state ) => state.setProfileData )
    
    const handleAccount = () => {
        setProfileID( currentUser.id )
        // setProfileData( currentUser )
        navigate( "/profile" )
    }

    return (
        <div className='menu'>
            <input type="button" id="home" />
            <label htmlFor="home">
                <img src={ Home } alt="" onClick={ () => navigate( "/home" ) } />
            </label>
            <input type="button" id="search" />
            <label htmlFor="search">
                <img src={ Search } alt="" onClick={ () => navigate( "/search" ) } />
            </label>
            <input type="button" id="create" />
            <label htmlFor="create">
                <img src={ Create } alt="" onClick={ () => navigate( "/create" ) } />
            </label>
            <input type="button" id="Account" />
            <label htmlFor="Account">
                <img src={ Account } alt="" onClick={ handleAccount } />
            </label>
        </div>
    )
}

export default Menu