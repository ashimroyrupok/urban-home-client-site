/* eslint-disable react/prop-types */
import { Avatar, Rating, TextareaAutosize } from "@mui/material";

const Reviews = ({
  reviews,
  handleReviewSubmit,
  setValue,
  rating,
  setRating,
}) => {
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = Math.floor(totalRating / reviews.length);
  return (
    <div>
      {/* review header */}
      <div className=" bg-white p-4 ">
        <div className="flex   justify-between items-center gap-2 ">
          <h1>
            <span className="text-xl font-semibold">Review</span>
            <span className=" rounded-full bg-slate-200 px-2 p-1 ml-2 ">
              {" "}
              {reviews?.length}{" "}
            </span>
          </h1>
          <div className=" flex justify-around items-center gap-2">
            <h1 className="text-none font-semibold"> {averageRating || 0} </h1>
            <Rating name="read-only" value={averageRating || 0} readOnly />
          </div>
        </div>
      </div>
      {/* all reviews */}
      <div className="my-2 bg-white p-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review?._id} className=" mb-5 border-b-2 pb-4">
              <div className="flex justify-between items-center gap-2 ">
                <div className=" flex justify-around items-center gap-2">
                  <Avatar alt="Travis Howard" src={review?.reviewerImage} />
                  <div>
                    <h3 className=" font-semibold"> {review?.reviewerName} </h3>
                    <h2 className=" text-xs text-slate-500 ">
                      {new Date(review?.date).toLocaleDateString()}
                    </h2>
                  </div>
                </div>
                <div className=" ">
                  <Rating
                    name="read-only"
                    value={review?.rating || 0}
                    readOnly
                  />
                </div>
              </div>
              {/* main comment */}
              <p className=" mt-4 text-slate-500 text-[16px]">
                {review?.review}
              </p>
            </div>
          ))
        ) : (
          <div className="  p-4 text-center">
            <h2 className=""> Currently no review here</h2>
          </div>
        )}
      </div>

      {/* add new review here */}

      <div className=" my-10 ">
        <div className="bg-white p-4">
          <h1 className=" font-semibold  ">Write A Review</h1>
        </div>
        <div className="my-3 bg-white p-4">
          <div className="flex justify-between items-center gap-2 ">
            <div className=" flex justify-around items-center gap-2">
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <div>
                <h3 className=" font-semibold">Name is here</h3>
                <h2 className=" text-xs text-slate-500 ">
                  Your opinion matters
                </h2>
              </div>
            </div>
            <div className=" ">
              <Rating
                className=" text-2xl"
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
          </div>
          {/* review type box */}
          <div className=" mt-6">
            <TextareaAutosize
              onChange={(e) => setValue(e.target.value)}
              aria-label="minimum height"
              minRows={3}
              maxRows={20}
              placeholder="Write your Review"
              className=" bg-[#F7F8FA] p-4  text-sm border mx-auto w-full "
              style={{ width: "100%", height: 200 }}
            />
            <div className=" w-full text-end">
              <button
                onClick={handleReviewSubmit}
                className=" hover:bg-sky-600 px-6 py-3 text-sm bg-sky-400 font-bold text-white"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
