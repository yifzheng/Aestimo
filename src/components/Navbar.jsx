import React, { useContext } from 'react'
import Logo from "../assets/film-roll.png"
// import Man from "../assets/man.png"
import Exit from "../assets/exit.png"
import Edit from "../assets/edit.png"
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'

function Navbar ( { componentName } ) {
    const navigate = useNavigate();

    // get current user from context
    const { currentUser } = useContext( AuthContext );

    const handleLogOut = () => {
        navigate( "/login" ) // navigate to login page to preserve url
        auth.signOut();// signout
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
        </div>
    )
}

export default Navbar