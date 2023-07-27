import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

function Register () {
    const [ err, setErr ] = useState( false )
    const navigate = useNavigate();

    const capitalizeWord = ( word ) => word.charAt( 0 ).toUpperCase() + word.slice( 1 )

    // submission of registration form
    const handleSubmit = async ( e ) => {
        e.preventDefault(); // prevents window from reloading
        const userName = e.target[ 0 ].value; // username fild
        const firstName = capitalizeWord( e.target[ 1 ].value ); // capitalize first letter of name in case user did not
        const lastName = capitalizeWord( e.target[ 2 ].value ); // capitalize first letter of name in case user did not
        const email = e.target[ 3 ].value;
        const password = e.target[ 4 ].value;

        try {
            // create a new user with email and password
            const res = await createUserWithEmailAndPassword( auth, email, password );
            // update auth user information
            await updateProfile( auth.currentUser, {
                displayName: userName
            } )
            const userUID = res.user.uid; // retrieve the user uid as id for other collections

            // create a new user document
            await setDoc( doc( db, "users", userUID ), {
                id: userUID,
                firstName,
                lastName,
                userName,
                email,
                caption: "",
                photoURL: null,
                recents: []
            } )
            // create empty posts collection
            await setDoc( doc( db, "posts", userUID ), {} )
            // create empty collection to store posts saved by user
            await setDoc( doc( db, "saved", userUID ), {} )
            // create empty collection to store users following a currentUser
            await setDoc( doc( db, "followers", userUID ), { followers: [] } )
            // create empty colection to store users that currentUser is following
            await setDoc( doc( db, "following", userUID ), { following: [] } )
            // if we successfully accomplish above, we navigate to home page
            setTimeout( () => {
                navigate( "/home" )
            }, 3000 )
        } catch ( error ) {
            setErr( true )
            e.target[ 4 ].value = ""; // reset password field if there is an error
        }
    }


    return (
        <div className='formContainer background-fit'>
            <div className="formWrapper">
                <span className='logo'>Aestimogram</span>
                <span className='appDesc'>Sign up to see and rate photos from your friends</span>
                <form onSubmit={ handleSubmit }>
                    <input type="text" name="userName" id="userName" placeholder='User Name' required />
                    <input type="text" name="firstName" id="firstName" placeholder='First Name' required />
                    <input type="text" name="lastName" id="lastName" placeholder='Last Name' required />
                    <input type="email" name="email" id="email" placeholder='Email' required />
                    <input type="password" name="password" id="password" placeholder='Password' required minLength={ 8 } />
                    <span className='disclosure'>By signing up, you consent to the collection of the above information in our database</span>
                    <button>Sign up</button>
                    { err && <span className='error'>Something went wrong</span> }
                </form>
                <p>Have an account? <Link to={ "/login" }>Log in</Link></p>
            </div>
        </div>
    )
}

export default Register