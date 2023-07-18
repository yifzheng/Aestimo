import React from 'react'

function Login () {
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>Aestimo</span>
                <form action="">
                    <input type="email" name="email" id="email" placeholder='Email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <button>Log in</button>
                </form>
                <p>Don't have an account? Sign up</p>
            </div>
        </div>
    )
}

export default Login