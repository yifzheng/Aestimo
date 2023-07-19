import React from 'react'
import Logo from "../../public/film-roll.png"
import Man from "../assets/man.png"
import Exit from "../assets/exit.png"
import Edit from "../assets/edit.png"
import { useNavigate } from 'react-router-dom'

function Navbar ( { componentName } ) {
    const navigate = useNavigate();

    return (
        <div className="navbarContainer">
            { componentName === "Navbar" && <>
                <div className="logoContainer">
                    <img src={ Logo } alt='' />
                    <span className='logo-name'>Aestimo</span>
                </div>
                <div className="userContainer">
                    <img src={ Man } alt='' />
                    <span>John Doe</span>
                </div>
            </> }
            { componentName === "Profile" && <>
                <div className="userName">
                    <span className='user-name'>JohnTheDoe</span>
                </div>
                <div className="profileMenu">
                    <img src={ Edit } alt="" onClick={ () => navigate( "/edit_profile" )}/>
                    <img src={ Exit } alt="" onClick={ () => navigate( "/login" )}/>
                </div>
            </> }
        </div>
    )
}

export default Navbar