import React, { useContext, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Image from "../assets/image.png"
import Lily from "../assets/orange-lily.jpg"
import { useNavigate } from 'react-router-dom'
import ProfileStore from '../context/ProfileStore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuid } from "uuid"
import { AuthContext } from '../context/AuthContext'

function Create () {
    const profileData = ProfileStore( ( state ) => state.profileData ) // used to get the most recent images the uses had when posting
    const { currentUser } = useContext( AuthContext )
    const [ imageSrc, setImageSrc ] = useState( "" );
    const [ caption, setCaption ] = useState( "" )
    const navigate = useNavigate();
    const imageRef = useRef();

    // handle image select
    const handleImageSelect = () => {
        const selectedImg = imageRef.current;
        // if the selected image exists
        if ( selectedImg && selectedImg.files.length > 0 ) {
            const selectedFile = selectedImg.files[ 0 ]
            const selectedFileURL = URL.createObjectURL( selectedFile )
            setImageSrc( selectedFileURL )
        }
    }

    const handlePost = () => {
        const selectedImg = imageRef.current
        const userID = currentUser.id;
        // if we uploaded a file instead of choosing an image from recent posts
        if ( selectedImg && selectedImg.files.length > 0 ) {
            const selectedFile = selectedImg.files[ 0 ] // get image
            const storageRef = ref( storage, "/post/" + currentUser.id + selectedFile.name ); // create a image in post folder
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
                    console.log( error )
                }, () => {
                    getDownloadURL( uploadTask.snapshot.ref ).then( async ( downloadURL ) => {
                        // update the posts document for the user in posts collection
                        const docUUID = uuid();
                        await setDoc( doc( db, "posts", docUUID ), {
                            "photoURL": downloadURL,
                            "caption": caption,
                            "ownerID": userID,
                            "likes": [],
                        } )
                    } )
                } )
        }
    }

    return (
        <div className='create background-fit'>
            <div className="createContainer app-border">
                <Navbar componentName={ "Navbar" } />
                <div className="createPost y-overflow">
                    <div className="createOptions">
                        <span className='negative' onClick={ () => navigate( "/home" ) }>Cancel</span>
                        <span className='positive' onClick={ handlePost }>Post</span>
                    </div>
                    <div className="createImage">
                        <img src={ imageSrc ? imageSrc : Image } alt="" />
                        <input type="file" name="image" id="image" style={ { display: "none" } } ref={ imageRef } required onChange={ handleImageSelect } />
                        <label htmlFor='image'>Select Image</label>
                    </div>
                    <br />
                    <div className="createCaption">
                        <fieldset>
                            <legend>Caption</legend>
                            <textarea name="caption" id="caption" cols="70" rows="5" onChange={ ( e ) => setCaption( e.target.value ) } />
                        </fieldset>

                    </div>
                    <br />
                    <div className="line-break"></div>
                    <br />
                    <span>Recents</span>
                    <div className="createRecents">
                        { profileData.recents && profileData.recents.map( ( url, idx ) => ( <img src={ url } key={ idx } onClick={ () => setImageSrc( url ) } /> ) ) }
                    </div>
                </div>
                <Menu />
            </div>
        </div>
    )
}

export default Create