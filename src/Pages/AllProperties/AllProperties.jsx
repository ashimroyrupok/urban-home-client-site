import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Avatar, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AllProperties = () => {
    const axiosPublic = useAxiosPublic()
    const [sortValue, setSortValue] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [allProperties, setAllProperties] = useState([])



    console.log(sortValue);
    const { data: properties = [] } = useQuery({
        queryKey: ["properties", sortValue],
        queryFn: async () => {
            const res = await axiosPublic.get(`/properties/verified?sort=${sortValue ? "asc" : "dsc"}`)
            setAllProperties(res.data)
            return res.data
        }
    })

    // 

    const handleSearch = e => {
        e.preventDefault();
        setSearchValue(e.target.searchValue.value);
    }

    useEffect(() => {
        setAllProperties(properties)
        if (searchValue) {
            setAllProperties(properties.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())))
            console.log(properties.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())), "searchvalue");
        }

    }, [properties, searchValue])

    console.log(allProperties, "a;asdsfl");


    console.log(properties);
    return (
        <div className="mt-20">

            <div className="mt-32">
                <SectionTitle title={"All Property is Here"}></SectionTitle>
            </div>
            <div className="flex items-center flex-col lg:flex-row   px-5 mx-auto max-w-4xl my-11 justify-between gap-px">

                <div className="w-full flex items-center justify-center my-3">

                    {sortValue ? <button onClick={() => setSortValue(false)} className="btn  btn-outline">  High to Low Sort </button> : <button onClick={() => setSortValue(true)} className="btn  btn-outline"> Low to High Sort </button>}
                </div>
                <div className="w-full  ">

                    <form onSubmit={handleSearch} className="w-full" >
                        <div className=" flex justify-end w-full px-4">

                            <div className="flex ">
                                <input name="searchValue" type="text" placeholder="Type here" className="input input-bordered  border-[#E9531A] w-[60%] rounded-r-[0]" />
                                <input className="  btn  bg-[#E9531A] rounded-l-[0] -ml-0 text-white" type="submit" />
                            </div>
                        </div>
                    </form>


                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-6 gap-y-5 pr-4 mx-auto lg:grid-cols-4">
                {
                    allProperties?.map(item => <Card key={item?._id} sx={{ maxWidth: "380px", pl: "10px", mx: "auto", position: "relative" }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item?.image}
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