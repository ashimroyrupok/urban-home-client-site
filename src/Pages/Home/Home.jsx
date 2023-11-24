import { Toaster } from "react-hot-toast";
import Banner from "./Banner/Banner";

const Home = () => {
    return (
        <div>

            <Banner></Banner>
            
            <Toaster />
        </div>
    );
};

export default Home;