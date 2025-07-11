import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef} from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore(); //* Get the current authenticated user
  const messageEndRef = useRef(null); // Ref to scroll to the latest message

  // useEffect should run without any conditions, that's why we declare it before the if condition
  useEffect(() => {
    // When the selected user changes, fetch their messages
    getMessages(selectedUser._id);

    //! Start listening for new messages in real time
    subscribeToMessages() //created in useChatStore

    //! When you leave the chat (or switch users), you stop listening for new messages for the previous user.
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages]);

  // whenever there is a new message it scrolls down to show the new message
useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show loading skeleton while messages are being fetched
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
        {/* Chat header with user info and close button */}
      <ChatHeader />
    
    {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
        //! Render each message, align right if sent by current user, left otherwise
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >

            {/* User avatar for each message */}
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            {/* Message time */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

        {/* Message input at the bottom */}
      <MessageInput />
    </div>
  );
};
export default ChatContainer;
