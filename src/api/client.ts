import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

console.log("📡 Axios baseURL:", client.defaults.baseURL);

export default client;
