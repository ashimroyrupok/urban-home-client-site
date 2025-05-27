/* eslint-disable react/prop-types */
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading}= useAuth()

    if(loading){
        return <div className="w-full h-[70vh] flex justify-center items-center"> <Loading></Loading> </div>
    }

    if(user){
        return children;
    }

    return <Navigate to={'/login'}></Navigate>
};

export default PrivateRoute;