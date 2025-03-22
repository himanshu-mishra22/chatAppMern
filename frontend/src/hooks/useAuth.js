import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import { toast } from "react-hot-toast";
import {io} from "socket.io-client";
import {BACK_END_BASE_URL} from "../utils/axios.js"

export const useAuth = create((set,get) => ({
  authUser: null,
  iSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket:null,


  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ iSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Hello There!");
      get().connectSocket();
    } catch (error) {
      toast.error("Signup failed");
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successful");
      get().connectSocket();
    } catch (error) {
      toast.error("Signup failed");
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log(data);
      const res = await axiosInstance.put("/auth/update-profile", data);
      console.log(res.data);
      set({ authUser: res.data });
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: ()=>{
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io(BACK_END_BASE_URL,{
      query:{
        userId: authUser._id,
      }
    })  
    socket.connect();

    set({socket:socket});

    socket.on("getOnlineUsers", (userIds)=>{
      set({onlineUsers: userIds});
    });
  },
  disconnectSocket: ()=>{
    if(get().socket?.connected) get().socket.disconnect();
  }

}));
