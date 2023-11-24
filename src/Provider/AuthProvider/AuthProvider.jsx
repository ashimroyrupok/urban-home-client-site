import { useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [loading, setLoading]= useState(true)

    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login usr

    const  loginUser = (email,password)=> {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser
    }




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    )


};

export default AuthProvider;