import { FaHeart, FaHome } from "react-icons/fa";
import { MdManageSearch, MdOutlineSell, MdPreview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css"
import { Divider } from "@mui/material";
import { GrUserManager } from "react-icons/gr";
import { FaUsersGear } from "react-icons/fa6";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="bg-orange-400 w-32 lg:w-64 text-white min-h-screen  font-semibold">
                <div className="ml-3 lg:mx-10 mt-10">
                    {/* user navbar */}
                    {/* <div id="activeList">
                        <NavLink  to='/dashboard/profile' className="navItem flex gap-1 justify-start  items-center">  <FaHome></FaHome> My Profile </NavLink>
                        <NavLink to='/dashboard/wishlist' className="navItem flex gap-1 justify-start  items-center">  <FaHeart></FaHeart> Wishlist</NavLink>
                        <NavLink to='/dashboard/propertyBought' className="navItem flex gap-1 justify-start  items-center">  <MdOutlineSell></MdOutlineSell> Property bought</NavLink>
                        <NavLink to='/dashboard/myReviews' className=" navItem flex gap-1 justify-start  items-center">  <MdPreview></MdPreview> My Reviews</NavLink>
                    </div> */}
                    {/* admin navbar */}
                    <div id="activeList" className="gap-y-2" >
                        <NavLink  to='/dashboard/profile' className="navItem flex gap-1 justify-start  items-center">  <FaHome className="text-black text-xl"></FaHome> Admin Profile </NavLink>
                        <NavLink to='/dashboard/manageProperties' className="navItem flex gap-1 justify-start  items-center">  <GrUserManager className="text-black text-xl"></GrUserManager> Manage Properties</NavLink>
                        <NavLink to='/dashboard/manageUsers' className="navItem flex gap-1 justify-start  items-center">  <FaUsersGear className="text-black text-xl"></FaUsersGear> Manage Users</NavLink>
                        <NavLink to='/dashboard/myReviews' className=" navItem flex gap-1 justify-start  items-center">  <MdManageSearch className="text-black text-xl"></MdManageSearch> Manage reviews</NavLink>
                    </div>
                    {/* agent navbar */}
                    {/* <div id="activeList" className="gap-y-4 text-sm" >
                        <NavLink to='/dashboard/profile' className="navItem flex gap-1 justify-start   items-center">  <FaHome className="text-black text-xl"></FaHome> Agent Profile </NavLink>

                        <NavLink to='/dashboard/addedProperties' className="navItem my-3 flex gap-1 justify-start  items-center">  <GrUserManager className="text-black text-xl"></GrUserManager> My added properties</NavLink>

                        <NavLink to='/dashboard/soldProperties' className="navItem flex gap-1 justify-start  items-center">  <FaUsersGear className="text-black text-xl"></FaUsersGear> My Sold Properties</NavLink>

                        <NavLink to='/dashboard/requestedProperties' className=" navItem my-3 flex gap-1 justify-start  items-center">  <MdManageSearch className="text-black text-xl"></MdManageSearch> Requested Properties</NavLink>
                    </div> */}

                    <Divider sx={{ my: 6 }} variant="middle" />
                    <div>
                        <NavLink to={'/'}> <button className="hover:text-[black]"> Go to Home</button></NavLink>
                    </div>
                </div>
            </div>

            <div className="flex-1  lg:ml-10">

                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;