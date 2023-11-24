import { Button, TextField } from "@mui/material";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import animate from "../../../public/Animation.json"


const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = data => {
        console.log(data);
    }


    return (
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:h-[80vh] w-full">
            <div className="lg:w-1/2   ">

                <Lottie animationData={animate}></Lottie>

            </div>

            <div className="card shrink-0 w-full lg:w-1/2 p-6 max-w-sm shadow-2xl bg-base-100">
                <h3 className="text-3xl text-center font-bold my-4">Login Now</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-y-4">
                    <div className="">
                        <TextField
                            // required
                            // focused
                            id="outlined-required"
                            label="Your Email"
                            name="email"
                            type="email"
                            sx={{ width: '100%', borderRadius: '10px' }}
                            {...register("email", { required: true })}
                        />
                        {errors.email && <h3 className="text-red-600"> This field is required </h3>}
                    </div>
                    <div className="">
                        <TextField
                            // required
                            id="outlined-required"
                            label="Your Password"
                            name="password"
                            type="password"
                            sx={{ width: '100%', borderRadius: '10px' }}
                            {...register("password", { required: true })}
                        />
                        {errors.password && <h5 className="text-red-600"> This field is required </h5>}
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <button className="px-4 py-3 w-full text-white font-semibold  rounded-lg bg-[#F2561B] hover:bg-orange-400">Login</button>
                    </div>
                    <div >
                        <h2 className="text-center">New in ? < Link to='/signUp' className="text-[#F2561B]"> Sign Up </Link> </h2>
                    </div>
                    <div className="w-full flex flex-col ">
                        <Button sx={{
                            // borderColor:"#F2561B"
                        }} variant="outlined"> <GoogleIcon sx={{color:'red'}} ></GoogleIcon> Sign in with Google </Button>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default LoginPage;