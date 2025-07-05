import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null, //initiallly no user is selected
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users"); //the endpoint to get the users
      set({ users: res.data }); //set the users in the store after fetching them
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {  //pass the userId to know which chat we are fetching messages for
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    // Get the currently selected user and current messages from the store
    const { selectedUser, messages } = get();
    try {
        // Add the new message to the messages array in the store
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] }); //keep all the previous messages that we had & add a new one
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  
  //todo: optimoize this function to avoid re-fetching messages when the user is already selected
  // this function is used to set the selected user and fetch messages for that user
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
