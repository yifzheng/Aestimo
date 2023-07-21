import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import blank from "../assets/blank.png"
import { useNavigate } from 'react-router-dom'
import { ProfileStore } from '../context/ProfileStore'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const EditProfile = () => {
    const profileData = ProfileStore( ( state ) => state.profileData )
    const setProfileData = ProfileStore( ( state ) => state.setProfileData )
    const [ user, setUser ] = useState( {} )
    const navigate = useNavigate();

    useEffect( () => {
        setUser( JSON.parse( JSON.stringify( profileData ) ) )
    }, [ profileData ] )

    // handle changes in the input fields
    const handleInputChange = ( event ) => {
        const { name, value } = event.target;

        setUser( {
            ...user,
            [ name ]: value,
        } )
    }

    const handleUpdate = async () => {
        try {
            await updateDoc( doc( db, "users", profileData.id ), user )
            setProfileData( user )
            navigate( "/profile" )
        } catch ( error ) {
            alert( "ERROR: Can not upate" )
        }
    }

    return (
        <div className='home background-fit'>
            <div className="container app-border">
                <div className="editProfileContainer">
                    <div className="header">
                        <span className='negative' onClick={ () => navigate( "/profile" ) }>Close</span>
                        <span>Edit Profile</span>
                        <span className='positive' onClick={ handleUpdate }>Save</span>
                    </div>
                    <br />
                    <div className="line-break"></div>
                    <br />
                    <div className="profilePic">
                        <img src={ blank } alt="" />
                        <span>Edit picture</span>
                    </div>
                    <br />
                    <div className="line-break"></div>
                    <br />
                    <div className="formContainer">
                        <form>
                            <label><span>First Name</span> <input type="text" value={ user?.firstName } name="firstName" onChange={ handleInputChange } /></label>
                            <label><span>Last Name</span> <input type="text" value={ user?.lastName } name='lastName' onChange={ handleInputChange } /></label>
                            <label><span>Username</span> <input type="text" value={ user?.userName } name='userName' onChange={ handleInputChange } /></label>
                            <label><span>Bio</span> <textarea rows={ 10 } value={ user?.caption } name='caption' onChange={ handleInputChange } /></label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
/* caption
: 
""
email
: 
"yifengzheng@duck.com"
firstName
: 
"Yifeng"
id
: 
"cueFSvuo6idEwcbQ2qffv9N0KJJ2"
lastName
: 
"Zheng"
photoURL
: 
null
userName
: 
"yifzheng */