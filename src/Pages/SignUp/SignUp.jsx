import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import animate from "../../../public/Animation.json"
import Lottie from "lottie-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useEffect } from "react";


const api_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
console.log(api_key);
const hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`

const SignUp = () => {

    const {user,createUser} = useAuth()
    // console.log(data);

    const axiosPublic = useAxiosPublic()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data);

        const imageFile = { image: data.image[0] }
        // console.log(imageFile);
        const res = await axiosPublic.post(hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        })

        if(res.data.success){
            const dataInfo = {
                email: data.email,
                password: data.password,
                image: res.data.data.display_url
            }

            console.log(dataInfo);


            const response = await axiosPublic.post('/users' ,dataInfo )

            // fetch('http://localhost:5000/users' , {
            //     method: 'POST',
            //     headers: {
            //         "content-type": "application/json"
            //     },
            //     body: JSON.stringify(dataInfo)
                
                
            // })

            console.log(response.data);
            // 
            // createUser(data.email,data.password)
            // .then(res => {
            //     console.log(res);
            // })
            // .catch(err => {
            //     console.log(err);
            // })

        }
        console.log(res.data);

    }

    return (
        <div className="flex  flex-col lg:flex-row items-center justify-center my-7 lg:my-28">

            <div className="lg:w-1/2   ">

                <Lottie animationData={animate}></Lottie>

            </div>

            <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-xl p-5">
                <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Sign Up
                </h4>
                <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                    Enter your details to register.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-10">
                        <div className="relative h-11 w-full min-w-[200px]">
                            <div className="">
                                <TextField
                                    // required
                                    id="outlined-required"
                                    label="Your Name"
                                    name="name"
                                    type="text"
                                    placeholder="your name"
                                    sx={{ width: '100%', borderRadius: '10px' }}
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <h5 className="text-red-600"> This field is required </h5>}
                            </div>
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
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
                        </div>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <div className="">
                                <TextField
                                    // required
                                    id="outlined-required"
                                    label="Your Password"
                                    name="password"
                                    type="password"
                                    sx={{ width: '100%', borderRadius: '10px' }}
                                    {...register("password", { required: true, minLength: 6, maxLength: 12, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}/ })}
                                />
                                {errors.password?.type === "required" && <h5 className="text-red-600"> This field is required </h5>}
                                {errors.password?.type === 'minLength' && <h5 className="text-red-600">Password must be 6 character</h5>}
                                {errors.password?.type === 'maxLength' && <h5 className="text-red-600">Password cannot greater then 12</h5>}
                                {errors.password?.type === 'pattern' && <h5 className="text-red-600"> must be  capital,small letter and special character </h5>}
                            </div>
                        </div>
                        <div className="relative h-11 w-full my-2 min-w-[200px]">
                            <div className="">
                                <TextField
                                    id="outlined-required"
                                    name="image"
                                    type="file"
                                    sx={{ width: '100%', borderRadius: '10px' }}
                                    {...register("image", { required: true })}
                                />
                                {errors.image && <h5 className="text-red-600"> This field is required </h5>}

                            </div>
                        </div>
                    </div>

                    <button
                        className="mt-11 bg-[#F2561B] block w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                        data-ripple-light="true"
                    >
                        Register
                    </button>
                    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                        Already have an account?
                        <Link to='/login'
                            className="font-medium text-[#F2561B] transition-colors hover:text-blue-700"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>

        </div>
    );
};

export default SignUp;