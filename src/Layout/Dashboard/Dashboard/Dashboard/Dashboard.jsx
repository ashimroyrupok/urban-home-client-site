import { FaHeart, FaHome } from "react-icons/fa";
import { MdManageSearch, MdOutlineSell, MdPreview } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css"
import { Button, Divider, SwipeableDrawer, Typography } from "@mui/material";
import { GrUserManager } from "react-icons/gr";
import { FaUsersGear } from "react-icons/fa6";
import React from "react";
import { IoMenu } from "react-icons/io5";

const Dashboard = () => {

    const [state, setState] = React.useState({
        top: false,

    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    return (
        <div>


            <div className="flex ">
                <div>
                    {/* navbar */}
                    <div className="lg:hidden ">
                        {['left'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)}> <IoMenu className="text-2xl" /> </Button>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {/* {list(anchor)} */}

                                    <div className="pl-2 pt-6 lg:mx-10 bg-orange-400 ">

                                        <Typography variant="h6" sx={{ my: 2 }}>
                                            <div className='w-full bg-slate-100 flex  justify-center items-center'>
                                                <img className='w-24  ' src="https://i.ibb.co/sqkXmDp/urban-homes-removebg-preview.png" alt="" />
                                            </div>
                                        </Typography>
                                        <Divider />
                                        {/* user navbar */}
                                        <div id="activeList">
                                            <NavLink to='/dashboard/profile' className="navItem flex gap-1 justify-start  items-center">  <FaHome></FaHome> My Profile </NavLink>
                                            <NavLink to='/dashboard/wishlist' className="navItem flex gap-1 justify-start  items-center">  <FaHeart></FaHeart> Wishlist</NavLink>
                                            <NavLink to='/dashboard/propertyBought' className="navItem flex gap-1 justify-start  items-center">  <MdOutlineSell></MdOutlineSell> Property bought</NavLink>
                                            <NavLink to='/dashboard/myReviews' className=" navItem flex gap-1 justify-start  items-center">  <MdPreview></MdPreview> My Reviews</NavLink>
                                        </div>
                                        {/* admin navbar */}
                                        <div id="activeList" className="gap-y-2" >
                                            <NavLink to='/dashboard/profile' className="navItem flex gap-1 justify-start  items-center">  <FaHome className="text-black text-xl"></FaHome> Admin Profile </NavLink>
                                            <NavLink to='/dashboard/manageProperties' className="navItem flex gap-1 justify-start  items-center">  <GrUserManager className="text-black text-xl"></GrUserManager> Manage Properties</NavLink>
                                            <NavLink to='/dashboard/manageUsers' className="navItem flex gap-1 justify-start  items-center">  <FaUsersGear className="text-black text-xl"></FaUsersGear> Manage Users</NavLink>
                                            <NavLink to='/dashboard/manageReviews' className=" navItem flex gap-1 justify-start  items-center">  <MdManageSearch className="text-black text-xl"></MdManageSearch> Manage reviews</NavLink>
                                        </div>
                                        {/* agent navbar */}
                                        <div id="activeList" className="gap-y-4 text-sm" >
                                            <NavLink to='/dashboard/profile' className="navItem flex gap-1 justify-start   items-center">  <FaHome className="text-black text-xl"></FaHome> Agent Profile </NavLink>

                                            <NavLink to='/dashboard/addProperties' className="navItem flex gap-1 justify-start   items-center"> <IoMdAdd className="text-black text-xl"></IoMdAdd> Add Properties </NavLink>

                                            <NavLink to='/dashboard/addedProperties' className="navItem my-3 flex gap-1 justify-start  items-center">  <GrUserManager className="text-black text-xl"></GrUserManager> My Added Properties</NavLink>

                                            <NavLink to='/dashboard/soldProperties' className="navItem flex gap-1 justify-start  items-center">  <FaUsersGear className="text-black text-xl"></FaUsersGear> My Sold Properties</NavLink>

                                            <NavLink to='/dashboard/requestedProperties' className=" navItem my-3 flex gap-1 justify-start  items-center">  <MdManageSearch className="text-black text-xl"></MdManageSearch> Requested Properties</NavLink>
                                        </div>

                                        <Divider sx={{ my: 6 }} variant="middle" />
                                        <div>
                                            <NavLink to={'/'}> <button className="hover:text-[black]"> Go to Home</button></NavLink>
                                        </div>
                                    </div>


                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* for small device */}

                    <div className="bg-orange-400 hidden lg:block w-32 pt-10 lg:w-64 text-white min-h-screen  font-semibold">
                        <div className="ml-3 lg:mx-10 mt-10">
                            {/* user navbar */}
                            <div id="activeList">
                                <NavLink to='/dashboard/profile' className="navItem flex gap-1 justify-start  items-center">  <FaHome></FaHome> My Profile </NavLink>
                                <NavLink to='/dashboard/wishlist' className="navItem flex gap-1 justify-start  items-center">  <FaHeart></FaHeart> Wishlist</NavLink>
                                <NavLink to='/dashboard/propertyBought' className="navItem flex gap-1 justify-start  items-center">  <MdOutlineSell></MdOutlineSell> Property bought</NavLink>
                                <NavLink to='/dashboard/myReviews' className=" navItem flex gap-1 justify-start  items-center">  <MdPreview></MdPreview> My Reviews</NavLink>
                            </div>
                            {/* admin navbar */}
                            <div id="activeList" className="gap-y-2" >
                                <NavLink to='/dashboard/profile' className="navItem flex gap-1 justify-start  items-center">  <FaHome className="text-black text-xl"></FaHome> Admin Profile </NavLink>
                                <NavLink to='/dashboard/manageProperties' className="navItem flex gap-1 justify-start  items-center">  <GrUserManager className="text-black text-xl"></GrUserManager> Manage Properties</NavLink>
                                <NavLink to='/dashboard/manageUsers' className="navItem flex gap-1 justify-start  items-center">  <FaUsersGear className="text-black text-xl"></FaUsersGear> Manage Users</NavLink>
                                <NavLink to='/dashboard/manageReviews' className=" navItem flex gap-1 justify-start  items-center">  <MdManageSearch className="text-black text-xl"></MdManageSearch> Manage reviews</NavLink>
                            </div>
                            {/* agent navbar */}
                            <div id="activeList" className="gap-y-4 text-sm" >
                                <NavLink to='/dashboard/profile' className="navItem flex gap-1 justify-start   items-center">  <FaHome className="text-black text-xl"></FaHome> Agent Profile </NavLink>

                                <NavLink to='/dashboard/addProperties' className="navItem flex gap-1 justify-start   items-center"> <IoMdAdd className="text-black text-xl"></IoMdAdd> Add Properties </NavLink>

                                <NavLink to='/dashboard/addedProperties' className="navItem my-3 flex gap-1 justify-start  items-center">  <GrUserManager className="text-black text-xl"></GrUserManager> My Added Properties</NavLink>

                                <NavLink to='/dashboard/soldProperties' className="navItem flex gap-1 justify-start  items-center">  <FaUsersGear className="text-black text-xl"></FaUsersGear> My Sold Properties</NavLink>

                                <NavLink to='/dashboard/requestedProperties' className=" navItem my-3 flex gap-1 justify-start  items-center">  <MdManageSearch className="text-black text-xl"></MdManageSearch> Requested Properties</NavLink>
                            </div>

                            <Divider sx={{ my: 6 }} variant="middle" />
                            <div>
                                <NavLink to={'/'}> <button className="hover:text-[black]"> Go to Home</button></NavLink>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex-1  lg:ml-10">
                    <Outlet></Outlet>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;