import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://estatopia-backend.up.railway.app/api",
  withCredentials: true,
});

export default apiRequest;
