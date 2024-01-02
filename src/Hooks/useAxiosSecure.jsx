import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: "https://assignment-12-server-site-lemon.vercel.app",
//   baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
    const { Logout } = useAuth()

    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function (config) {

        const token = localStorage.getItem("access-token");
        // console.log("request stopped by interceptor", token);
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    });

    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async (error) => {
            const status = error.response.status;
            // console.log("status error in the interceptor", status);
            if (status === 401 || status === 403) {
                await Logout();
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
