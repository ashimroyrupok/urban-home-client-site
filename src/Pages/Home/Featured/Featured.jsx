import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";



const Featured = () => {
    return (
        <div className="my-10">
            <div>
                <SectionTitle title={"Featured"}></SectionTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto lg:grid-cols-4">
                <Card sx={{ maxWidth: "380px", pl: "10px", mx: "auto", position: "relative" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://i.ibb.co/LhjNsh3/images-q-tbn-ANd9-Gc-Swu-IN5i3-GKx-Iid-XKBye89y-Gp-MY2-Nslx-Mzw-Q-usqp-CAU.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                                <p className="flex text-sm text-slate-500"> <span>   <CiLocationOn /> </span>661-699 N Mc Clurg Ct, Chicago, IL 60611, USA</p>

                                <p className="text-[#F2561B] font-semibold text-[14px]"> $ 3454-$5543 </p>
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
                        <p>status</p>
                        <button className="py-2 px-4 mr-3 mb-3 flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]">Details <FaArrowRight /></button>
                       </div>
                </Card>
            </div>

        </div>
    );
};

export default Featured;