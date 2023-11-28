import { Avatar, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Wishlist = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: wishlists = [], refetch } = useQuery({
        queryKey: ['wishlists', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wishlists/${user?.email}`)
            return res.data
        }

    })

    // console.log(wishlists);
    // handle remove wishlists
    const handleRemove = async (data) => {
        console.log(data);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/wishlists/${data?._id}`)
                console.log(res);
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Wish has been deleted.",
                        icon: "success"
                    });

                }

            }
        });


    }

    return (
        <div className="mt-16">

            <SectionTitle title={"Your Wishlist"}></SectionTitle>

            <div >
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-5 my-12 mx-auto lg:grid-cols-4">
                    {wishlists?.map(wish => <Card key={wish?._id} sx={{ maxWidth: "380px", mx: "auto", position: "relative" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={wish?.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <p className="text-[18px]"> {wish?.title} </p>
                                <p className="flex text-sm text-slate-500"> <span>   <CiLocationOn /> </span> {wish?.location} </p>

                                <p className="text-[#F2561B] font-semibold my-1 text-[16px]"> $  {wish?.minimumPrice} -$ {wish?.maximumPrice} </p>

                                <div className="flex flex-col justify-between items-center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={wish?.agentImage}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <span>  {wish?.agentName} </span>
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
                                {/* <Typography
                                    sx={{
                                        fontSize: "18px", position: "absolute", px: "3px", py: "1px",
                                        backgroundColor: "#F2561B", color: "white", top: "2%", left: "0%"
                                    }}
                                    gutterBottom variant="h6" component="div">
                                    
                                </Typography> */}
                            </CardContent>
                        </CardActionArea>
                        <div className="flex justify-between  items-center gap-3 w-full ">
                            <button onClick={() => handleRemove(wish)} className="btn  w-[35%] text-white btn-error">
                                Remove
                            </button>
                            <button className="btn   mr-1 duration-300  flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]"> <Link to={`/buyNow/${wish?._id}`}>Make an Offer</Link> <FaArrowRight /></button>
                        </div>
                    </Card>)}
                </div>
            </div>

        </div>
    );
};

export default Wishlist;