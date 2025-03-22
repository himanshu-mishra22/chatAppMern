import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";


export const useChat = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async()=>{
        set({isUsersLoading:true})
        try{
            const res = await axiosInstance.get("/message/user");
            set({users:res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false});
        }
    },

    getMessages: async(userId)=>{
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            console.log(res.data);
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false});
        }

    },


    setSelectedUser: (selectedUser)=>{
        set({selectedUser})
    },

    sendMessage: async(data)=>{
        const {selectedUser,messages} = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,data);
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

}))