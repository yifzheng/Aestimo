import { create } from "zustand";

export const ProfileStore = create( ( set ) => ( {
    profileID: null,
    profileData: {},
    setProfileID: ( id ) => set( { profileID: id } ),
    getProfileID: () => set.profileID,
    setProfileData: ( data ) => set( ( prevState ) => ( { profileData: { ...prevState.profileData, ...data } } ) ),
    getProfileData: () => set.profileData,
} ) )
