import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import SectionTitle from "../../../../Shared/SectionTitle/SectionTitle";
import { TextField } from "@mui/material";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const api_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
// console.log(api_key);
const hosting_api = `https://api.imgbb.com/1/upload?key=${api_key}`;

const AddProperties = () => {
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState([]);
  // console.log(showImage, "showww");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  // console.log(axiosSecure);
  const { data: users = {} } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImage = (e) => {
    console.log(e, "ee");
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImages([...images, ...files]);
      let imgURL = [];

      for (let i = 0; i < length; i++) {
        imgURL.push({ url: URL.createObjectURL(files[i]) });
      }
      setShowImage([...showImage, ...imgURL]);
    }
  };

  const removeImage = (i) => {
    const image = images.filter((img, index) => index !== i);
    const filterImgURL = showImage.filter((img, index) => index !== i);
    setImages(image);
    setShowImage(filterImgURL);
  };

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const imageFile = { image: data.propertyImage[0] };
      console.log(imageFile);
      // const res = await axiosPublic.post(hosting_api, imageFile, {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // });

      // console.log(res.data);
      // console.log(res.data?.data?.display_url);
      // const image = res.data?.data?.display_url;

      // image uploading process for multiple images
      const uploadPromises = Array.from(data.propertyImage).map(
        async (image) => {
          console.log(showImage, "show inag");
          const formData = new FormData();
          formData.append("image", image);
          console.log(formData, "data");

          try {
            const res = await axiosPublic.post(hosting_api, formData, {
              headers: {
                "content-type": "multipart/form-data",
              },
            });
            console.log(res, "res");

            if (res.data.success) {
              return res.data.data.display_url;
            } else {
              throw new Error("Failed to upload image");
            }
          } catch (err) {
            toast.error("Failed to upload image");
            return null; // Return null for failed uploads
          }
        }
      );

      const urls = await Promise.all(uploadPromises);
      console.log(urls, "urlss");

      // Check if any upload failed
      if (urls.includes(null)) {
        toast.error("Some images failed to upload. Please try again.");
        return; // Don't proceed with database insertion
      }
      console.log(urls.filter((url) => url));
      // end

      if (urls) {
        const propertyInfo = {
          agentName: users?.name,
          agentEmail: users?.email,
          agentImage: users?.image,
          date: new Date().toJSON().slice(0, 10),
          images: urls.filter((url) => url), // filter out any null URLs,
          builtYear: data?.builtYear,
          bedRoom: data?.bedRoom,
          bathRoom: data?.bathRoom,
          area: data?.area,
          title: data?.propertyTitle,
          description: data?.description,
          location: data?.location,
          maximumPrice: data?.maximumPrice,
          minimumPrice: data?.minimumPrice,
        };

        console.log(propertyInfo);

        const res = await axiosSecure.post("/properties", propertyInfo);
        console.log(res.data);
        if (res.data?.insertedId) {
          navigate("/dashboard/addedProperties");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data?.propertyTitle} added successful`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please try with another picture",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // console.log(users);

  return (
    <div className="mt-10">
      <SectionTitle title={"Add Properties"}></SectionTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around gap-y-3 items-center ">
          <div className="form-control w-full ">
            <TextField
              focused
              id="outlined-required"
              value={`${users?.name}`}
              label="Agent Name"
              name="agentName"
              type="text"
              // disabled?
              InputProps={{
                readOnly: true,
              }}
              sx={{ width: "90%", borderRadius: "10px" }}
              {...register("agentName", { required: true })}
            />
            {errors.agentName && (
              <h5 className="text-red-600"> This field is required </h5>
            )}
          </div>
          <div className="form-control w-full ">
            <TextField
              focused
              id="outlined-required"
              value={`${user?.email}`}
              label="Agent Email"
              name="agentEmail"
              type="text"
              InputProps={{
                readOnly: true,
              }}
              placeholder="your agentEmail"
              sx={{ width: "90%", borderRadius: "10px" }}
              {...register("agentEmail", { required: true })}
            />
            {errors.agentEmail && (
              <h5 className="text-red-600"> This field is required </h5>
            )}
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
              sx={{ width: "90%", my: 3, borderRadius: "10px" }}
              {...register("propertyTitle", { required: true })}
            />
            {errors.propertyTitle && (
              <h5 className="text-red-600"> This field is required </h5>
            )}
          </div>
          <div className="form-control w-full ">
            <TextField
              focused
              id="outlined-required"
              label="Property Location"
              name="location"
              type="text"
              placeholder="your location"
              sx={{ width: "90%", borderRadius: "10px" }}
              {...register("location", { required: true })}
            />
            {errors.location && (
              <h5 className="text-red-600"> This field is required </h5>
            )}
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
                sx={{ width: "90%", borderRadius: "10px" }}
                {...register("minimumPrice", { required: true })}
              />
              {errors.minimumPrice && (
                <h5 className="text-red-600"> This field is required </h5>
              )}
            </div>
          </div>
          <div className="form-control w-full ">
            <TextField
              focused
              id="outlined-required"
              label="Maximum Price"
              name="maximumPrice"
              type="number"
              placeholder="your maximumPrice"
              sx={{ width: "90%", borderRadius: "10px" }}
              {...register("maximumPrice", { required: true })}
            />
            {errors.maximumPrice && (
              <h5 className="text-red-600"> This field is required </h5>
            )}
          </div>
        </div>

        <div className="flex justify-around items-center my-4 ">
          <div className="form-control w-full ">
            <div className="flex justify-start gap-6 items-center">
              <TextField
                focused
                id="outlined-required"
                label="Area"
                name="area"
                type="number"
                placeholder=" Your property Area sq2 "
                sx={{ width: "40%", borderRadius: "10px" }}
                {...register("area", { required: true })}
              />
              {errors.area && (
                <h5 className="text-red-600"> This field is required </h5>
              )}

              <TextField
                focused
                id="outlined-required"
                label="Built Year"
                name="builtYear"
                type="number"
                placeholder=" Built year"
                sx={{ width: "40%", borderRadius: "10px" }}
                {...register("builtYear", { required: true })}
              />
              {errors.builtYear && (
                <h5 className="text-red-600"> This field is required </h5>
              )}
            </div>
          </div>
          <div className="form-control w-full ">
            <div className="flex justify-start gap-6 items-center">
              <TextField
                focused
                id="outlined-required"
                label="Total Bed room"
                name="bedRoom"
                type="number"
                placeholder=" Enter your total bed room "
                sx={{ width: "40%", borderRadius: "10px" }}
                {...register("bedRoom", { required: true })}
              />
              {errors.bedRoom && (
                <h5 className="text-red-600"> This field is required </h5>
              )}

              <TextField
                focused
                id="outlined-required"
                label="Total Bath room"
                name="bathRoom"
                type="number"
                placeholder=" Built year"
                sx={{ width: "40%", borderRadius: "10px" }}
                {...register("bathRoom", { required: true })}
              />
              {errors.bathRoom && (
                <h5 className="text-red-600"> This field is required </h5>
              )}
            </div>
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
              {errors.description && (
                <h5 className="text-red-600"> This field is required </h5>
              )}
            </div>
          </div>
        </div>

        {/* upload images */}
        <section>
          <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
            {showImage.map((image, i) => (
              <div key={i} className="lg:h-[120px] relative">
                <label htmlFor={i}>
                  <img
                    className="border h-[120px] w-full shadow-md rounded-md border-slate-500"
                    src={image.url}
                    alt=""
                  />
                </label>
                <span
                  onClick={() => removeImage(i)}
                  className="p-2 z-10 cursor-pointer bg-red-600 hover:shadow-lg hover:shadow-red-600/50 text-white absolute top-1 right-1 rounded-full"
                >
                  x
                </span>
              </div>
            ))}
          </div>

          <div>
            <label
              className="flex flex-col justify-center items-center h-[130px] md:h-[160px] lg:h-[170px] cursor-pointer border-2 border-dashed border-slate-500 w-full hover:border-indigo-500"
              htmlFor="image"
            >
              <span>{/* <BsImage /> */}</span>
              <span className="font-medium">Select Image</span>
            </label>
          </div>
        </section>
        <input
          type="file"
          multiple
          id="image"
          name="propertyImage"
          className="hidden"
          {...register("propertyImage", {
            required: true,
            onChange: (e) => handleImage(e),
          })}
        />
        {errors.propertyImage && (
          <h5 className="text-red-600"> This field is required </h5>
        )}
        <div className="flex justify-center items-center w-full">
          <input
            className="btn  border-[#F2561B] bg-[#F2561B] text-white hover:bg-[#ef9473] w-full mt-6"
            type="submit"
            value="Submit Now"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProperties;
