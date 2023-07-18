import React from 'react'
import Search from "../assets/search.png"
import Create from "../assets/tab.png"
import Account from "../assets/account.png"

function Menu () {
    return (
        <div className='menu'>
            <input type="button" id="search" />
            <label htmlFor="search">
                <img src={ Search } alt="" />
            </label>
            <input type="button" id="create" />
            <label htmlFor="create">
                <img src={ Create } alt="" />
            </label>
            <input type="button" id="Account" />
            <label htmlFor="Account">
                <img src={ Account } alt="" />
            </label>
        </div>
    )
}

export default Menu