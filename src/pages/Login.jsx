import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

function Login () {
    const [ err, setErr ] = useState( false )
    const navigate = useNavigate();
    // handle submit of login form
    const handleSubmit = async ( e ) => {
        e.preventDefault(); // prevent window from reloading

        // parse form values
        const email = e.target[ 0 ].value
        const password = e.target[ 1 ].value

        // try to login with form data
        try {
            await signInWithEmailAndPassword( auth, email, password )
            setTimeout( () => navigate( "/home" ), 1000 )
        } catch ( error ) {
            setErr( true )
        }
    }

    return (
        <div className='formContainer background-fit'>
            <div className="formWrapper">
                <span className='logo'>Aestimogram</span>
                <form onSubmit={ handleSubmit }>
                    <input type="email" name="email" id="email" placeholder='Email' required />
                    <input type="password" name="password" id="password" placeholder='Password' required minLength={ 8 } />
                    <button>Log in</button>
                    { err && <span className='error'>Something went wrong</span> }
                </form>
                <p>Don&#39;t have an account? <Link to={ "/register" }>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login