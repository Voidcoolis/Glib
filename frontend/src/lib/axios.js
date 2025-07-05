import axios from "axios";

export const axiosInstance = axios.create({
  // dynamic depending on the ennvrionment
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api",
  withCredentials: true, //cookies are sent with requests
});
