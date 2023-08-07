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
    // const [ user, setUser ] = useState( {} )
    const navigate = useNavigate();

    // get current user from context
    const { state: { currentUser } } = useContext( AuthContext )
    // const externalProfileID = ProfileStore( ( state ) => state.externalProfileID )
    const externalProfileData = ProfileStore( ( state ) => state.externalProfileData )
    const setHomeFeed = HomepageStore( ( state ) => state.setHomeFeed )
    /* useEffect( () => {
        const fetchUser = async () => {
            const res = await getDoc( doc( db, "users", externalProfileID ) )
            setUser( res.data() )
        }
        return () => fetchUser()
    }, [ externalProfileID ] ) */

    const handleLogOut = () => {
        signOut( auth ).then( () => {
            setTimeout( () => navigate( "/" ), 1500 ) // navigate to start page
            location.reload()
        } )
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
                    <span className='user-name'>{ currentUser.userName }</span>
                </div>
                <div className="profileMenu">
                    <img src={ Edit } alt="" onClick={ () => navigate( "/edit_profile" ) } />
                    <img src={ Exit } alt="" onClick={ handleLogOut } />
                </div>
            </> }
            { componentName === "UserProfile" && <>
                <div className="userName">
                    <span className='user-name'>{ externalProfileData.userName }</span>
                </div>
                <div className="profileMenu">
                    <img src={ Exit } alt="" onClick={ handleLogOut } />
                </div>
            </> }
        </div>
    )
}

export default Navbar