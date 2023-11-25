import { Link } from "react-router-dom";
import ErrorAnimation from "../../../public/Error-Animation.json"
import Lottie from "lottie-react";

const ErrorPage = () => {
    return (
        <div className="   mt-10">

            <div className="flex justify-center h-[60vh] items-center">
                {/* <img src="https://i.ibb.co/JqLqWBn/404.webp" alt="" /> */}
                <Lottie animationData={ErrorAnimation}></Lottie>
            </div>


            <Link className="text-4xl flex my-7 items-center justify-center mt-4 " to={'/'}>
                <button className="px-4 py-2 rounded-sm text-white  bg-[#F2561B] hover:bg-red-600">Go Home</button>
            </Link>

        </div>
    );
};

export default ErrorPage;