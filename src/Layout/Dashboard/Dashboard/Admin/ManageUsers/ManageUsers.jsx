import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import SectionTitle from "../../../../../Shared/SectionTitle/SectionTitle";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }

    })

    // console.log(isLoading, "heyyeyee");

    // delete users
    const handleDeleteUser = email => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${email}`)
                    .then(res => {
                        console.log(res.data);
                        refetch()
                        toast.success(`${email} deleted successful`)
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });


    }

    // make admin 
    const handleAdmin = email => {
        axiosSecure.patch(`/users/${email}`, { role: "admin" })
            .then(res => {
                console.log(res.data);
                refetch()
                toast.success(`${email} make admin successful`)

            })
    }
    // make agent
    const handleAgent = email => {
        axiosSecure.patch(`/users/${email}`, { role: "agent" })
            .then(res => {
                console.log(res.data);
                refetch()
                toast.success(`${email} make agent successful`)

            })
    }

    // make fraud
    const handleFraud = email => {

        axiosSecure.patch(`/users/${email}`, { role: "fraud" })
            .then(res => {
                console.log(res.data);
                refetch()
                toast.error(`${email} make fraud successful`)

            })
    }


    console.log(users);
    return (
        <div>

            <SectionTitle title={"Manage User"}></SectionTitle>

            <div className="overflow-x-auto   h-[60vh] my-10 max-w-2xl lg:max-w-5xl mx-auto text-white ">

                <table className="table overflow-x-auto  text-black">
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
                                    {
                                        item?.role === "fraud" ? <p className="text-red-500">Fraud</p> :
                                            <div>
                                                {item?.role == "admin" ? <p className="text-green-600">admin</p> : <button onClick={() => handleAdmin(item?.email)} className="btn btn-outline text-green-600">
                                                    Make Admin
                                                </button>}
                                            </div>
                                    }

                                </td>
                                <td>
                                    {
                                        item?.role === "fraud" ? <p className="text-red-600">Fraud</p> :
                                            <div>
                                                {item?.role === "agent" ? <p className="text-green-600">agent</p> : <button onClick={() => handleAgent(item?.email)} className="btn btn-outline text-green-600">
                                                    Make Agent
                                                </button>}
                                            </div>
                                    }

                                </td>
                                <td>
                                    {item?.role === "fraud" ? <p className="text-red-600">Fraud</p>
                                        :
                                        <button onClick={() => handleFraud(item?.email)} className="btn btn-outline text-red-600">Fraud</button>}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(item?.email)} className="btn btn-error"> X </button>
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

export default ManageUsers;