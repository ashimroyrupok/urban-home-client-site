import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AllProperties from "../Pages/AllProperties/AllProperties";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUp from "../Pages/SignUp/SignUp";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
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
        element:<Dashboard></Dashboard>
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