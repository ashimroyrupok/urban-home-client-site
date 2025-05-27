/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeletons from "./Media";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();
  const [sortValue, setSortValue] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", sortValue],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/properties/verified?sort=${sortValue ? "asc" : "dsc"}`
      );
      return res.data;
    },
  });

  const filteredProperties = properties.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="mt-20">
      <div className="mt-32">
        <SectionTitle title={"All Property is Here"} />
      </div>

      {/* Sort and Search */}
      <div className="flex items-center flex-col lg:flex-row px-5 mx-auto max-w-4xl my-11 justify-between">
        <div className="w-full flex items-center justify-center my-3">
          <button
            onClick={() => setSortValue((prev) => !prev)}
            className="btn btn-outline"
          >
            {sortValue ? "High to Low Sort" : "Low to High Sort"}
          </button>
        </div>
        <div className="w-full">
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-end w-full px-4">
              <div className="flex">
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered border-[#E9531A] w-[60%] rounded-r-none"
                />
                <button
                  type="submit"
                  className="btn bg-[#E9531A] rounded-l-none -ml-0 text-white"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Properties Grid */}

      <div>
        {isLoading ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
          </div>
        ) : filteredProperties.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            {" "}
            {filteredProperties.map((item) => (
              <Card
                key={item?._id}
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  minHeight: 460,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  pl: "10px",
                  mx: "auto",
                  position: "relative",
                }}
              >
                <CardActionArea className="py-2">
                  <CardMedia
                    component="img"
                    image={item?.image}
                    alt="property image"
                    sx={{
                      height: 220, // fixed height
                      objectFit: "cover", // image will cover without distortion
                    }}
                  />

                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" className="font-semibold my-1">
                      {item?.title}
                    </Typography>
                    <p className="flex text-sm text-slate-500">
                      <CiLocationOn className="mr-1" />
                      {item?.location}
                    </p>

                    <div className="flex items-center gap-2 my-3">
                      <Avatar alt={item?.agentName} src={item?.agentImage} />
                      <Typography variant="body2">{item?.agentName}</Typography>
                    </div>

                    <p className="text-[#F2561B] font-semibold text-[14px]">
                      ${item?.minimumPrice} - ${item?.maximumPrice}
                    </p>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        position: "absolute",
                        px: "6px",
                        py: "2px",
                        backgroundColor: "#F2561B",
                        color: "white",
                        top: "2%",
                        right: "0%",
                        borderRadius: "4px",
                      }}
                    >
                      For Sale
                    </Typography>

                    <button className="btn btn-success btn-sm text-white absolute top-[2%] left-[2%]">
                      {item?.status}
                    </button>
                  </CardContent>
                </CardActionArea>

                <div className="flex justify-end items-center mt-auto p-3 border-t">
                  <Link
                    to={`/properties-Details/${item?._id}`}
                    className="py-2 px-4 flex items-center gap-1 border border-[#F2561B] text-[#F2561B] hover:bg-[#F2561B] hover:text-white transition rounded-md"
                  >
                    Details <FaArrowRight />
                  </Link>
                </div>
              </Card>
            ))}{" "}
          </div>
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
