import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className=" bg-[#F7F8FA] ">
      <Navbar />

      <Outlet />

      <div className="w-full text-center mx-auto mt-10">
        <Footer></Footer>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default MainLayout;
