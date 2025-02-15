/* eslint-disable react/prop-types */
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

const PropertiesDetailsHeader = ({ location, title,minimumPrice,maximumPrice }) => {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      // onClick={handleClick}
    >
      Urban Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/"
      // onClick={handleClick}
    >
      Property
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      Details
    </Typography>,
  ];
  return (
    <div>
      <div className=" flex flex-col md:flex-row  justify-between md:items-center gap-2">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>{" "}
        <div className="flex md:justify-center  items-start md:items-center gap-2">
          <Link
            href="/"
            className=" p-2 rounded-full group duration-500 border-slate-300 hover:border-sky-400 hover:bottom-2  border  "
          >
            {" "}
            <FaFacebookF className=" duration-500 text-black group-hover:text-sky-400 " />{" "}
          </Link>
          <Link
            href="/"
            className=" p-2 rounded-full group duration-500 border-slate-300 hover:border-sky-400 hover:bottom-2  border  "
          >
            {" "}
            <FaWhatsapp className=" duration-500 text-black group-hover:text-sky-400 " />{" "}
          </Link>
          <Link
            href="/"
            className=" p-2 rounded-full group duration-500 border-slate-300 hover:border-sky-400 hover:bottom-2  border  "
          >
            {" "}
            <FaXTwitter className=" duration-500 text-black group-hover:text-sky-400 " />{" "}
          </Link>
        </div>
      </div>

      <div className="mt-5 flex flex-col md:flex-row justify-between gap-2 md:items-center ">
        <div className="flex justify-start items-center gap-2">
          <button className=" px-3 py-1 text-sm bg-orange-400 font-bold">
            Featured
          </button>
          <button className=" px-3 py-1 text-sm bg-sky-400 font-bold text-white">
            Featured
          </button>
          <button className=" px-3 py-1 text-sm bg-sky-400 font-bold text-white">
            Featured
          </button>
        </div>
        <div>
          <p className="text-sky-400  font-semibold text-2xl  ">
           $ {minimumPrice}-${maximumPrice}
          </p>
        </div>
      </div>

      <div>
        <h2 className=" text-xl font-bold my-3 "> {title} </h2>
        <p className="flex my-2 justify-start items-center gap-1 text-sm text-slate-500">
          <span>
            <MdLocationOn className=" fill-red-500  text-xl text-red-500" />
          </span>
          <span> {location}</span>
        </p>
      </div>
    </div>
  );
};

export default PropertiesDetailsHeader;
