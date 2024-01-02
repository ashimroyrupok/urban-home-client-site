import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (

        <div >
            <Navbar></Navbar>
            <Outlet></Outlet>
            <div className="w-full text-center mx-auto my-10">
                <Footer></Footer>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
        </div>

    );
};

export default MainLayout;