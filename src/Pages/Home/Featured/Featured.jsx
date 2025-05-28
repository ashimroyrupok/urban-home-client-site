import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { CiLocationOn } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Skeletons from "../../AllProperties/Media";
const Featured = () => {
  const axiosPublic = useAxiosPublic();

  const { data: advertisement = [], isLoading } = useQuery({
    queryKey: ["advertisement"],
    queryFn: async () => {
      const res = await axiosPublic.get("/properties/advertisement");
      // console.log(data);
      return res.data;
    },
  });

  console.log(advertisement);

  return (
    <div className="my-10 container p-4 mx-auto">
      <div>
        <SectionTitle title={"Featured Houses"}></SectionTitle>
      </div>
      <div>
        {isLoading ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
            <Skeletons />
            <Skeletons />
            <Skeletons />
            <Skeletons />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-4 gap-x-4 max-w-7xl mx-auto lg:grid-cols-5 ">
            {advertisement?.map((item) => (
              <Card
                key={item?._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "280px",
                  pl: "10px",
                  mx: "auto",
                  position: "relative",
                }}
              >
                <CardActionArea className="p-2">
                  <CardMedia
                    component="img"
                    sx={{
                      height: 170,
                      objectFit: "cover",
                    }}
                    image={item?.image}
                    alt="Property Image"
                  />
                  <CardContent>
                    <p className="flex text-sm text-slate-500">
                      <CiLocationOn /> {item?.location}
                    </p>
                    <p className="text-[#F2561B] font-semibold text-[14px]">
                      $ {item?.minimumPrice} - ${item?.maximumPrice}
                    </p>
                    <Typography
                      sx={{
                        fontSize: { xs: "12px" },

                        position: "absolute",
                        px: "3px",
                        py: "1px",
                        backgroundColor: "#F2561B",
                        color: "white",
                        top: "2%",
                        right: "0%",
                      }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      For Sale
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        position: "absolute",
                        px: "3px",
                        py: "1px",
                        backgroundColor: "#F2561B",
                        color: "white",
                        top: "2%",
                        left: "0%",
                      }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      <FaRegStar className="text-2xl w-full" />
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <div className="flex justify-between items-center p-3 gap-4 border-t">
                  <p className="btn btn-sm md:btn-md btn-success text-white">
                    {item?.status}
                  </p>
                  <Link
                    to={`/properties-Details/${item?._id}`}
                    className="btn-sm md:btn-md flex items-center gap-1 border border-[#F2561B] text-[#F2561B] hover:bg-[#F2561B] hover:text-white transition"
                  >
                    Details <FaArrowRight />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
