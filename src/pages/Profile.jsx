import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import Display from '../components/Display'

function Profile () {
    return (
        <div className='page background-fit'>
            <div className="container app-border">
                <Navbar componentName={ "Profile" } />
                <Display componentName={ "Profile" } />
                <Menu />
            </div>
        </div>
    )
}

export default Profile