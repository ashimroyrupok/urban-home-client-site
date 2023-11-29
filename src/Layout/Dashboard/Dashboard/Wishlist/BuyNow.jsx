import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const BuyNow = () => {
    const { id } = useParams()
    const { user } = useAuth()
    // console.log(id);
    const axiosPublic = useAxiosPublic()
    const { data: property = {} } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wishlists/toBuy/${id}`)
            return res.data
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data);
        console.log("hello");
        const info = {
            agentEmail: property.agentEmail,
            agentName: data.agentName,
            buyerEmail: data.buyerEmail,
            buyerName: data.buyerName,
            buyingDate: data.buyingDate,
            location: data.location,
            offeredPrice: data.offeredPrice,
            propertyTitle: data.propertyTitle,
            image: property.image
        }
        console.log(info,"info");
        const res = await axiosPublic.post('/sold', info)
        console.log(res.data);
        if (res.data.insertedId) {

            toast.success(`${data?.propertyTitle} buy successful`, {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }


    // console.log(property);
    return (
        <div className="mt-20 max-w-6xl  mx-auto">

            <SectionTitle title={"Place Your Order"}></SectionTitle>


            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex justify-around gap-y-3  items-center ">
                    <div className="form-control w-full ">

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Your Name</span>
                            </div>
                            <input  value={user?.displayName} name="buyerName" readOnly type="text" placeholder="Type here" className="input input-bordered w-[90%] "

                                {...register("buyerName")}
                            />

                        </label>



                    </div>
                    <div className="form-control w-full ">

                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Your Email</span>
                            </div>
                            <input  value={user?.email} name="buyerEmail" readOnly type="text" placeholder="Type here" className="input input-bordered w-[90%] "

                                {...register("buyerEmail")}
                            />

                        </label>


                    </div>
                </div>
                <div className="flex  my-4 items-center justify-center">
                    <div className="w-full">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Property Title</span>
                            </div>
                            <input  defaultValue={property?.title} name="propertyTitle" readOnly type="text" placeholder="Type here" className="input input-bordered w-[90%] "

                                {...register("propertyTitle" , { required: true })}
                            />

                        </label>


                    </div>
                    <div className="w-full">
                        <div className="form-control w-full ">

                            <label className="form-control w-full ">
                                <div className="label">
                                    <span className="label-text">Agent Name</span>
                                </div>
                                <input  defaultValue={property?.agentName} name="agentName" readOnly type="email" placeholder="Type here" className="input input-bordered w-[90%] "

                                    {...register("agentName", { required: true })}
                                />

                            </label>



                        </div>
                    </div>
                </div>
                <div className="flex justify-around items-center ">
                    <div className="form-control w-full ">
                        <div className="flex justify-start gap-6 items-center">

                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text"> {`Offer Price ($ ${property?.minimumPrice}-$ ${property?.maximumPrice}) `} </span>
                                    </div>
                                    <input  name="offeredPrice" type="number" placeholder="Your Offered Price" className="input input-bordered w-[90%] "
                                        {...register("offeredPrice", { required: true, min: `${property?.minimumPrice}`, max: `${property?.maximumPrice}` })}
                                    />
                                    {errors.offeredPrice && <h5 className="text-red-600"> Your offer will be in range </h5>}

                                </label>

                            </div>
                            <div className="w-full">

                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="label-text"> Buying Date </span>
                                    </div>
                                    <input  name="buyingDate" type="date" placeholder="Buying date" className="input input-bordered w-[90%] "
                                        {...register("buyingDate", { required: true })}
                                    />
                                    {errors.buyingDate && <h5 className="text-red-600"> This field is required </h5>}
                                </label>

                            </div>

                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text"> Property Location </span>
                            </div>
                            <input  defaultValue={property?.location} readOnly name="location" type="text" placeholder="Buying date" className="input input-bordered w-[90%] "
                               {...register("location", { required: true })}
                            />
                            
                        </label>


                    </div>
                </div>

                <div className="flex justify-center mx-auto items-center w-full">
                    <input className="btn  border-[#F2561B] bg-[#F2561B] text-white hover:bg-[#ef9473] w-full mt-6" type="submit" value="Submit Now" />
                </div>
            </form>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />


        </div>
    );
};

export default BuyNow;