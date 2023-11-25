import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const MainLayout = () => {
    return (

        <div >
            <Navbar></Navbar>
            <Outlet></Outlet>
            <div className="w-full text-center mx-auto my-10">
                <Footer></Footer>
            </div>
        </div>

    );
};

export default MainLayout;