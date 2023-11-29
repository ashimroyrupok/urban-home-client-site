import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { Spa } from "@mui/icons-material";

const ManagePropertise = () => {

    const axiosSecure = useAxiosSecure()

    const { data: properties = [], refetch } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await axiosSecure.get('/properties',)
            return res.data;
        }

    })

    const handleVerify = async (data) => {
        console.log(data);
        const res = await axiosSecure.patch(`/properties/${data._id}`, { status: "verified" })
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            console.log("hello");
            refetch()
        }
    }
    const handleRejected = async (data) => {
        console.log(data);
        const res = await axiosSecure.patch(`/properties/${data._id}`, { status: "rejected" })
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
            console.log("hello");
            refetch()
        }
    }

    console.log(properties);
    return (
        <div>

            <div className="overflow-x-auto overflow-y-auto w-96 lg:w-[1020px]  dark:bg-black dark:text-white   h-[80vh] my-10 max-w-5xl mx-auto text-white ">

        

                <table className="table text-black">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-black dark:text-white  text-xl" >Property Title</th>
                            <th className="text-black dark:text-white  text-xl">  Property location </th>
                            <th className="text-black dark:text-white  text-xl">Agent Name</th>
                            <th className="text-black dark:text-white  text-xl">Agent Email</th>
                            <th className="text-black dark:text-white  text-xl"> Price Range</th>
                            <th className="text-black dark:text-white  text-xl"> Status </th>
                        </tr>
                    </thead>

                    {
                        properties?.map(item => <tbody key={item._id}>
                            <tr className="dark:text-white ">
                                <td>
                                    {item?.title}
                                </td>
                                <td>
                                    {item?.location}
                                </td>
                                <td>  {item?.agentName} </td>
                                <td>  {item?.agentEmail} </td>
                                <td>  ${item?.minimumPrice}-${item?.maximumPrice} </td>
                                <th>
                                    {
                                        item?.status === "In progress" || item?.status === "Rejected" ?
                                            <div>
                                                {

                                                }
                                            </div>
                                            :
                                            <div>
                                                {
                                                    item?.status === "verified" || item?.status === "rejected" ?
                                                        <div>

                                                            {
                                                                item?.status === "verified" ? <span className="text-green-600"> verified</span>: <span className="text-red-600">Rejected</span>
                                                            }

                                                        </div>
                                                        :
                                                        <div className="flex justify-center items-center gap-1">
                                                            <button onClick={() => handleVerify(item)} className="btn btn-sm btn-primary">Verify</button>
                                                            <button onClick={() => handleRejected(item)} className="btn btn-sm btn-error text-white">Reject</button>

                                                        </div>
                                                }

                                            </div>

                                    }
                                </th>
                            </tr>
                        </tbody>)
                    }

                </table>




                {/* <Toaster></Toaster> */}
            </div>

        </div>
    );
};

export default ManagePropertise;