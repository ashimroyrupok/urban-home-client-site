import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
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
        const info ={
            agentEmail: property.agentEmail,
            agentName:data.agentName,
            buyerEmail:data.buyerEmail,
            buyerName:data.buyerName,
            buyingDate: data.buyingDate,
            location: data.location,
            offeredPrice: data.offeredPrice,
            propertyTitle: data.propertyTitle,
            image: property.image
        }
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
                        <TextField
                            focused
                            id="outlined-required"
                            value={user?.displayName}
                            label="Your Name"
                            name="buyerName"
                            type="text"
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ width: '90%', borderRadius: '10px' }}
                            {...register("buyerName", { required: true })}
                        />
                        {/* {errors.buyerName && <h5 className="text-red-600"> This field is required </h5>} */}

                    </div>
                    <div className="form-control w-full ">
                        <TextField
                            focused
                            id="outlined-required"
                            value={user?.email}
                            label="Your Email"
                            name="buyerEmail"
                            type="text"
                            InputProps={{
                                readOnly: true,
                            }}
                            placeholder="your buyerEmail"
                            sx={{ width: '90%', borderRadius: '10px' }}
                            {...register("buyerEmail", { required: true })}
                        />
                        {/* {errors.agentEmail && <h5 className="text-red-600"> This field is required </h5>} */}
                    </div>
                </div>
                <div className="flex  my-4 items-center justify-center">
                    <div className="w-full">
                        <TextField
                            focused
                            id="outlined-required"
                            label="Property Title"
                            name="propertyTitle"
                            value={property?.title}
                            type="text"
                            InputProps={{
                                readOnly: true,
                            }}
                            placeholder=" property Title"
                            sx={{ width: '90%', my: 3, borderRadius: '10px' }}
                            {...register("propertyTitle", { required: true })}
                        />
                        {/* {errors.propertyTitle && <h5 className="text-red-600"> This field is required </h5>} */}
                    </div>
                    <div className="w-full">
                        <div className="form-control w-full ">
                            <TextField
                                focused
                                id="outlined-required"
                                label="agent Name"
                                name="agentName"
                                value={property?.agentName}
                                type="email"
                                InputProps={{
                                    readOnly: true,
                                }}
                                placeholder="Agent Email"
                                sx={{ width: '90%', borderRadius: '10px' }}
                                {...register("agentName", { required: true })}
                            />
                            {/* {errors.propertyImage && <h5 className="text-red-600"> This field is required </h5>} */}
                        </div>
                    </div>
                </div>
                <div className="flex justify-around items-center ">
                    <div className="form-control w-full ">
                        <div className="flex justify-start gap-6 items-center">

                            <div className="w-full">
                                <TextField
                                    focused
                                    id="outlined-required"
                                    label={`Offer Price ($ ${property?.minimumPrice}-$ ${property?.maximumPrice}) `}
                                    name="offeredPrice"
                                    type="number"
                                    placeholder="Your Offered Price"
                                    sx={{ borderRadius: '10px' }}
                                    {...register("offeredPrice", { required: true, min: `${property?.minimumPrice}`, max: `${property?.maximumPrice}` })}
                                />
                                {errors.offeredPrice && <h5 className="text-red-600"> Your offer will be in range </h5>}
                            </div>
                            <div className="w-full">
                                <TextField
                                    focused
                                    id="outlined-required"
                                    label="Buying Date"
                                    name="buyingDate"
                                    type="date"
                                    placeholder="Buying date"
                                    sx={{ borderRadius: '10px' }}
                                    {...register("buyingDate", { required: true })}
                                />
                                {errors.buyingDate && <h5 className="text-red-600"> This field is required </h5>}
                            </div>

                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <TextField
                            focused
                            id="outlined-required"
                            label="Property Location"
                            name="location"
                            type="text"
                            value={property?.location}
                            inputProps={{
                                readOnly: true
                            }}
                            placeholder="your location"
                            sx={{ width: '90%', borderRadius: '10px' }}
                            {...register("location", { required: true })}
                        />
                        {/* {errors.location && <h5 className="text-red-600"> This field is required </h5>} */}
                    </div>
                </div>

                <div className="flex justify-center items-center w-full">
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