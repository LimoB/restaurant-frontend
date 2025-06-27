import axios from "axios";

// Create Axios instance
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log baseURL
console.log("📡 Axios baseURL:", client.defaults.baseURL);

// Add Authorization header automatically from localStorage
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or use Redux/local state if needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("📤 Request:", config.method?.toUpperCase(), config.url, config.data || config.params);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Optional: log responses
client.interceptors.response.use(
  (response) => {
    console.log("✅ Response from:", response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error);
    return Promise.reject(error);
  }
);

export default client;
