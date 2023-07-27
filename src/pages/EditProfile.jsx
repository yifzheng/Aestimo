import React, { useEffect, useState, useRef, useContext } from 'react'
import Navbar from '../components/Navbar'
import blank from "../assets/blank.png"
import { useNavigate } from 'react-router-dom'
import ProfileStore from '../context/ProfileStore'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '../firebase'
import { updateProfile } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'

const EditProfile = () => {
    const profileData = ProfileStore( ( state ) => state.profileData )
    const setProfileData = ProfileStore( ( state ) => state.setProfileData )
    const [ user, setUser ] = useState( {} )
    const [ err, setErr ] = useState( false )
    const [ selectedImgSrc, setSelectedImgSrc ] = useState( '' )
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const { dispatch } = useContext( AuthContext )

    // onload of page, set the user state with data from global state for edit
    useEffect( () => {
        setUser( JSON.parse( JSON.stringify( profileData ) ) )
        setSelectedImgSrc( profileData.photoURL )
    }, [ profileData ] )

    // handle changes in the input fields
    const handleInputChange = ( event ) => {
        const { name, value } = event.target;

        setUser( {
            ...user,
            [ name ]: value,
        } )
    }
    // handle the update of the user component
    const handleUpdate = async () => {
        try {
            // retreive file from input ref
            const fileInput = fileInputRef.current
            const updatedUser = { ...user }
            // <------PUSH THE IMAGE TO STORAGE----------------------------->
            if ( fileInput && fileInput.files.length > 0 ) { // if there is a file in the file input
                const selectedFile = fileInput.files[ 0 ]; // get the first one
                const storageRef = ref( storage, "/user/" + profileData.id + selectedFile.name ) // get storage reference and set file filename to be user display name
                const uploadTask = uploadBytesResumable( storageRef, selectedFile ) // create upload task
                uploadTask.on( 'state_changed', ( snapshot ) => {
                    const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                    console.log( 'Upload is ' + progress + '% done' );
                    switch ( snapshot.state ) {
                        case 'paused':
                            console.log( 'Upload is paused' );
                            break;
                        case 'running':
                            console.log( 'Upload is running' );
                            break;
                    }
                },
                    ( error ) => {
                        setErr( true )
                        console.log( error )
                    }, () => {
                        getDownloadURL( uploadTask.snapshot.ref ).then( async ( downloadURL ) => {
                            updatedUser.photoURL = downloadURL;
                            // find the user document associated with profileData.id and update its contents with contents from user object
                            await updateProfile( auth.currentUser, {
                                photoURL: downloadURL
                            } )
                            await updateDoc( doc( db, "users", profileData.id ), updatedUser )
                            dispatch( { type: "UPDATE", payload: updatedUser } )
                            // updateDoc does not return the updated doc so we manually set the profile data again
                            setProfileData( updatedUser )
                            navigate( "/profile" )
                        } )
                    } )
            }
            else {
                //<----- IF THERE IS NO IMAGE, JUST UPDATE THE PROFILE
                // find the user document associated with profileData.id and update its contents with contents from user object
                await updateDoc( doc( db, "users", profileData.id ), updatedUser )
                // updateDoc does not return the updated doc so we manually set the profile data again
                setProfileData( updatedUser )
                navigate( "/profile" )
            }


        } catch ( error ) {
            setErr( true )
        }
    }

    const handleFileSelect = () => {
        // retreive file from input ref
        const fileInput = fileInputRef.current
        // <------PUSH THE IMAGE TO STORAGE----------------------------->
        if ( fileInput && fileInput.files.length > 0 ) { // if there is a file in the file input
            const selectedFile = fileInput.files[ 0 ]; // get the first one
            const selectedFileURL = URL.createObjectURL( selectedFile )
            setSelectedImgSrc( selectedFileURL )
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
                        <img src={ selectedImgSrc ? selectedImgSrc : blank } alt="" />
                        <input type="file" name="profilePic" id="profilePic" style={ { display: "none" } } ref={ fileInputRef } onChange={ handleFileSelect } />
                        <label htmlFor="profilePic"><span >Edit picture</span></label>
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
                        { err && <span className='update-error'>Something went wrong</span> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile