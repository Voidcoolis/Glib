import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

//store for the authentification
export const useAuthStore = create((set) => ({
  authUser: null, //beacause we don't know if the user is authenticated or not
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, //to check if the user is authenticated or not

  checkAuth: async () => {
    try {
      //send request to the endpoint to check if the user is authenticated
      const res = await axiosInstance.get("/auth/check"); //we start from auth because we have the baseURL set in the axios.js
      set({ authUser: res.data }); // set the state with the user data
    } catch (error) {
      console.log("Error checking authentication:", error);
      set({ authUser: null }); //if the user is not authenticated, set the authUser to null
    } finally {
      set({ isCheckingAuth: false }); //set isCheckingAuth to false after the request is done
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data); /// Send a POST request to the /auth/signup endpoint with the user's data
      
      //! If successful, update the store with the new authenticated user
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
   set({ isUpdatingProfile: true });
   try {
    const res = await axiosInstance.put("/auth/update-profile", data);
    set({ authUser: res.data }); // Update the authUser state with the new profile
    toast.success("Profile updated successfully");
   } catch (error) {
    console.log("Error updating profile:", error);
    toast.error(error.response.data.message);
   } finally {
    set({ isUpdatingProfile: false });
   }
  },

}));
