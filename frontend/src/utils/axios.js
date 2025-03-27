import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://chatappmern-kjal.onrender.com/api",
    withCredentials:true
});

    
export const BACK_END_BASE_URL= import.meta.env.MODE==='development' ? "https://chatappmern-kjal.onrender.com" : "https://chatappmern-kjal.onrender.com";