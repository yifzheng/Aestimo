import { createContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const initialState = {
    currentUser: {}
}

const reducer = ( state, action ) => {
    switch ( action.type ) {
        case 'UPDATE':
            return { ...state, currentUser: action.payload }
        default:
            return state
    }
}

export const AuthContext = createContext();

export const AuthContextProvider = ( { children } ) => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    useEffect( () => {
        const unsub = onAuthStateChanged( auth, async ( user ) => {
            const res = await getDoc( doc( db, "users", user.uid ) )
            dispatch( { type: "UPDATE", payload: res.data() } )
        } )

        // cleanup useEffect
        return () => {
            unsub();
        }
    }, [] )

    return (
        <AuthContext.Provider value={ { state, dispatch } }>
            { children }
        </AuthContext.Provider>
    )
}