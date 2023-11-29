import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../../../Hooks/useAuth";
import Swal from "sweetalert2";

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

        // const intent = async () => {
        //     const result = await axiosSecure.post('/create-payment-intent', { price: parseInt(soldItem?.offeredPrice) })
        //     console.log(result.data?.clientSecret);
        //     setClientSecret(result.data?.clientSecret)
        //     return result.data
        // }
        // intent()

        if (soldItem?.offeredPrice > 0) {

            axiosSecure.post('/create-payment-intent', { price: parseInt(soldItem?.offeredPrice) })
                .then(res => {
                    console.log(res.data?.clientSecret);
                    setClientSecret(res.data?.clientSecret)
                })

        }



    }, [soldItem?.offeredPrice])

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
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)
                console.log(paymentIntent.id);
                console.log(transactionId, "transectin");
                const info = {
                    status: "bought",
                    transactionId: paymentIntent.id
                }
                console.log(info);
                const res = await axiosSecure.patch(`/soldList/payment/${id}`, info)
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    //

                    const response = await axiosSecure.patch(`/properties/bought/${soldItem?.propertyTitle}`, { status: "bought" })
                    console.log(res.data);
                    if (response.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
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
                {transactionId && <p className="text-green-600"> {transactionId} </p>}
            </form>

        </div>
    );
};

export default CheckoutForm;