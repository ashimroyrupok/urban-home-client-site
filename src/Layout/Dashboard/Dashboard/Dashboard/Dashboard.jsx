import { FaHeart, FaHome } from "react-icons/fa";
import { MdOutlineSell, MdPreview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css"

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="bg-orange-400 w-64 text-white min-h-screen  font-semibold">
                <div className=" mx-10 mt-10">
                    <div id="activeList">
                        <NavLink  to='/dashboard/profile' className="navItem flex gap-1 justify-start  items-center">  <FaHome></FaHome> My Profile </NavLink>
                        <NavLink to='/dashboard/wishlist' className="navItem flex gap-1 justify-start  items-center">  <FaHeart></FaHeart> Wishlist</NavLink>
                        <NavLink to='/dashboard/propertyBought' className="navItem flex gap-1 justify-start  items-center">  <MdOutlineSell></MdOutlineSell> Property bought</NavLink>
                        <NavLink to='/dashboard/myReviews' className=" navItem flex gap-1 justify-start  items-center">  <MdPreview></MdPreview> My Reviews</NavLink>
                    </div>
                </div>
            </div>

            <div className="flex-1 ml-10">

                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;