import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Avatar } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { GiSelfLove } from "react-icons/gi";


const PropertiesDetails = () => {

    const { id } = useParams()
    console.log(id);
    const axiosPublic = useAxiosPublic()

    const { data: property = [] } = useQuery({
        queryKey: ["property"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/property/${id}`)
            return res.data
        }
    })
    console.log(property);

    // get review
    const axiosPublic = useAxiosPublic()
    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get('http://localhost:5000/reviews')
            return res.data

        }
    })

    console.log(reviews.length);


    return (
        <div className="mt-20">
            <SectionTitle title={"Property Details"}></SectionTitle>
            <div className="flex w-full justify-center items-center px-10">
                <div className="">
                    <div>
                        <img className="w-full  h-[60vh]" src={property?.image} alt="" />
                    </div>
                    <div className="my-4 bg-[#F4F4F4] flex flex-col lg:flex-row justify-evenly items-center">
                        <div className="  lg:w-1/2 text-center px-3">

                            <h2 className="text-2xl font-semibold ">{property?.title}</h2>
                            <p className="flex justify-center items-center"> <span className="text-red-600 text-2xl"> <CiLocationOn></CiLocationOn> </span> {property?.location}</p>
                            <p className="font-semibold text-[#F2561B]"> ${property?.minimumPrice}-${property?.maximumPrice} </p>
                        </div>
                        <div className=" lg:w-1/2">
                            <div className="flex flex-col justify-between items-center">
                                <Avatar
                                    alt="Remy Sharp"
                                    src={property?.agentImage}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <span className="font-semibold"> Agent Name: {property?.agentName} </span>
                                <div className="w-full my-2">
                                    <button className="w-full btn border-2 border-[#F2561B] hover:text-white hover:bg-[#F2561B]">Add to Wishlist <GiSelfLove className="text-red-600 text-2xl"></GiSelfLove> </button>
                                </div>
                            </div>

                        </div>


                    </div>

                    <div className="my-8  bg-[#F4F4F4] flex flex-col items-center justify-center">
                        <h3 className="text-3xl mt-6 font-semibold text-center my-3">Details</h3>
                        <hr className="bg-slate-500 w-[20%] h-[2px] text-center " />
                        <p className="my-5 p-3"> {property?.description} </p>

                    </div>
                </div>

            </div>

            <div>

            </div>

        </div>
    );
};

export default PropertiesDetails;