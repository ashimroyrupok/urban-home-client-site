import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import animate from "../../../public/Animation.json"
import Lottie from "lottie-react";


const api_key =import.meta.env.IMAGE_HOSTING_API_KEY;
console.log(api_key);
const hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`

const SignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = data => {
        console.log(data);
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
                    </div>
                    {/* <div className="inline-flex items-center">
                        <label
                            className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                            data-ripple-dark="true"
                        >
                            <input
                                type="checkbox"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                id="checkbox"
                            />
                            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    ></path>
                                </svg>
                            </span>
                        </label>
                        <label
                            className="mt-px cursor-pointer select-none font-light text-gray-700"
                        >
                            <p className="flex items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                                I agree the
                                <a
                                    className="font-medium transition-colors hover:text-pink-500"
                                    href="#"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </p>
                        </label>
                    </div> */}
                    <button
                        className="mt-11 bg-[#F2561B] block w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit"
                        data-ripple-light="true"
                    >
                        Register
                    </button>
                    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                        Already have an account?
                        <Link
                            className="font-medium text-[#F2561B] transition-colors hover:text-blue-700"
                            href="#"
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