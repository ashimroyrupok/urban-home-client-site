import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard/Dashboard/Dashboard/Dashboard";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyProfile from "../Layout/Dashboard/Dashboard/MyProfile/MyProfile";
import Wishlist from "../Layout/Dashboard/Dashboard/Wishlist/Wishlist";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path:"/allProperties",
                element:<AllProperties></AllProperties>
            }
        ]
    },
    {
        path: "dashboard",
        element:<Dashboard></Dashboard>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path:'profile',
                element:<MyProfile></MyProfile>
            },
            {
                path: "wishlist",
                element: <Wishlist></Wishlist>
            }
        ]
    },
    {
        path:"/login",
        element: <LoginPage></LoginPage>
    },
    {
        path:"/signUp",
        element: <SignUp></SignUp>
    }
]);

export default router;