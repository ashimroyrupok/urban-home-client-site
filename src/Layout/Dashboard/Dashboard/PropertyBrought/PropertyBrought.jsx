import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const PropertyBrought = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: boughtProperties = [] } = useQuery({
        queryKey: ["boughtProperties", user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/sold/user/${user?.email}`)
            return data
        }
    })

    console.log(boughtProperties);


    return (
        <div className="mt-16">

            <SectionTitle title={"Your Bought Property"}></SectionTitle>

            <div >
                <div className="grid grid-cols-1 pr-2 md:grid-cols-2 max-w-7xl gap-5 my-12 mx-auto lg:grid-cols-4">
                    {boughtProperties?.map(property => <Card key={property?._id} sx={{ maxWidth: "380px", mx: "auto", position: "relative" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={property?.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <p className="text-[18px]"> {property?.propertyTitle} </p>
                                <p className="flex text-sm text-slate-500"> <span>   <CiLocationOn /> </span> {property?.location} </p>

                                <p className="text-[#F2561B] font-semibold my-1 text-[16px]">   Offered Amount: $ {property?.offeredPrice}  </p>

                                <div className="flex flex-col justify-between items-center">
                                    <span>  {property?.agentName} </span>
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
                                <div className=" absolute top-[2%] left-0">
                                    {property?.status ? <div>
                                        {property?.status === "accepted" ? <button className="btn btn-sm btn-success text-white"> Accepted</button> : <div>
                                            {
                                                property?.status === "bought" ?  <button className="btn btn-sm btn-accent text-white">
                                                Bought</button> :<button className="btn btn-sm btn-error text-white">
                                                Rejected</button>
                                             }
                                             </div>}
                                    </div> : <button className="btn btn-sm btn-primary">pending</button>}

                                </div>

                            </CardContent>
                        </CardActionArea>
                        <div className="flex justify-center mx-auto  items-center gap-3 w-full ">

                            {
                                property?.status ? <div>
                                    {
                                        property?.status === "accepted" ? <button className="btn    mr-1 duration-300 text-center  flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]"> <Link to={`/dashboard/payNow/${property?._id}`}>Pay</Link> <FaArrowRight /></button> : <span className="text-green-600 p-1 btn"> {property?.transactionId} </span>
                                    }
                                </div> :
                                    <button disabled className="btn   mr-1 duration-300 text-center  flex gap-1 hover:bg-[#F2561B] hover:text-white justify-end border  text-[#F2561B] border-[#F2561B]"> Pay <FaArrowRight /></button>
                            }
                        </div>
                    </Card>)}
                </div>
            </div>



        </div>
    );
};

export default PropertyBrought;