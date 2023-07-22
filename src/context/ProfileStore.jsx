import { create } from "zustand";

const ProfileStore = create( ( set ) => ( {
    profileID: null,
    profileData: {},
    posts: [],
    setProfileID: ( id ) => set( { profileID: id } ),
    getProfileID: () => set.profileID,
    setProfileData: ( data ) => set( ( prevState ) => ( { profileData: { ...prevState.profileData, ...data } } ) ),
    getProfileData: () => set.profileData,
    setPosts: ( data ) => set( { posts: [ ...data ] } ),
    getPosts: () => set.posts,
} ) )

// hydrate the store from localstorage (if available) on application load
const storedProfileID = localStorage.getItem( 'profileID' )
const storedProfileData = localStorage.getItem( 'profileData' )
const storedPosts = localStorage.getItem( 'posts' )

if ( storedProfileID !== "undefined" ) {
    ProfileStore.setState( { profileID: JSON.parse( storedProfileID ) } )
}

if ( storedProfileData !== null ) {
    ProfileStore.setState( { profileData: JSON.parse( storedProfileData ) } )
}
if ( storedPosts !== null ) {
    ProfileStore.setState( { posts: JSON.parse( storedPosts ) } )
}

// Subscribe to state changes and update localStorage whenever the state changes
ProfileStore.subscribe(
    ( state ) => { localStorage.setItem( 'profileID', JSON.stringify( state.profileID ) ) },
    ( state ) => state.profileID
)
ProfileStore.subscribe(
    ( state ) => { localStorage.setItem( 'profileData', JSON.stringify( state.profileData ) ) },
    ( state ) => state.profileData
)
ProfileStore.subscribe(
    ( state ) => { localStorage.setItem( 'posts', JSON.stringify( state.posts ) ) },
    ( state ) => state.posts
)

export default ProfileStore