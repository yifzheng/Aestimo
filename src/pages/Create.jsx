import React from 'react'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Image from "../assets/image.png"
import Lily from "../assets/orange-lily.jpg"

function Create () {
    return (
        <div className='create background-fit'>
            <div className="createContainer app-border">
                <Navbar />
                <div className="createPost y-overflow">
                    <div className="createOptions">
                        <span className='negative'>Cancel</span>
                        <span className='positive'>Post</span>
                    </div>
                    <div className="createImage">
                        <img src={ Image } alt="" />
                        <button>Select Image</button>
                    </div>
                    <br />
                    <div className="createCaption">
                        <fieldset>
                            <legend>Caption</legend>
                            <textarea name="caption" id="caption" cols="70" rows="5" />
                        </fieldset>

                    </div>
                    <br />
                    <div className="line-break"></div>
                    <span>Recents</span>
                    <div className="createRecents">
                        <img src={ Lily } alt="" />
                        <img src={ Lily } alt="" />
                        <img src={ Lily } alt="" />
                        <img src={ Lily } alt="" />
                        <img src={ Lily } alt="" />
                    </div>
                </div>
                <Menu />
            </div>
        </div>
    )
}

export default Create