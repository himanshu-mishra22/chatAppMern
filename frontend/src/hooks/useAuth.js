import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import { toast } from "react-hot-toast";

export const useAuth = create((set) => ({
  authUser: null,
  iSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
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
      set({authUser:res.data});
      toast.success("Hello There!");
    } catch (error) {
      toast.error("Signup failed");
      console.log(error);
    }finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async()=>{
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser:null});
      toast.success("Logout successful");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  },

  login: async(data)=>{
    set({isLoggingIn:true});
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({authUser:res.data});
      toast.success("Login successful");
    } catch (error) {
      toast.error("Signup failed");
      console.log(error);
    }finally {
      set({ isLoggingIn: false });
    }

  },

  updateProfile: async(data)=>{
    set({isUpdatingProfile:true});
    try {
      console.log(data);
      const res = await axiosInstance.put("/auth/update-profile", data);
      console.log(res.data);
      set({authUser:res.data});
      toast.success("Profile updated");
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed");
    }finally{
      set({isUpdatingProfile:false});
    }
  }
}
)
);
