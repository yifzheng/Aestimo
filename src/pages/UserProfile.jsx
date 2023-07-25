import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import Display from '../components/Display'

function UserProfile () {
    return (
        <div className='page background-fit'>
            <div className="container app-border">
                <Navbar componentName={ "UserProfile" } />
                <Display componentName={ "UserProfile" } />
                <Menu />
            </div>
        </div>
    )
}

export default UserProfile