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
import Wishlist from "../Layout/Dashboard/Dashboard/Wishlist/Wishlist";
import ManagePropertise from "../Layout/Dashboard/Dashboard/Admin/ManagePropertise/ManagePropertise";
import ManageUsers from "../Layout/Dashboard/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageReview from "../Layout/Dashboard/Dashboard/Admin/ManageReview/ManageReview";
import AgentAddedProperties from "../Layout/Dashboard/Agent/AgentAddedProperties/AgentAddedProperties";
import AgentSoldProperties from "../Layout/Dashboard/Agent/AgentSoldProperties/AgentSoldProperties";
import RequestedProperties from "../Layout/Dashboard/Agent/RequestedProperties/RequestedProperties";
import AddProperties from "../Layout/Dashboard/Agent/AddProperties/AddProperties";
import UpdateProperty from "../Layout/Dashboard/Agent/UpdateProperty/UpdateProperty";
import PrivateRoute from "./PrivateRoute";
import PropertiesDetails from "../Pages/PropertiesDetails/PropertiesDetails";
import BuyNow from "../Layout/Dashboard/Dashboard/Wishlist/BuyNow";
import PropertyBrought from "../Layout/Dashboard/Dashboard/PropertyBrought/PropertyBrought";
import MyReview from "../Pages/Home/Review/MyReview";
import PayNow from "../Layout/Dashboard/Dashboard/PropertyBrought/PayNow/PayNow";
import AdvertiseProperty from "../Layout/Dashboard/Dashboard/Admin/AdvertiseProperty”/AdvertiseProperty";
import Contact from "../Pages/Contact/Contact";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/allProperties",
                element: <PrivateRoute> <AllProperties></AllProperties> </PrivateRoute>
            },
            {
                path: "/contactUs",
                element: <Contact></Contact>
            },
            {
                path: "/properties-Details/:id",
                element: <PrivateRoute> <PropertiesDetails></PropertiesDetails> </PrivateRoute>

            },
            {
                path: "/buyNow/:id",
                element: <BuyNow></BuyNow>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            
            {
                path: "wishlist",
                element: <Wishlist></Wishlist>
            },
            {
                path: "propertyBought",
                element: <PropertyBrought></PropertyBrought>

            },
            {
                path: "myReviews",
                element: <MyReview></MyReview>
            },
            {
                path:"payNow/:id",
                element: <PrivateRoute> <PayNow></PayNow> </PrivateRoute>
            },
            // admin
            {
                path: "manageProperties",
                element: <ManagePropertise></ManagePropertise>
            },
            {
                path: "manageUsers",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "manageReviews",
                element: <ManageReview></ManageReview>
            },
            {
                path:"advertiseProperty",
                element: <AdvertiseProperty></AdvertiseProperty>
            },
            // agent 
            {
                path: "addedProperties",
                element: <AgentAddedProperties></AgentAddedProperties>
            },

            {
                path: "addedProperties/updateProperty/:id",
                element: <UpdateProperty></UpdateProperty>
            },
            {
                path: "soldProperties",
                element: <AgentSoldProperties></AgentSoldProperties>
            },
            {
                path: "requestedProperties",
                element: <RequestedProperties></RequestedProperties>
            },
            {
                path: "addProperties",
                element: <AddProperties></AddProperties>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage></LoginPage>
    },
    {
        path: "/signUp",
        element: <SignUp></SignUp>
    }
]);

export default router;