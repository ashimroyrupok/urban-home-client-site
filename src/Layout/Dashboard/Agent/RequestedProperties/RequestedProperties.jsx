import toast, { Toaster } from "react-hot-toast";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";

const RequestedProperties = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: soldList = [], refetch } = useQuery({
        queryKey: ["soldList", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/soldList')
            return res.data
        }
    })

    const handleAcceptRequest = async (id) => {
        const res = await axiosSecure.patch(`/soldList/${id}`, { status: 'accepted' })
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Request Accepted");
        }
    }

    const handleRejecttRequest = async (id) => {
        console.log(id);
        const res = await axiosSecure.patch(`/soldList/${id}`, { status:'rejected' })
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            refetch()
            toast.success("Request Rejected");
        }
    }

    console.log(soldList);
    return (
        <div>

            <div className="overflow-x-auto   h-[60vh] my-10 max-w-5xl mx-auto ">

                <SectionTitle title="Manage Properties"></SectionTitle>

                <table className="table overflow-x-auto overflow-y-auto text-black">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-black  text-sm lg:text-xl" >Property Title</th>
                            <th className="text-black  text-sm lg:text-xl"> Location </th>
                            <th className="text-black  text-sm lg:text-xl">Buyer Name</th>
                            <th className="text-black  text-sm lg:text-xl"> Buyer Email</th>
                            <th className="text-black  text-sm lg:text-xl">  Price  </th>
                            <th className="text-black  text-sm lg:text-xl"> Status </th>
                        </tr>
                    </thead>

                    {
                        soldList?.map((item, idx) => <tbody key={item._id}>
                            <tr className=" ">
                                <td>
                                    {idx + 1}
                                </td>
                                <td>

                                    {item?.propertyTitle}
                                </td>
                                <td>
                                    {item?.location}

                                </td>
                                <td>
                                    {item?.buyerName}

                                </td>
                                <td>
                                    {
                                        item?.buyerEmail
                                    }

                                </td>
                                <td>
                                    {item?.offeredPrice}
                                </td>
                                <td>
                                    <div className="flex  justify-center items-center gap-2">
                                        {
                                            item?.status === 'accepted' || item?.status === "rejected" ? <div>
                                                {item?.status === 'accepted' ? <span className="text-green-600">Accepted</span> : <span className="text-red-600"> Rejected</span>}
                                            </div> : <div className="flex  justify-center items-center gap-2" >
                                                <button onClick={() => handleAcceptRequest(item?._id)} className="btn btn-sm text-white btn-success"> Accept </button>
                                                <button onClick={() => handleRejecttRequest(item?._id)} className="btn btn-sm text-white btn-error"> Reject </button>
                                            </div>
                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>)
                    }

                </table>




                <Toaster></Toaster>
            </div>

        </div>
    );
};

export default RequestedProperties;