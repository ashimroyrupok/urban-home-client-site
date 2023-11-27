import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import { TextField } from "@mui/material";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const api_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
// console.log(api_key);
const hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`

const AddProperties = () => {

    const { user } = useAuth()

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const navigate = useNavigate()
    // console.log(axiosSecure);
    const { data: users = {}, refetch } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`)
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

        const imageFile = { image: data.propertyImage[0] }
        // console.log(imageFile);
        const res = await axiosPublic.post(hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        })

        console.log(res.data);
        console.log(res.data?.data?.display_url );
        const image = res.data?.data?.display_url
        if (res.data.success) {
            const propertyInfo = {
                agentName: users?.name,
                agentEmail: users?.email,
                agentImage: users?.image,
                image:image,
                title: data?.propertyTitle,
                description: data?.description,
                location: data?.location,
                maximumPrice: data?.maximumPrice,
                minimumPrice: data?.minimumPrice
            }

            console.log(propertyInfo);

            const res = await axiosSecure.post('/properties', propertyInfo)
            console.log(res.data);
            if (res.data?.insertedId) {
                navigate('/dashboard/addedProperties')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data?.propertyTitle} added successful`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }



    }

    // console.log(users);

    return (
        <div className="mt-10">

            <SectionTitle title={"Add Properties"}></SectionTitle>


            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="flex justify-around gap-y-3 items-center ">
                    <div className="form-control w-full ">
                        <TextField
                            focused
                            id="outlined-required"
                            defaultValue={`${users?.name}`}
                            label="Agent Name"
                            name="agentName"
                            type="text"
                            // disabled?
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{ width: '90%', borderRadius: '10px' }}
                            {...register("agentName", { required: true })}
                        />
                        {errors.agentName && <h5 className="text-red-600"> This field is required </h5>}

                    </div>
                    <div className="form-control w-full ">
                        <TextField
                            focused
                            id="outlined-required"
                            defaultValue={`${user?.email}`}
                            label="Agent Email"
                            name="agentEmail"
                            type="text"
                            InputProps={{
                                readOnly: true,
                            }}
                            placeholder="your agentEmail"
                            sx={{ width: '90%', borderRadius: '10px' }}
                            {...register("agentEmail", { required: true })}
                        />
                        {errors.agentEmail && <h5 className="text-red-600"> This field is required </h5>}
                    </div>
                </div>
                <div className="flex  my-4 items-center justify-center">
                    <div className="w-full">
                        <TextField
                            focused
                            id="outlined-required"
                            label="Property Title"
                            name="propertyTitle"
                            type="text"
                            placeholder="your propertyTitle"
                            sx={{ width: '90%', my: 3, borderRadius: '10px' }}
                            {...register("propertyTitle", { required: true })}
                        />
                        {errors.propertyTitle && <h5 className="text-red-600"> This field is required </h5>}
                    </div>
                    <div className="w-full">
                        <div className="form-control w-full ">
                            <TextField
                                focused
                                id="outlined-required"
                                label="Property Image"
                                name="propertyImage"
                                type="file"
                                placeholder="your propertyImage"
                                sx={{ width: '90%', borderRadius: '10px' }}
                                {...register("propertyImage", { required: true })}
                            />
                            {errors.propertyImage && <h5 className="text-red-600"> This field is required </h5>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-around items-center ">
                    <div className="form-control w-full ">
                        <div className="flex justify-start gap-6 items-center">

                            <TextField
                                focused
                                id="outlined-required"
                                label="Minimum Price"
                                name="minimumPrice"
                                type="number"
                                placeholder="your minimumPrice"
                                sx={{ width: "40%", borderRadius: '10px' }}
                                {...register("minimumPrice", { required: true })}
                            />
                            {errors.minimumPrice && <h5 className="text-red-600"> This field is required </h5>}

                            <TextField
                                focused
                                id="outlined-required"
                                label="Maximum Price"
                                name="maximumPrice"
                                type="number"
                                placeholder="your maximumPrice"
                                sx={{ width: '40%', borderRadius: '10px' }}
                                {...register("maximumPrice", { required: true })}
                            />
                            {errors.maximumPrice && <h5 className="text-red-600"> This field is required </h5>}

                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <TextField
                            focused
                            id="outlined-required"
                            label="Property Location"
                            name="location"
                            type="text"
                            placeholder="your location"
                            sx={{ width: '90%', borderRadius: '10px' }}
                            {...register("location", { required: true })}
                        />
                        {errors.location && <h5 className="text-red-600"> This field is required </h5>}
                    </div>
                </div>
                <div className="flex justify-around items-center ">
                    <div className="form-control w-full ">

                        <div className="w-[40%] my-5 mt-7">

                            <TextField
                                focused
                                id="outlined-multiline-static"
                                label="Property Description"
                                name="description"
                                multiline
                                rows={4}
                                {...register("description", { required: true })}
                            />
                            {errors.description && <h5 className="text-red-600"> This field is required </h5>}

                        </div>
                    </div>

                </div>
                <div className="flex justify-center items-center w-full">
                    <input className="btn  border-[#F2561B] bg-[#F2561B] text-white hover:bg-[#ef9473] w-full mt-6" type="submit" value="Submit Now" />
                </div>
            </form>



        </div>
    );
};

export default AddProperties;