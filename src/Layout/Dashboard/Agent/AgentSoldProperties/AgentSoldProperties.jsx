import { Toaster } from "react-hot-toast";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AgentSoldProperties = () => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data :soldProperties=[]} = useQuery({
        queryKey: ["soldProperties", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sold/agent/${user?.email}`)
            return res.data
        }
    })

    console.log(soldProperties);

    // })

    return (
        <div>

            <div className="overflow-x-auto   h-[60vh] my-10 max-w-5xl mx-auto ">

                <SectionTitle title="Manage Properties"></SectionTitle>

                <table className="table overflow-x-auto  text-black">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-black  text-sm lg:text-xl" >Property Title</th>
                            <th className="text-black  text-sm lg:text-xl"> Location </th>
                            <th className="text-black  text-sm lg:text-xl">Buyer Name</th>
                            <th className="text-black  text-sm lg:text-xl"> Buyer Email</th>
                            <th className="text-black  text-sm lg:text-xl">  Sold Price  </th>
                        </tr>
                    </thead>

                    {
        soldProperties?.map(item => <tbody key={item._id}>
            <tr className=" ">
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

            </tr>
        </tbody>)
    }

                </table>




                <Toaster></Toaster>
            </div>

        </div>
    );
};

export default AgentSoldProperties;