import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const AllProperties = () => {
    const axiosPublic = useAxiosPublic()
    const { data: properties = [] } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await axiosPublic.get('/properties/verified')
            return res.data
        }
    })
    console.log(properties);
    return (
        <div className="mt-20">

            <div>
                <SectionTitle title={"Featured"}></SectionTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl pr-4 mx-auto lg:grid-cols-4">
                {
                    properties.map(item => <Card key={item?._id} sx={{ maxWidth: "380px", pl: "10px", mx: "auto", position: "relative" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i.ibb.co/LhjNsh3/images-q-tbn-ANd9-Gc-Swu-IN5i3-GKx-Iid-XKBye89y-Gp-MY2-Nslx-Mzw-Q-usqp-CAU.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <p className="font-semibold my-1">{item?.title}</p>
                                <p className="flex text-sm text-slate-500"> <span>   <CiLocationOn /> </span> {item?.location} </p>


                                <div className="flex flex-col justify-between items-center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={item?.agentImage}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <span> {item?.agentName} </span>
                                </div>

                                <p className="text-[#F2561B] font-semibold text-[14px]"> $ {item?.minimumPrice}-${item?.maximumPrice} </p>
                                <Typography
                                    sx={{
                                        fontSize: "18px", position: "absolute", px: "3px", py: "1px",
                                        backgroundColor: "#F2561B", color: "white", top: "2%", right: "0%"
                                    }}
                                    gutterBottom variant="h6" component="div">
                                    For Sale
                                </Typography>
                                <button className="btn btn-success btn-sm text-white absolute top-[2%] left-[2%]"
                                    >
                                   {item?.status}
                                </button>
                            </CardContent>
                        </CardActionArea>
                        <div className="flex justify-between items-center  w-full ">
                            <p className="text-green-600">  </p>
                            <button className="py-2 px-4 mr-3 mb-3 flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]"> <Link to={`/properties-Details/${item?._id}`}>Details</Link> <FaArrowRight /></button>
                        </div>
                    </Card>)
                }
            </div>

        </div>
    );
};

export default AllProperties;