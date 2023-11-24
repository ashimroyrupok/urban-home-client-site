import { useEffect, useState } from "react";
import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login
    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleProvider = new GoogleAuthProvider()
    const  googleSignin = ()=> {
        return  signInWithPopup(auth,googleProvider)
    }

    // auth observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    // update profile
    const update = (name, imgUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: imgUrl
        })
    }

    // logout
    const Logout = () => {
        return signOut(auth)
    }

    // login usr

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {
        user,
        loading,
        createUser,
        googleSignin,
        update,
        loginUser,
        signin,
        Logout
    }




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    )


};

export default AuthProvider;