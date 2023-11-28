import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../../../Hooks/useAuth";

const CheckoutForm = ({ id }) => {

    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { user } = useAuth()

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    const { data: soldItem = {} } = useQuery({
        queryKey: ['soldItem', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/soldList/${id}`)
            return res.data
        }
    })

    console.log(soldItem?.offeredPrice);


    useEffect(() => {

        axiosSecure.post('/create-payment-intent', { price: parseInt(soldItem?.offeredPrice) })
            .then(res => {
                console.log(res.data?.clientSecret);
                setClientSecret(res.data?.clientSecret)
            })

    }, [soldItem?.offeredPrice, axiosSecure])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anoymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })

        if (confirmError) {
            console.log("confirm error");
        }
        else {
            console.log("payment intent", paymentIntent);
            if(paymentIntent.status === "succeeded"){
                setTransactionId(paymentIntent.id)
            }
        }

    }
    return (
        <div>


            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="my-3 btn btn-sm btn-primary" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>

                <p className="text-red-600"> {error} </p>
            </form>

        </div>
    );
};

export default CheckoutForm;