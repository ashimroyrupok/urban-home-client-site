
const ManageUsers = () => {
    return (
        <div>

            <div className="overflow-x-auto dark:bg-black dark:text-white   h-[60vh] my-10 max-w-5xl mx-auto text-white ">

                <div className=" w-full text-black justify-end flex">

                </div>

                <table className="table text-black">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-black dark:text-white  text-xl" >User name</th>
                            <th className="text-black dark:text-white  text-xl"> User Email </th>
                            <th className="text-black dark:text-white  text-xl">Make admin button</th>
                            <th className="text-black dark:text-white  text-xl"> Make Agent button </th>
                            <th className="text-black dark:text-white  text-xl">  Mark as fraud button </th>
                            <th className="text-black dark:text-white  text-xl"> Delete </th>
                        </tr>
                    </thead>

                    {
                        // BidData?.map(item => <tbody key={item._id}>
                        //     <tr className="dark:text-white ">
                        //         <td>

                        //             {item?.jobTitle}
                        //         </td>
                        //         <td>
                        //             {item?.clientEmail}

                        //         </td>
                        //         <td>  {item?.deadline} </td>
                        //         <th>
                        //             {
                        //                 item?.status === "In progress" || item?.status === "Rejected" ?
                        //                     <div>
                        //                         {
                        //                             item?.status === "In progress" ? <div className="flex flex-col gap-1">
                        //                                 <ProgressBar
                        //                                     percent={50}
                        //                                     filledBackground="linear-gradient(to right, #FF0000, #008000)"
                        //                                 />
                        //                                 <button onClick={() => handleComplete(item?._id)} className="px-2 py-1  text-white bg-success mx-auto">Complete</button>
                        //                             </div> : <span className="font-bold text-error"> Canceled</span>
                        //                         }
                        //                     </div>
                        //                     :
                        //                     <div>
                        //                         {
                        //                             item?.status === "complete" ?
                        //                                 <div>
                        //                                     <ProgressBar
                        //                                         percent={100}
                        //                                         filledBackground="linear-gradient(to right, #FF0000, #008000)"
                        //                                     />
                        //                                 </div>

                        //                                 :
                        //                                 <button className="btn btn-primary btn-xs">Pending</button>
                        //                         }
                        //                     </div>

                        //             }
                        //         </th>
                        //     </tr>
                        // </tbody>)
                    }

                </table>




                {/* <Toaster></Toaster> */}
            </div>

        </div>
    );
};

export default ManageUsers;