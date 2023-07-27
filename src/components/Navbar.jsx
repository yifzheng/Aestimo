import React, { useContext, useEffect, useState } from 'react'
import Logo from "../assets/film-roll.png"
// import Man from "../assets/man.png"
import Exit from "../assets/exit.png"
import Edit from "../assets/edit.png"
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import ProfileStore from '../context/ProfileStore'
import { doc, getDoc } from 'firebase/firestore'
import HomepageStore from '../context/HomepageStore'

function Navbar ( { componentName } ) {
    const [ user, setUser ] = useState( {} )
    const navigate = useNavigate();

    // get current user from context
    const profileID = ProfileStore( ( state ) => state.profileID )
    //const profileData = ProfileStore( ( state ) => state.profileData )
    const setHomeFeed = HomepageStore( ( state ) => state.setHomeFeed )
    useEffect( () => {
        const fetchUser = async () => {
            const res = await getDoc( doc( db, "users", profileID ) )
            setUser( res.data() )
        }
        return () => fetchUser()
    }, [ profileID ] )

    const handleLogOut = () => {
        auth.signOut();// signout
        navigate( "/login" ) // navigate to login page to preserve url
        setHomeFeed( [] )
    }

    return (
        <div className="navbarContainer">
            { componentName === "Navbar" && <>
                <div className="logoContainer">
                    <img src={ Logo } alt='' />
                    <span className='logo-name'>Aestimogram</span>
                </div>
                {/* <div className="userContainer">
                    <img src={ Man } alt='' />
                    <span>John Doe Doey Doe Do Do</span>
                </div> */}
            </> }
            { componentName === "Profile" && <>
                <div className="userName">
                    <span className='user-name'>{ user.userName }</span>
                </div>
                <div className="profileMenu">
                    <img src={ Edit } alt="" onClick={ () => navigate( "/edit_profile" ) } />
                    <img src={ Exit } alt="" onClick={ handleLogOut } />
                </div>
            </> }
            { componentName === "UserProfile" && <>
                <div className="userName">
                    <span className='user-name'>{ user.userName }</span>
                </div>
                <div className="profileMenu">
                    <img src={ Exit } alt="" onClick={ handleLogOut } />
                </div>
            </> }
        </div>
    )
}

export default Navbar