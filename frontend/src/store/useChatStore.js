import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

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

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    //since socket is in the useAuthStore then this is how we get it & then use it below
    const socket = useAuthStore.getState().socket;

    // Listen for "newMessage" events from the server
    socket.on("newMessage", (newMessage) => {
      // Only add the message if it's from the currently selected user
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      //! keeping the previous messages in history & adding new message in the end
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage"); // Remove the "newMessage" event listener to prevent memory leaks
  },
  
  // this function is used to set the selected user and fetch messages for that user
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
