import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ( { children } ) => {
    const [ currentUser, setCurrentUser ] = useState( {} )

    useEffect( () => {
        const unsub = onAuthStateChanged( auth, async ( user ) => {
            const res = await getDoc( doc( db, "users", user.uid ) )
            setCurrentUser( res.data() )
        } )

        // cleanup useEffect
        return () => {
            unsub();
        }
    }, [] )

    return (
        <AuthContext.Provider value={ { currentUser } }>
            { children }
        </AuthContext.Provider>
    )
}