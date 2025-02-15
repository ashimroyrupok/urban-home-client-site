/* eslint-disable react/no-unescaped-entities */
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyReview = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", user?.displayName],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/user/${user?.displayName}`);
      return res.data;
    },
  });

  const handleDelte = async (id) => {
    const res = await axiosPublic.delete(`/review/user/${id}`);
    console.log(res.data);
    if (res.data.deletedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Review deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="p-4">
      <SectionTitle title={"MY Reviews"}></SectionTitle>

      {reviews.length <= 0 ? (
        <div className="h-[70vh] flex justify-center items-center ">
          <h2 className=" text-xl md:text-2xl font-semibold text-black">
            You don't have any
            <span className=" text-[#FB923C] ">Review yet!!</span>{" "}
          </h2>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-5 border-2 ">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <div>
              {reviews?.map((review) => (
                <SwiperSlide key={review?._id}>
                  {/* <img src={review?.reviewerImage} /> */}
                  <div className="flex flex-col max-w-3xl mx-auto justify-center items-center gap-2">
                    <p className="text-center"> {review?.review} </p>
                    {/* <Avatar
                                        alt="Remy Sharp"
                                        src={review?.image}
                                        sx={{ width: 80, height: 80, mt: "30px" }}
                                    /> */}
                    <p className=" mt-5 text-2xl font-bold">
                      {" "}
                      {review?.reviewProperty}{" "}
                    </p>
                    <h2>
                      {" "}
                      Agent Name:{" "}
                      <span className="font-semibold">
                        {" "}
                        {review?.agentName}{" "}
                      </span>{" "}
                    </h2>
                    <p className="font-semibold ">{review?.date}</p>
                    <button
                      onClick={() => handleDelte(review?._id)}
                      className="btn btn-error text-white"
                    >
                      Delete
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default MyReview;
