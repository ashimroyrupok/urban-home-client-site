import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";

const AgentAddedProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: properties = [], refetch } = useQuery({
        queryKey: ["properties", user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/properties/${user?.email}`)
            return res.data
        }
    })

    // delete property
    const handleDelete = async (data) => {
        console.log(data);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( async(result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/properties/${data._id}`)
                console.log(res.data);
                if (res.data.deletedCount === 1) {
                    refetch()
                    toast.success(`${data?.title} deleted successful`)
                }


            }
        });


    }

    // handle update
    const handleUpdate = data => {
        console.log(data);
    }

    console.log(properties);
    return (
        <div>

            <SectionTitle title={"My added Property"}></SectionTitle>

            <div className="grid grid-cols-1 pr-3 md:grid-cols-2 max-w-7xl gap-5 my-12 mx-auto lg:grid-cols-4">
                {
                    properties?.map(item => <Card key={item?._id} sx={{ maxWidth: "380px", mx: "auto", position: "relative" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item?.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <p className="text-[18px]"> {item?.title} </p>
                                <p className="flex text-sm text-slate-500"> <span>   <CiLocationOn /> </span> {item?.location} </p>

                                <p className="text-[#F2561B] font-semibold my-1 text-[16px]"> $ {item?.minimumPrice}-${item?.maximumPrice} </p>

                                <div className="flex flex-col justify-between items-center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={item?.agentImage}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <span> {item?.agentName} </span>
                                </div>

                                {/* badge */}
                                <Typography
                                    sx={{
                                        fontSize: "18px", position: "absolute", px: "3px", py: "1px",
                                        backgroundColor: "#F2561B", color: "white", top: "2%", right: "0%"
                                    }}
                                    gutterBottom variant="h6" component="div">
                                    For Sale
                                </Typography>
                                <div className="absolute top-[2%] left-0">

                                    {item?.status ? <div>
                                        {
                                            item?.status === "verified" ? <button className="bg-[#F2561B] btn btn-sm text-white"> {item?.status} </button> : <button className="btn btn-sm btn-error text-white"> {item?.status} </button>}

                                    </div> : <span className="btn btn-sm btn-primary">pending </span>}
                                </div>
                            </CardContent>
                        </CardActionArea>
                        <div className="flex justify-between  items-center py-1 gap-3 w-full ">
                            <Button onClick={() => handleDelete(item)} variant="outlined" color="error">
                                Delete
                            </Button>


                            {
                                item.status === "rejected" ? <button className="py-1 px-4 mr-1 duration-300 opacity-30 hover:bg-white hover:text-[#F2561B] flex gap-1 justify-end border  text-[#F2561B] border-[#F2561B]">Update</button> :
                                    <button onClick={() => handleUpdate(item)} className="py-1 px-4 mr-1 duration-300 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#F2561B] flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]">
                                        <Link to={`updateProperty/${item?._id}`}>Update </Link>
                                    </button>
                            }

                        </div>
                    </Card>)
                }
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default AgentAddedProperties;