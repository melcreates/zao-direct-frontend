import axios from "axios";

export default function setupAxios() {
  axios.defaults.baseURL = "http://localhost:5000/"; // 👈 your backend

  axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //config.headers.Authorization = `Bearer ${token}`;
      console.log("Sending token:", token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
}
