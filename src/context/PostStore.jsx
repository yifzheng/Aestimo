import { create } from "zustand";

export const PostStore = create( ( set ) => ( {
    post: {},
    setPost: ( data ) => set( ( prevState ) => ( { post: { ...prevState.post, ...data } } ) )
} ) )