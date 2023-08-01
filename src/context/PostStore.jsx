import { create } from "zustand";

const PostStore = create( ( set ) => ( {
    post: {},
    postOwner: {},
    setPost: ( postData ) => set( { post: { ...postData } } ),
    setPostOwner: ( postOwnerData ) => set( { postOwner: { ...postOwnerData } } )
} ) )

/* // check if there is data stored in local storage
const storedPost = localStorage.getItem( 'post' )
// check if the stored post is null or undefined
if ( storedPost !== null ) {
    PostStore.setState( { post: JSON.parse( storedPost ) } )
}
// subscribe to changes
PostStore.subscribe(
    ( state ) => { localStorage.setItem( 'post', JSON.stringify( state.post ) ) },
    ( state ) => state.post
)
 */


export default PostStore