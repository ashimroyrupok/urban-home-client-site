import { Toaster } from "react-hot-toast";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";

const AgentSoldProperties = () => {
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

                    {/* {
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

            </tr>
        </tbody>)
    } */}

                </table>




                <Toaster></Toaster>
            </div>

        </div>
    );
};

export default AgentSoldProperties;