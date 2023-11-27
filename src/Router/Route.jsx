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
import ManagePropertise from "../Layout/Dashboard/Dashboard/Admin/ManagePropertise/ManagePropertise";
import ManageUsers from "../Layout/Dashboard/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageReview from "../Layout/Dashboard/Dashboard/Admin/ManageReview/ManageReview";
import AgentAddedProperties from "../Layout/Dashboard/Agent/AgentAddedProperties/AgentAddedProperties";
import AgentSoldProperties from "../Layout/Dashboard/Agent/AgentSoldProperties/AgentSoldProperties";
import RequestedProperties from "../Layout/Dashboard/Agent/RequestedProperties/RequestedProperties";
import AddProperties from "../Layout/Dashboard/Agent/AddProperties/AddProperties";
import UpdateProperty from "../Layout/Dashboard/Agent/UpdateProperty/UpdateProperty";
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
            },
            // admin
            {
                path: "manageProperties",
                element:<ManagePropertise></ManagePropertise>
            },
            {
                path:"manageUsers",
                element: <ManageUsers></ManageUsers>
            },
            {
                path:"manageReviews",
                element: <ManageReview></ManageReview>
            },
            // agent 
            {
                path: "addedProperties",
                element: <AgentAddedProperties></AgentAddedProperties>
            },

            {
                path:"addedPropertise/updateProperty",
                element: <UpdateProperty></UpdateProperty>
            },
            {
                path: "soldProperties",
                element: <AgentSoldProperties></AgentSoldProperties>
            },
            {
                path : "requestedProperties",
                element: <RequestedProperties></RequestedProperties>
            },
            {
                path: "addProperties",
                element: <AddProperties></AddProperties>
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