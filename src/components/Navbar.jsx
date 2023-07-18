import React from 'react'
import Logo from "../../public/film-roll.png"
import Man from "../assets/man.png"

function Navbar () {
    return (
        <div className="navbarContainer">
            <div className="logoContainer">
                <img src={ Logo } alt='' />
                <span className='logo-name'>Aestimo</span>
            </div>
            <div className="userContainer">
                <img src={Man} alt='' />
                <span>John Doe</span>
            </div>
        </div>
    )
}

export default Navbar