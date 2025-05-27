/* eslint-disable react/no-unescaped-entities */

import { Avatar, Checkbox,  Typography, Box } from "@mui/material"
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle"
import useAxiosPublic from "../../../Hooks/useAxiosPublic"
import useAuth from "../../../Hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"




export default function CommentsSection() {
  const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: reviews = [], refetch } = useQuery({
      queryKey: ["reviews", user?.displayName],
      queryFn: async () => {
        const res = await axiosPublic.get(`/reviews/user/${user?.displayName}`);
        return res.data;
      },
    });

    const handleDelete = async (id) => {
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
console.log(reviews)
  return (
    <div className="w-full p-4 mx-auto ">
      {/* Header */}

      <SectionTitle title={"My Reviews"} />

      {/* Comments List */}
      <div className="divide-y divide-gray-100 ">
        {reviews.length <= 0 ? (
          <div className="h-[70vh] flex justify-center items-center ">
            <h2 className=" text-xl md:text-2xl font-semibold text-black">
              You don't have any
              <span className=" text-[#FB923C] ">Review yet!!</span>{" "}
            </h2>
          </div>
        ) : (
          <div>
            {" "}
            {reviews?.map((review) => (
              <Box
                key={review._id}
                className="p-4 my-3 bg-[#F2F4F7]  rounded-md "
              >
                {/* Date Header */}
                <Typography
                  variant="body2"
                  className="font-medium text-gray-900 mb-4"
                >
                  {"Date"}
                </Typography>

                {/* Comments for this date */}
                <div className="space-y-4">
                  <div className="flex hover:bg-[#D6D9DD] rounded-md items-start p-2 space-x-3">
                    {/* Checkbox */}
                    <Checkbox size="small" className="mt-1" />

                    {/* Avatar */}
                    <Avatar
                      src={review?.reviewerImage}
                      alt="image"
                      className="w-10 h-10"
                    >
                      {review?.agentName}
                    </Avatar>

                    {/* Comment Content */}
                    <div className="flex-1 min-w-0 ">
                      <div className="text-sm">
                        <Typography
                          component="span"
                          variant="body2"
                          className="font-medium text-gray-900"
                        >
                          You
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          className="text-gray-700 ml-2"
                        >
                          '' make reviews on the
                        </Typography>
                      </div>

                      <Typography
                        variant="body2"
                        className="text-gray-600 mt-1"
                      >
                        {review?.agentName}'s {review?.review}
                      </Typography>
                    </div>

                    {/* Timestamp and Actions */}
                    <div className="flex items-center space-x-2">
                      <Typography variant="caption" className="text-gray-500">
                        {"time"}
                      </Typography>
                      <button
                        onClick={() => handleDelete(review?._id)}
                        className=" border border-red-500 hover:bg-red-400 hover:text-white p-2 py-1 text-sm text-red-500 "
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
}

