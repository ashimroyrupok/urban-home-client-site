import toast, { Toaster } from "react-hot-toast";
import SectionTitle from "../../../../../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@mui/material";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertiseProperty = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const { data: allVerified = [], refetch } = useQuery({
        queryKey: ['allVerified'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/properties/verified');
            return data;
        }
    })



    const { data: advertisement = [],refetch:loading } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/properties/advertisement');
            // console.log(data);
            return res.data;
        }
    })

    console.log(advertisement);


    // make advertise ,

    const handleAdvertise = async (item) => {
        if (advertisement.length < 6) {
            const res = await axiosSecure.patch(`/propertise/advertise/${item?._id}`, { advertised: true })
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                refetch()
                loading()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Advertised make successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        else {
            toast.error("Your advertise limit finished")
        }
    }

    const handleRemoveAdvertise = async (item) => {
        const res = await axiosSecure.patch(`/propertise/advertise/${item?._id}`, { advertised: false })
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch()
            loading()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Advertised remove successful",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    // console.log(allVerified);
    return (
        <div>



                <SectionTitle title={"Manage Advertise"}></SectionTitle>
            <div className="overflow-x-auto overflow-y-auto mx-auto  h-[80vh] my-10 w-96 lg:w-[1020px]     ">


                <table className="table overflow-x-auto  text-black">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-black  text-sm lg:text-xl" >Property Image</th>
                            <th className="text-black  text-sm lg:text-xl"> Title </th>
                            <th className="text-black  text-sm lg:text-xl"> Price Range </th>
                            <th className="text-black  text-sm lg:text-xl"> Agent Name </th>
                            <th className="text-black  text-sm lg:text-xl">  Mange Advertise  </th>

                        </tr>
                    </thead>

                    {
                        allVerified?.map((item, idx) => <tbody key={item._id}>
                            <tr className=" ">
                                <td>
                                    {idx + 1}
                                </td>
                                <td>

                                    <Avatar
                                        alt="Remy Sharp"
                                        src={item?.image}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                </td>
                                <td>
                                    {item?.title}

                                </td>
                                <td>
                                    ${item?.minimumPrice}-${item?.maximumPrice}

                                </td>
                                <td>
                                    {
                                        item?.agentName
                                    }

                                </td>
                                <td>
                                    {item?.advertised === true ? <button onClick={() => handleRemoveAdvertise(item)} className="btn btn-sm text-red-600 btn-outline ">Remove Advertise</button>
                                        :
                                        <button onClick={() => handleAdvertise(item)} className="btn  btn-outline btn-sm text-green-600"> Advertise </button>

                                    }
                                </td>

                            </tr>
                        </tbody>)
                    }

                </table>




                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>

        </div>
    );
};

export default AdvertiseProperty;