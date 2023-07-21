import { create } from "zustand";

export const ProfileStore = create( ( set ) => ( {
    profileID: null,
    profileData: {},
    posts: [],
    setProfileID: ( id ) => set( { profileID: id } ),
    getProfileID: () => set.profileID,
    setProfileData: ( data ) => set( ( prevState ) => ( { profileData: { ...prevState.profileData, ...data } } ) ),
    getProfileData: () => set.profileData,
    getPosts: () => set.posts,
    setPosts: ( data ) => set( ( prevState ) => ( { posts: [ ...prevState.posts, ...data ] } ) )
} ) )

