import React, { useContext, useEffect, useRef, useState } from 'react'
import ResultCard from './ResultCard'
import Man from "../assets/man.png"
import Search from '../assets/search.png'
import Lily from "../assets/orange-lily.jpg"
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import ExploreStore from '../context/ExploreStore'

function SearchDisplay () {
    const [ searchContent, setSearchContent ] = useState( "" )
    const [ results, setResults ] = useState( false )
    const [ users, setUsers ] = useState( [] )
    /// const [ posts, setPosts ] = useState( [] )
    const [ displayLimit, setDisplayLimit ] = useState( 30 )
    const navigate = useNavigate();
    const { state: { currentUser } } = useContext( AuthContext )
    const explorePosts = ExploreStore( ( state ) => state.explorePosts )
    const setExplorePosts = ExploreStore( ( state ) => state.setExplorePosts )
    const setPostRef = ExploreStore( ( state ) => state.setPostRef )
    const idRef = useRef()

    // get all posts that isn't the users adn sort by creation date
    useEffect( () => {
        const unsub = onSnapshot( query( collection( db, "posts" ), where( "ownerID", "!=", currentUser.id ) ), ( querySnapshot ) => {
            const postsData = querySnapshot.docs.map( ( doc ) => ( { id: doc.id, ...doc.data() } ) )
            postsData.sort( ( a, b ) => b.createAt - a.createAt )
            setExplorePosts( postsData )
        } )
        return () => {
            unsub()
        }
    }, [] )

    const increaseLimit = () => {
        setDisplayLimit( prevState => prevState + 30 )
    }

    // handle the seach of the user
    const handleSearch = async () => {
        const q = query( collection( db, "users" ), where( "userName", ">=", searchContent ), where( "userName", "<", searchContent + "\uf8ff" ) )
        try {
            // create temporary array to store users
            let temp = []
            // retrive user if exist
            const querySnapshot = await getDocs( q )
            querySnapshot.forEach( ( doc ) => {
                temp.push( doc.data() )
            } )
            setUsers( temp )
        } catch ( error ) {
            console.error( error )
        }
    }

    // check if the user pressed enter to initiate search of users
    const handleKeyPress = ( e ) => {
        e.code === "Enter" && handleSearch()
    }

    const handleCancel = () => {
        setResults( false )
        setSearchContent( "" )
    }

    const handleExplore = () => {
        const imageID = idRef.current.id
        setPostRef( imageID )
        navigate( '/explore' )
    }

    return (
        <div className='searchContainer'>
            <div className="searchBar">
                <input type="text" placeholder='Search' onFocus={ () => setResults( true ) } onChange={ e => setSearchContent( e.target.value ) } onKeyDown={ handleKeyPress } />
                <span onClick={ handleCancel }>Cancel</span>
            </div>
            { results && <div className="searchContent"><span>Searching for &#39;{ searchContent }&#39;</span></div> }
            { results && <div className="searchResults">
                { users.length > 0 && users.map( ( user ) => ( <ResultCard key={ user.id } user={ user } /> ) ) }
            </div> }
            { !results && <div className="explore">
                <div className="explore-posts">
                    { explorePosts.length > 0 && explorePosts.map( ( post, index ) => {
                        if ( ( index + 1 ) < displayLimit ) {
                            return <div key={ post.id }><img id={ post.id } src={ post.photoURL } alt="" onClick={ handleExplore } data-post-id={ post.id } ref={ idRef } /></div>
                        }
                    } ) }
                </div>
                { explorePosts.length > 30 && < div className="showMore"><span onClick={ increaseLimit }>Show More</span></div> }
            </div> }

        </div >
    )
}

export default SearchDisplay