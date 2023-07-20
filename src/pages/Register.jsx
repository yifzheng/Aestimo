import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

function Register () {
    const [ err, setErr ] = useState( false )

    // submission of registration form
    const handleSubmit = async ( e ) => {
        e.preventDefault(); // prevents window from reloading
        const userName = e.target[ 0 ].value;
        const firstName = e.target[ 1 ].value;
        const lastName = e.target[ 2 ].value;
        const email = e.target[ 3 ].value;
        const password = e.target[ 4 ].value;
        console.log( "email: ", email )
        console.log( "password: ", password )
        try {
            // create a new user with email and password
            const res = await createUserWithEmailAndPassword(auth, email, password );
            console.log( res.user )
            //const userUID = res.user.uid; // retrieve the user uid as id for other collections

            // create a new user document
        } catch ( error ) {
            console.log( error )
            setErr( true )
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
                    { err && <span className='email-error'>Something went wrong</span> }
                </form>
                <p>Have an account? <Link to={ "/login" }>Log in</Link></p>
            </div>
        </div>
    )
}

export default Register