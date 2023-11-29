import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";




const Featured = () => {
    const axiosPublic = useAxiosPublic()

    const { data: advertisement = [] } = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/properties/advertisement');
            // console.log(data);
            return res.data;
        }
    })

    console.log(advertisement);

    return (
        <div className="my-10">
            <div>
                <SectionTitle title={"Advertise Section"}></SectionTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 max-w-7xl mx-auto lg:grid-cols-4">
                {
                    advertisement?.map(item => <Card key={item?._id} sx={{ maxWidth: "380px", pl: "10px", mx: "auto", position: "relative" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item?.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <p className="flex text-sm text-slate-500"> <span>   <CiLocationOn /> </span> {item?.location} </p>

                                <p className="text-[#F2561B] font-semibold text-[14px]"> $ {item?.minimumPrice}-${item?.maximumPrice} </p>
                                <Typography
                                    sx={{
                                        fontSize: "18px", position: "absolute", px: "3px", py: "1px",
                                        backgroundColor: "#F2561B", color: "white", top: "2%", right: "0%"
                                    }}
                                    gutterBottom variant="h6" component="div">
                                    For Sale
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "18px", position: "absolute", px: "3px", py: "1px",
                                        backgroundColor: "#F2561B", color: "white", top: "2%", left: "0%"
                                    }}
                                    gutterBottom variant="h6" component="div">
                                    <FaRegStar className="text-3xl w-full" />
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <div className="flex justify-between items-center  w-full ">
                            <p className="btn btn-success text-white"> {item?.status} </p>
                            <button className="py-2 px-4 mr-3 mb-3 flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]"><Link to={`/properties-Details/${item?._id}`}>Details</Link> <FaArrowRight /></button>
                        </div>
                    </Card>)
                }
            </div>

        </div>
    );
};

export default Featured;