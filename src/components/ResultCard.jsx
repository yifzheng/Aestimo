import React from 'react'
import Man from "../assets/man.png"

function ResultCard () {
    return (
        <div className='resultCard'>
            <img src={ Man } alt='' />
            <span>John Doe</span>
        </div>
    )
}

export default ResultCard