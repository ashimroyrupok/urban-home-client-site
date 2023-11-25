import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

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
            toast.success(`${email} reviews deleted successful`)
        })
    }


    return (
        <div  className="mt-11">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    reviews?.map(review => <div key={review?._id} className="card card-compact w-80 bg-base-100 shadow-xl">
                    <figure><img className="h-[250px] w-full" src={review?.image} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title"> {review?.name} </h2>
                      <p> <span className="font-semibold">Reviewer email:</span> If a dog chews shoes whose shoes does he choose?</p>
                      <p> {review?.description} </p>
                      <div className="card-actions justify-end">
                        <button onClick={() => handleDelete(review?.email)} className="btn btn-error text-white">Delete Review</button>
                      </div>
                    </div>
                  </div>)
                }
            </div>



        </div>
    );
};

export default ManageReview;