import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials:true
});

    
export const BACK_END_BASE_URL= "http://localhost:3000";