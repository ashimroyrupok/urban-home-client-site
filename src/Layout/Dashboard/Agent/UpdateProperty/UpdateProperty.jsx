import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const api_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
// console.log(api_key);
const hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`

const UpdateProperty = () => {


    const [property, setProperty] = useState({})
    const { id } = useParams()
    // console.log(id);
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()


    const { data: properties = [] } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await axiosPublic('/properties')
            return res.data
        }
    })
    console.log(properties);

    useEffect(() => {
        const property = properties.find(property => property._id === id)
        setProperty(property)

    }, [id, properties])

    console.log(property);



    // form submission

    const handleSubmit = async (data) => {
        console.log(data);
        data.preventDefault()
        const form = data.target;
        const agentEmail = form.agentEmail.value;
        const agentName = form.agentName.value;
        const propertyImage = form.image.files[0];
        const propertyTitle = form.titles.value;
        const location = form.location.value;
        const maximumPrice = form.maximumPrice.value;
        const minimumPrice = form.minimumPrice.value;
        console.log(agentEmail, agentName, propertyImage, propertyTitle, location, maximumPrice, minimumPrice);
        const imageFile = { image: propertyImage }

        if (propertyImage) {
            const res = await axiosPublic.post(hosting_api, imageFile, {
                headers: {
                    'content-type': "multipart/form-data"
                }
            })

            console.log(res.data);
            const image = res.data?.data?.display_url

            if (res.data.success) {
                const info = {
                    agentEmail: property?.agentEmail,
                    agentName: property?.agentName,
                    image: image,
                    title: propertyTitle || property?.title,
                    location: location || property?.location,
                    maximumPrice: maximumPrice || property?.maximumPrice,
                    minimumPrice: minimumPrice || property?.minimumPrice
                }
                const res = await axiosSecure.patch(`/properties/updateProperty/${id}`, info)
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success('property updated successfully')
                }
            }
        } else {
            const info = {
                agentEmail: property?.agentEmail,
                agentName: property?.agentName,
                image: property?.image,
                title: propertyTitle || property?.title,
                location: location || property?.location,
                maximumPrice: maximumPrice || property?.maximumPrice,
                minimumPrice: minimumPrice || property?.minimumPrice
            }
            const result = await axiosSecure.patch(`/properties/updateProperty/${id}`, info)
            console.log(result.data);
            if (result.data.modifiedCount > 0) {
                toast.success('property updated successfully')
            }
        }




    }

    return (
        <div>
            <SectionTitle title={"Update Your Property Data"}></SectionTitle>

            <form onSubmit={handleSubmit} >
                <div className="flex justify-around gap-y-3 items-center ">
                    <div className="form-control w-full ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-black font-semibold">Agent Email</span>
                            </label>
                            <input type="email" defaultValue={property?.agentEmail} placeholder="Owner Email" readOnly className="input  input-bordered w-[90%] " name="agentEmail" />
                        </div>

                    </div>
                    <div className="form-control w-full ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-black font-semibold">Agent Name</span>
                            </label>
                            <input type="text" defaultValue={property?.agentName} placeholder="Owner Email" readOnly className="input  input-bordered w-[90%] " name="agentName" />
                        </div>
                    </div>
                </div>
                <div className="flex  my-4 items-center justify-center">
                    <div className="w-full">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-black font-semibold">Property Title</span>
                            </label>
                            <input type="text" defaultValue={property?.title} placeholder="Title" className="input  input-bordered w-[90%] " name="titles" />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="form-control w-full ">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span defaultValue={property?.image} className="label-text text-black font-semibold">Property Image</span>
                                </label>
                                <input type="file" readOnly className="input  input-bordered w-[90%] " name="image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around items-center ">
                    <div className="form-control w-full ">
                        <div className="flex justify-start gap-6 items-center">
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-black font-semibold">Minimum Price</span>
                                </label>
                                <input defaultValue={property?.minimumPrice} type="number" placeholder="minimum price" className="input  input-bordered w-[90%] " name="minimumPrice" />
                            </div>

                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-black font-semibold">Maximum Price</span>
                                </label>
                                <input type="number" defaultValue={property?.maximumPrice} placeholder="maximum price" className="input  input-bordered w-[90%] " name="maximumPrice" />
                            </div>

                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-black font-semibold">Location</span>
                            </label>
                            <input defaultValue={property?.location} type="text" placeholder="Property Location" className="input  input-bordered w-[90%] " name="location" />
                        </div>
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

export default UpdateProperty;