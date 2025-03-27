import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==='development'? 'http://localhost:3000/api': "/api",
    withCredentials:true
});

    
export const BACK_END_BASE_URL= import.meta.env.MODE==='development' ? "http://localhost:3000" : "";