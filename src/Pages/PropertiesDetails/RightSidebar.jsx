/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const RightSidebar = ({ property }) => {
  return (
    <div>
      <div className=" flex justify-center items-center bg-white p-2 gap-4">
        <Avatar
          alt="seller image"
          src={property?.image}
          variant="square"
          sx={{ width: 100, height: 100 }}
        >
          N
        </Avatar>

        <div>
          <h2 className=" font-bold  "> {property?.agentName} </h2>
          <h3 className=" text-sm"> Seller </h3>

          <Link to={"/"} className=" text-sky-500 font-semibold text-xk mt-4 ">
            {" "}
            See all listing{" "}
          </Link>
        </div>
      </div>
      <div className=" bg-[#E2E5E7] "></div>
    </div>
  );
};

export default RightSidebar;