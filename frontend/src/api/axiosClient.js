import axios from 'axios';

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json", // FIXAT: var "Conetent-Type"
    },
    withCredentials: true, // Skickar cookies med requests
});

// Interceptor som automatiskt lägger till JWT-token
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Hämta sparad token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Lägg till i header
    }
    return config;
});

export default axiosClient;

