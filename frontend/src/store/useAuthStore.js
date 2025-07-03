import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';

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
            const res = axiosInstance.get('/auth/check'); //we start from auth because we have the baseURL set in the axios.js
            set({authUser: res.data}) // set the state with the user data
        } catch (error) {
            console.log("Error checking authentication:", error);
            set({authUser: null}) //if the user is not authenticated, set the authUser to null
        }finally {
            set({isCheckingAuth: false}) //set isCheckingAuth to false after the request is done
        }
    }
}));