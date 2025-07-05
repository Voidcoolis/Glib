import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

{/*
This BASE_URL allows frontend to automatically use the correct backend URL for API and socket connections, 
 whether you are developing locally or running in production.
 */}
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

//store for the authentification
export const useAuthStore = create((set, get) => ({
  authUser: null, //beacause we don't know if the user is authenticated or not
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, //to check if the user is authenticated or not
  onlineUsers: [], //to store the online users
  socket: null,

  checkAuth: async () => {
    try {
      //send request to the endpoint to check if the user is authenticated
      const res = await axiosInstance.get("/auth/check"); //we start from auth because we have the baseURL set in the axios.js
      set({ authUser: res.data }); // set the state with the user data

      get().connectSocket();
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

      get().connectSocket();
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

      get().connectSocket();
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

      get().disconnectSocket();
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

  connectSocket: () => {
    const { authUser } = get();
    //! Only connect if user is authenticated and socket is not already connected
    if (!authUser || get().socket?.connected) return;

    // Create a new socket connection, passing the userId as a query parameter
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    // Save the socket instance in the store(if disconnected it shows that user is disconnected)
    set({ socket: socket });

    //* Listen for the "getOnlineUsers" event from the server and update the onlineUsers state
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    // Disconnect the socket if it's currently connected
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
