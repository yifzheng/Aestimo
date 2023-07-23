import { create } from "zustand";

const HomepageStore = create( ( set ) => ( {
    homeFeed: [],
    userFollowing: [],
    setHomeFeed: ( data ) => set( { homeFeed: [ ...data ] } ),
    setUserFollowing: ( data ) => set( { userFollowing: [ ...data ] } )
} ) )

/* // check if we have the home feed stored on localstorage
const storedHomeFeed = localStorage.getItem( 'homeFeed' )
const storedUserFollowing = localStorage.getItem( 'userFollowing' )
if ( storedHomeFeed !== null ) {
    HomepageStore.setState( { homeFeed: storedHomeFeed } )
}
if ( storedUserFollowing !== null ) {
    HomepageStore.setState( { userFollowing: storedUserFollowing } )
}
// Subscribe to state changes and update localStorage whenever the state changes
HomepageStore.subscribe(
    ( state ) => { localStorage.setItem( 'homeFeed', JSON.stringify( state.homeFeed ) ) },
    ( state ) => state.homeFeed
)
HomepageStore.subscribe(
    ( state ) => { localStorage.setItem( 'userFollowing', JSON.stringify( state.userFollowing ) ) },
    ( state ) => state.userFollowing
) */

export default HomepageStore