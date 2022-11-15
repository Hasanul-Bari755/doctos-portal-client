import React, { createContext, useState, useEffect } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut,onAuthStateChanged, updateProfile} from 'firebase/auth';
export const AuthContext = createContext();
const auth = getAuth(app)



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser,userInfo)
    }

     useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user observing');
            setUser(currentUser);
            setLoading(false)
        });

        return () => unsubscribe();
    }, [])
    
    const authInfo = {
        user,
        createUser,
        login,
        logOut,
        updateUser,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo} >
              {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;