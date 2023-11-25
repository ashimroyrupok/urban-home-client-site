import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";

const MyProfile = () => {
    const {user} = useAuth()
    return (
        <div className="flex w-full s h-[100vh] items-center bg-slate-200  my-14 justify-center">

            <div className="text-center w-[90%] mt-6" >
                <div className="w-full text-center flex items-center justify-center ">
                    <img src="https://i.ibb.co/wNjQ2s5/profile-cover.jpg" alt="" />
                </div>
                <div className="w-full text-center flex items-center justify-center -mt-10">
                    <img className="rounded-full w-28 md:w-[150px]  " src={user?.photoURL} alt="" />
                </div>
                <h2 className="text-2xl text-black my-2 font-bold"> {user?.displayName} {user?.role &&  `(${user?.role})`} </h2>
                <p className="text-slate-400">Our new member</p>

                {/* <div className="flex justify-center items-center gap-8 text-white my-6">
                    <div>
                        <h3 className="text-slate-300 text-xl">Play Game</h3>
                        <p className="text-2xl">230</p>
                    </div>
                    <div>
                        <h3 className="text-slate-300 text-xl">Total Win</h3>
                        <p className="text-2xl">140</p>
                    </div>
                    <div>
                        <h2 className="text-slate-300 text-xl">Total Draw</h2>
                        <p className="text-2xl">20</p>
                    </div>
                </div> */}
                <Link className="my-10" to='/'> <button className=" border-2 px-4 py-2 text-black bg-transparent border-[#F9940F] hover:text-white duration-300 hover:bg-[#F9940F]">Go Home</button> </Link>
            </div>


        </div>
    );
};

export default MyProfile;