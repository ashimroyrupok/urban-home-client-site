/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { GiSelfLove } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import PropertiesDetailsHeader from "./PropertiesDetailsHeader";
import { MdLocationOn } from "react-icons/md";
import DetailsImages from "./DetailsImages";
import Overview from "./Overview";
import RightSidebar from "./RightSidebar";
import Reviews from "./Reviews";
// modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PropertiesDetails = () => {
  const [open, setOpen] = React.useState(false);
  const [modalValue, setValue] = useState("");
  const [rating,setRating]=useState(0)
  console.log(modalValue);
  const { user } = useAuth();
  console.log(user);

  const { id } = useParams();
  // console.log(id);
  const axiosPublic = useAxiosPublic();

  const { data: property = [] } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/property/${id}`);
      return res.data;
    },
  });
  console.log(property);

  // get review
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", property?.title],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/property/${property?.title}`);
      return res.data;
    },
  });

  console.log(reviews);

  // for modal

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextareaChange = (event) => {
    // console.log(event.target.value);
    setValue(event.target.value);
  };

  // console.log(reviews.length);
  // handle review submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewProperty: property?.title,
      agentName: property?.agentName,
      reviewerImage: user?.photoURL,
      review: modalValue,
      rating:rating,
      date: new Date(),
    };

    // console.log(reviewData);

    const res = await axiosPublic.post("/reviews", reviewData);
    console.log(res.data);
    if (res.data.insertedId) {
      toast.success("Review submitted successfully");
      refetch();
      setOpen(false);
    }
  };

  // handle wishlist submit
  const handleWish = async () => {
    const dataInfo = {
      buyerEmail: user?.email,
      agentEmail: property?.agentEmail,
      agentImage: property?.agentImage,
      agentName: property?.agentName,
      description: property?.description,
      image: property?.image,
      location: property?.location,
      maximumPrice: property?.maximumPrice,
      minimumPrice: property?.minimumPrice,
      status: property?.status,
      title: property?.title,
    };

    try {
      const res = await axiosPublic.post("/wishlists", dataInfo);
      console.log(res.data);
      if (res.data.acknowledged) {
        toast.success("Wishlist added successfully");
      } else {
        toast.error("Failed to add ");
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  return (
    <div className=" mt-20 p-4 max-w-6xl mx-auto  ">
      {/* <SectionTitle title={"Property Details"}></SectionTitle> */}
      {/* <div className="flex w-full justify-center items-center px-10">
        <div className="">
          <div>
            <img className="w-full  h-[60vh]" src={property?.image} alt="" />
          </div>
          <div className=" bg-[#F4F4F4] flex flex-col lg:flex-row justify-evenly items-center">
            <div className="  lg:w-1/2 text-center px-3">
              <h2 className="text-2xl font-semibold ">{property?.title}</h2>
              <p className="flex justify-center items-center">
                {" "}
                <span className="text-red-600 text-2xl">
                  {" "}
                  <CiLocationOn></CiLocationOn>{" "}
                </span>{" "}
                {property?.location}
              </p>
              <p className="font-semibold text-[#F2561B]">
                {" "}
                ${property?.minimumPrice}-${property?.maximumPrice}{" "}
              </p>
            </div>
            <div className=" lg:w-1/2 mt-2">
              <div className="flex flex-col justify-between items-center">
                <Avatar
                  alt="Remy Sharp"
                  src={property?.agentImage}
                  sx={{ width: 56, height: 56 }}
                />
                <span className="font-semibold">
                  {" "}
                  Agent Name: {property?.agentName}{" "}
                </span>
                <div className="w-full my-2">
                  <button
                    onClick={handleWish}
                    className="w-full btn border-2 border-[#F2561B] hover:text-white hover:bg-[#F2561B]"
                  >
                    Add to Wishlist{" "}
                    <GiSelfLove className="text-red-600 text-2xl"></GiSelfLove>{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="my-8  bg-[#F4F4F4] flex flex-col items-center justify-center">
            <h3 className="text-3xl mt-6 font-semibold text-center my-3">
              Details
            </h3>
            <hr className="bg-slate-500 w-[20%] h-[2px] text-center " />
            <p className="my-5 p-3 text-center"> {property?.description} </p>
          </div>
        </div>
      </div> */}
      <PropertiesDetailsHeader
        location={property?.location}
        title={property?.title}
        minimumPrice={property?.minimumPrice}
        maximumPrice={property?.maximumPrice}
      />

      <DetailsImages property={property} />

      <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 w-full my-8 mx-auto p-2 ">
        <div className="md:col-span-3 ">
          <Overview property={property} />
          <div className="bg-white my-5  p-6 text-[#2a3741]">
            <h2 className="my-4  text-xl  font-bold  "> Description </h2>
            <p className=" text-sm "> {property?.description} </p>
          </div>
          {/* review section */}
          <Reviews
            reviews={reviews}
            setValue={setValue}
            handleReviewSubmit={handleReviewSubmit}
            rating={rating}
            setRating={setRating}
          />
        </div>
        <div className=" md:col-span-1  p-2">
          <RightSidebar handleWish={handleWish} property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertiesDetails;

// <div className=" lg:w-1/2 mt-2">
//   <div className="flex flex-col justify-between items-center">
//     <Avatar
//       alt="Remy Sharp"
//       src={property?.agentImage}
//       sx={{ width: 56, height: 56 }}
//     />
//     <span className="font-semibold">
//       {" "}
//       Agent Name: {property?.agentName}{" "}
//     </span>
//     <div className="w-full my-2">
//       <button
//         onClick={handleWish}
//         className="w-full btn border-2 border-[#F2561B] hover:text-white hover:bg-[#F2561B]"
//       >
//         Add to Wishlist{" "}
//         <GiSelfLove className="text-red-600 text-2xl"></GiSelfLove>{" "}
//       </button>
//     </div>
//   </div>
// </div>;

//  <div>

//    <h3 className="text-2xl text-center font-semibold my-8">User Review</h3>

//    <Swiper
//      spaceBetween={30}
//      pagination={{
//        clickable: true,
//      }}
//      modules={[Pagination]}
//      className="mySwiper"
//    >
//      {reviews?.map((review, idx) => (
//        <SwiperSlide key={idx}>
//          <div className="flex flex-col max-w-3xl mx-auto justify-center items-center gap-2">
//            <p className="text-center"> {review?.review} </p>
//            <Avatar
//              alt="Remy Sharp"
//              src={review?.reviewerImage}
//              sx={{ width: 80, height: 80, mt: "30px" }}
//            />
//            {/* <p className='text-sm'> {review?.} </p> */}
//            <p className="font-semibold ">{review?.reviewerName}</p>
//          </div>
//        </SwiperSlide>
//      ))}
//    </Swiper>

//    <div className="w-full text-center my-6 items-center">
//      <button
//        onClick={handleClickOpen}
//        className="w-1/2 mx-auto border-3 border-[#F2561B] hover:bg-[#F2561B] hover:text-white text-center btn flex items-center justify-center"
//      >
//        Add Your Review
//      </button>

//      <Dialog
//        open={open}
//        TransitionComponent={Transition}
//        keepMounted
//        onClose={handleClose}
//        aria-describedby="alert-dialog-slide-description"
//      >
//        <form onSubmit={handleClose}>
//          <DialogTitle>{"Type here your review"}</DialogTitle>
//          <DialogContent>
//            <div className="flex justify-around items-center ">
//              <div className="form-control w-full ">
//                <div className="w-full mx-auto my-5 mt-7">
//                  <label className="label">
//                    <span className="label-text text-white font-semibold">
//                      Review
//                    </span>
//                  </label>
//                  <div className="w-full">
//                    <textarea
//                      onChange={handleTextareaChange}
//                      required
//                      className=" w-full border-2 border-gray-400"
//                      id=""
//                      cols="20"
//                      rows="4"
//                    ></textarea>
//                  </div>
//                  <button
//                    onClick={handleReviewSubmit}
//                    className="btn text-center"
//                  >
//                    {" "}
//                    submit
//                  </button>
//                </div>
//              </div>
//            </div>
//          </DialogContent>
//          <DialogActions>
//            <Button onClick={handleClose}>close</Button>
//            {/* <button  onClick={handleClose}>Submit</button> */}
//          </DialogActions>
//        </form>
//      </Dialog>
//    </div>
//    <Toaster></Toaster>
//  </div>;
