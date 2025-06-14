/* eslint-disable react/prop-types */
import { Divider } from "@mui/material";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa6";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
// eslint-disable-next-line react/prop-types
const Overview = ({property}) => {
  return (
    <div className="font-bold  bg-white p-2 px-6 text-[#2a3741]">
      <h2 className=" my-4  text-xl   ">Overview</h2>
      <div className="grid my-8 grid-cols-2 md:grid-cols-4  gap-8 gap-y-12  p-4 md:px-8">
        <div className=" flex flex-col justify-center items-center gap-3 ">
          <FaBed className=" text-2xl font-semibold " />
          <p className="text-sm"> {property?.bedRoom || 4} Bedroom </p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-3 ">
          <FaBath className=" text-2xl font-semibold " />
          <p className="text-sm"> {property?.bathRoom || 4} Bathroom </p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-3 ">
          <MdCheckBoxOutlineBlank className=" text-2xl font-semibold " />
          <p className="text-sm">
            {" "}
            {property?.area || 1400} ft <sup>2</sup>{" "}
          </p>
        </div>
        <div className=" flex flex-col justify-center items-center gap-3 ">
          <SlCalender className=" text-2xl font-semibold " />
          <p className="text-sm"> Built year: {property?.builtYear || 2006} </p>
        </div>
      </div>
      <Divider className="my-6" />
      {/* divider */}
      <div className=" flex justify-between my-6 text-sm font-normal items-center gap-2 ">
        <p className=" text-sm ">Listing ID:  {property?._id} </p>

        <p> {new Date(property?.date).toLocaleDateString()} </p>
      </div>
    </div>
  );
};

export default Overview;
