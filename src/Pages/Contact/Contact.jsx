import { FaAsterisk } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { useRef } from "react";
import toast from "react-hot-toast";

const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ef2qyjm', 'template_zl4ukes', form.current, 'FpVPxDJASgM34jOll')
            .then((result) => {
                console.log(result.text);
                toast.success("Email send successful!");
            }, (error) => {
                console.log(error.text);
                toast.error(error.text)
            });
    };

    return (
        <div className=" p-5 lg:pt-24">
            <div className="flex items-center  mx-auto w-full lg:w-[60%] col-span-2 justify-center  p-12 ">
                {/* Author: FormBold Team */}
                {/* Learn More: https://formbold.com */}
                <div className="mx-auto w-full max-w-[550px] bg-[#1F1F1F] rounded-2xl text-white p-8">
                    <form ref={form} onSubmit={sendEmail} action="https://fabform.io/f/{form-id}" method="post">
                        <div className="mb-5">
                            <label

                                htmlFor="name"
                                className="mb-3  text-base flex gap-1 font-medium  "
                            >
                                <span>Full Name</span> <span><FaAsterisk className="text-[#C9F31D]"></FaAsterisk></span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                className="w-full rounded-md border border-[#e0e0e0]  #2F2F2Fpy-3 px-6 text-base font-medium bg-[#2F2F2F] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-3 flex text-base font-medium  "
                            >
                                <span>Email Address </span> <span><FaAsterisk className="text-[#C9F31D]"></FaAsterisk></span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@domain.com"
                                className="w-full rounded-md border border-[#e0e0e0]  #2F2F2Fpy-3 px-6 text-base font-medium bg-[#2F2F2F] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="subject"

                                className="mb-3 flex text-base font-medium  "
                            >
                                <span>Subject</span> <span><FaAsterisk className="text-[#C9F31D]"></FaAsterisk></span>
                            </label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                placeholder="Enter your subject"
                                className="w-full rounded-md border border-[#e0e0e0]  #2F2F2Fpy-3 px-6 text-base font-medium bg-[#2F2F2F] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="message"
                                className="mb-3 flex text-base font-medium  "
                            >
                                <span>Message</span> <span><FaAsterisk className="text-[#C9F31D]"></FaAsterisk></span>
                            </label>
                            <textarea
                                rows={4}
                                name="message"
                                id="message"
                                placeholder="Type your message"
                                className="w-full resize-none rounded-md border border-[#e0e0e0]  #2F2F2Fpy-3 px-6 text-base font-medium bg-[#2F2F2F] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={""}
                            />
                        </div>
                        <div>
                            <button className="hover:shadow-form rounded-md bg-[#C9F31D] py-3 px-8 text-base font-semibold text-black outline-none">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;