import React from 'react'
import { Link } from 'react-router-dom'

function Login () {
    return (
        <div className='formContainer background-fit'>
            <div className="formWrapper">
                <span className='logo'>Aestimo</span>
                <form action="">
                    <input type="email" name="email" id="email" placeholder='Email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <button>Log in</button>
                </form>
                <p>Don&#39;t have an account? <Link to={ "/register" }>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login