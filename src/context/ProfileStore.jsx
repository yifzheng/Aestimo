import { create } from "zustand";

const ProfileStore = create( ( set ) => ( {
    profileID: null,
    profileData: {},
    posts: [],
    followers: {},
    following: {},
    setProfileID: ( id ) => set( { profileID: id } ),
    getProfileID: () => set.profileID,
    setProfileData: ( data ) => set( ( prevState ) => ( { profileData: { ...prevState.profileData, ...data } } ) ),
    getProfileData: () => set.profileData,
    setPosts: ( data ) => set( { posts: [ ...data ] } ),
    getPosts: () => set.posts,
    setFollowers: ( data ) => set( { followers: { ...data } } ),
    setFollowing: ( data ) => set( { following: { ...data } } ),
} ) )

// hydrate the store from localstorage (if available) on application load
const storedProfileID = localStorage.getItem( 'profileID' )
const storedProfileData = localStorage.getItem( 'profileData' )
const storedPosts = localStorage.getItem( 'posts' )
const storedFollowers = localStorage.getItem( 'followers' )
const storedFollowing = localStorage.getItem( 'following' )
// check if retrieved item are not null or undefined before setting state to store
if ( storedProfileID !== "undefined" ) {
    ProfileStore.setState( { profileID: JSON.parse( storedProfileID ) } )
}
if ( storedProfileData !== null ) {
    ProfileStore.setState( { profileData: JSON.parse( storedProfileData ) } )
}
if ( storedPosts !== null ) {
    ProfileStore.setState( { posts: JSON.parse( storedPosts ) } )
}
if ( storedFollowers != null ) {
    ProfileStore.setState( { followers: JSON.parse( storedFollowers ) } )
}
if ( storedFollowing != null ) {
    ProfileStore.setState( { following: JSON.parse( storedFollowing ) } )
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
ProfileStore.subscribe(
    ( state ) => { localStorage.setItem( 'followers', JSON.stringify( state.followers ) ) },
    ( state ) => state.followers
)
ProfileStore.subscribe(
    ( state ) => { localStorage.setItem( 'following', JSON.stringify( state.following ) ) },
    ( state ) => state.following
)

export default ProfileStore