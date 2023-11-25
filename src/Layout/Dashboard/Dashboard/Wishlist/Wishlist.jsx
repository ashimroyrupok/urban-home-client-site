import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { FaArrowRight, FaRegStar } from "react-icons/fa";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";

const Wishlist = () => {
    return (
        <div className="mt-16">

            <SectionTitle title={"Your Wishlist"}></SectionTitle>

            <div >
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-5 my-12 mx-auto lg:grid-cols-4">
                    <Card sx={{ maxWidth: "380px", mx: "auto", position: "relative" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://i.ibb.co/LhjNsh3/images-q-tbn-ANd9-Gc-Swu-IN5i3-GKx-Iid-XKBye89y-Gp-MY2-Nslx-Mzw-Q-usqp-CAU.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <p className="text-[18px]">Title is Here</p>
                                <p className="flex text-sm text-slate-500"> <span>   <CiLocationOn /> </span>661-699 N Mc Clurg Ct, Chicago, IL 60611, USA</p>

                                <p className="text-[#F2561B] font-semibold my-1 text-[16px]"> $ 3454-$5543 </p>

                                <div className="flex flex-col justify-between items-center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <span> Agent Name </span>
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
                                <Typography
                                    sx={{
                                        fontSize: "18px", position: "absolute", px: "3px", py: "1px",
                                        backgroundColor: "#F2561B", color: "white", top: "2%", left: "0%"
                                    }}
                                    gutterBottom variant="h6" component="div">
                                    {/* <FaRegStar className="text-3xl w-full" /> */}
                                    Pending
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <div className="flex justify-between items-center gap-3 w-full ">
                            <Button variant="outlined" color="error">
                                Delete
                            </Button>
                            <button className="py-1 px-4 mr-1 duration-300  flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]">Make an Offer <FaArrowRight /></button>
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    );
};

export default Wishlist;