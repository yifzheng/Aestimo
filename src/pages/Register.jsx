import React from 'react'

function Register () {
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>Aestimo</span>
                <span className='appDesc'>Sign up to see and rate photos from your friends</span>
                <form >
                    <input type="text" name="userName" id="userName" placeholder='UserName' />
                    <input type="text" name="firstName" id="firstName" placeholder='First Name' />
                    <input type="text" name="lastName" id="lastName" placeholder='Last Name' />
                    <input type="email" name="email" id="email" placeholder='Email' />
                    <input type="password" name="password" id="password" placeholder='Password' />
                    <span className='disclosure'>By signing up, you consent to the collection of the above information in our database</span>
                    <button>Sign up</button>
                </form>
                <p>Have an account? Log in</p>
            </div>
        </div>
    )
}

export default Register