import { create } from "zustand";

const ExploreStore = create( ( set ) => ( {
    explorePosts: [],
    postRef: null,
    setExplorePosts: ( data ) => set( { explorePosts: [ ...data ] } ),
    setPostRef: ( data ) => set( { postRef: data } )
} ) )


export default ExploreStore