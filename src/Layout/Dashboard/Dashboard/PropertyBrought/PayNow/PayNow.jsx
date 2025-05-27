import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../../../Shared/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Secret);
const PayNow = () => {
    const {id} = useParams()
    console.log(id);
    return (
        <div className="my-12">

            <SectionTitle title={"Pay Now"}></SectionTitle>

            <div className="max-w-4xl mx-auto">
                <Elements stripe={stripePromise}>

                    <CheckoutForm id={id}></CheckoutForm>

                </Elements>
            </div>

        </div>
    );
};

export default PayNow;