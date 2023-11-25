import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [],refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }

    })

    const handleDeleteUser = email => {



        axiosSecure.delete(`/users/${email}`)
        .then(res => {
            console.log(res.data);
            refetch()
        })
        
    }

    console.log(users);
    return (
        <div>

            <div className="overflow-x-auto   h-[60vh] my-10 max-w-5xl mx-auto text-white ">

                <div className=" w-full text-black justify-end flex">

                </div>

                <table className="table text-black">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-black  text-sm lg:text-xl" >User name</th>
                            <th className="text-black  text-sm lg:text-xl"> User Email </th>
                            <th className="text-black  text-sm lg:text-xl">Make admin button</th>
                            <th className="text-black  text-sm lg:text-xl"> Make Agent button </th>
                            <th className="text-black  text-sm lg:text-xl">  Mark  Fraud  </th>
                            <th className="text-black  text-sm lg:text-xl"> Delete </th>
                        </tr>
                    </thead>

                    {
                        users?.map(item => <tbody key={item._id}>
                            <tr className=" ">
                                <td>

                                    {item?.name}
                                </td>
                                <td>
                                    {item?.email}

                                </td>
                                <td>
                                    <button className="btn btn-outline text-green-600">Make Admin</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline text-green-600">Make Agent</button>
                                </td>
                                <td>
                                    <button className="btn btn-outline text-red-600">Fraud</button>
                                </td>
                                <td>
                                    <button onClick={()=> handleDeleteUser(item?.email)} className="btn btn-error"> X </button>
                                </td>
                            </tr>
                        </tbody>)
                    }

                </table>




                {/* <Toaster></Toaster> */}
            </div>

        </div>
    );
};

export default ManageUsers;