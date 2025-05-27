import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const ManageReview = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews')
            return res.data
        }
    })

    // delete review
    const handleDelete = email => {

        axiosSecure.delete(`/reviews/${email}`)
        .then(res => {
            console.log(res.data);
            refetch()
            toast.success(`${email} reviews deleted successful`)
        })
    }


    return (
        <div  className="mt-11">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 lg:grid-cols-3">
                {
                    reviews?.map(review => <div key={review?._id} className="card card-compact w-80 bg-base-100 shadow-xl">
                    <figure><img className="h-[250px] w-full" src={review?.reviewerImage} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title"> {review?.reviewerName} </h2>
                      <p> <span className="font-semibold">Reviewer email: </span> {review?.reviewerEmail}</p>
                      <p> {review?.review} </p>
                      <div className="card-actions justify-end">
                        <button onClick={() => handleDelete(review?.reviewerName)} className="btn btn-error text-white">Delete Review</button>
                      </div>
                    </div>
                  </div>)
                }
            </div>

            <Toaster></Toaster>



        </div>
    );
};

export default ManageReview;