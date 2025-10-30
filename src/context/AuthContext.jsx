import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {auth, db} from "../config/firebase";

//auth context creation
const AuthContext = createContext();

//custom hook to use auth context
export function useAuth () {
    return useContext(AuthContext);
}

//Authentication provider component
export function AuthProvider ({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function signup(email, password, displayName) {
        try {
            //create user with email and password
            const result = await createUserWithEmailAndPassword(createUserWithEmailAndPassword, auth, email, password);

            await updateProfile (result.user, {
                displayName: displayName
            });

            //save additional user info in firestore
            await setDoc(doc(db, 'users', result.user.uid), {
                displayName: displayName,
                email: email,
                createdAt: new Date().toISOString()
            });

            return result.user;

        }catch (error) {
            console.error('registration error:', error);
            throw error;
        }
    }

    function login(email, password) {
        signInWithEmailAndPassword (auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }
    //Listner for authentication state changes
    useEffect (() => {
        const unsubscribe =onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {  currentUser, signup, login, logout};
    
    return (
        <AuthContext.Provider value={value}>
            {! loading && children}
        </AuthContext.Provider>
    )
}