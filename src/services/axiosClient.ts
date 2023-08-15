import axios, { AxiosInstance } from "axios";

const baseUrl = process.env.NEXT_API_BASE_URL || "http://localhost:3000";
const axiosClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
