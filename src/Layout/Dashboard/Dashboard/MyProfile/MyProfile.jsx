import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // console.log(users);
  return (
    <div className="flex w-full s h-[100vh] items-center bg-slate-200  my-14 justify-center">
      <div className="text-center w-[90%] mt-6">
        <div className="w-full text-center flex items-center justify-center ">
          <img src="https://i.ibb.co/wNjQ2s5/profile-cover.jpg" alt="" />
        </div>
        <div className="w-full text-center flex items-center justify-center -mt-10">
          <img
            className="rounded-full w-28 md:w-[150px]  "
            src={user?.photoURL}
            alt=""
          />
        </div>
        <h2 className="text-2xl text-black my-2 font-bold">
          {" "}
          {user?.displayName}{" "}
          {users?.role && (
            <span className="text-green-600"> ({users?.role}) </span>
          )}{" "}
        </h2>
        <p className="text-slate-400">Our new member</p>
        <Link className="my-10" to="/">
          {" "}
          <button className=" border-2 px-4 py-2 text-black bg-transparent border-[#F9940F] hover:text-white duration-300 hover:bg-[#F9940F]">
            Go Home
          </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
