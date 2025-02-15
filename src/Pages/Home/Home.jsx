import { Toaster } from "react-hot-toast";
import Banner from "./Banner/Banner";
import SubmitProperty from "../../Components/SubmitProperty/SubmitProperty";
import Review from "./Review/Review";
import Areas from "./Areas/Areas";
import Featured from "./Featured/Featured";

const Home = () => {
    return (
        <div>

            <Banner/>
            <Featured></Featured>
            <SubmitProperty></SubmitProperty>
            <Areas></Areas>
            <Review></Review>
            
            <Toaster />
        </div>
    );
};

export default Home;