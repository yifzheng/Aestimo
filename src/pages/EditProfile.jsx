import React from 'react'
import Navbar from '../components/Navbar'
import Man from "../assets/man.png"
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const navigate = useNavigate();
    return (
        <div className='home background-fit'>
            <div className="container app-border">
                <div className="editProfileContainer">
                    <div className="header">
                        <span className='negative' onClick={ () => navigate( "/profile" )}>Close</span>
                        <span>Edit Profile</span>
                        <span className='positive' onClick={ () => navigate( "/profile" )}>Save</span>
                    </div>
                    <br />
                    <div className="line-break"></div>
                    <br />
                    <div className="profilePic">
                        <img src={ Man } alt="" />
                        <span>Edit picture</span>
                    </div>
                    <br />
                    <div className="line-break"></div>
                    <br />
                    <div className="formContainer">
                        <form>
                            <label><span>First Name</span> <input type="text" value={ "John" } /></label>
                            <label><span>Last Name</span> <input type="text" value={ "Doe" } /></label>
                            <label><span>Username</span> <input type="text" value={ "JohnTheDoe" } /></label>
                            <label><span>Bio</span> <textarea rows={10} value={ "John Doe" } /></label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile