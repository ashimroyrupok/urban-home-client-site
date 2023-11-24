import { useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [loading, setLoading]= useState(true)

    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const authInfo = {
        user,
        loading,
        createUser
    }




    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    )


};

export default AuthProvider;