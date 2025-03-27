import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://chatappmern-kjal.onrender.com/api",
    withCredentials:true
});

    
export const BACK_END_BASE_URL= "https://chatappmern-kjal.onrender.com";