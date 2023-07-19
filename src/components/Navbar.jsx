import React from 'react'
import Logo from "../../public/film-roll.png"
import Man from "../assets/man.png"
import Exit from "../assets/exit.png"
import Edit from "../assets/edit.png"

function Navbar ( { componentName } ) {
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
                    <img src={ Edit } alt="" />
                    <img src={ Exit } alt="" />
                </div>
            </> }
        </div>
    )
}

export default Navbar