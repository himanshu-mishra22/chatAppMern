import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";

const ChatHeader = () => {
  const { selectedUser } = useChat();
  const { onlineUsers } = useAuth();
  const [isOnline, setIsOnline] = useState(false);

  // Update online status when `selectedUser` or `onlineUsers` change
  useEffect(() => {
    if (selectedUser && onlineUsers.includes(selectedUser._id)) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [selectedUser, onlineUsers]);

  // Handle the case where `selectedUser` is null
  // if (!selectedUser) {
  //   return (
  //     <div className="flex items-center justify-center bg-base-300 p-4 shadow-md rounded-lg">
  //       <h2 className="text-lg font-semibold text-white">Select a user</h2>
  //     </div>
  //   );
  // }

  return (
    <div className={`flex items-center justify-between p-4 shadow-md rounded-lg full ${
            isOnline ? "bg-base-300" : "bg-base-100"
          }`}>
      {/* User Info */}
      <div className="flex items-center space-x-3">
        {/* Status Indicator */}
        <span
          className={`h-3 w-3 rounded-full ${
            isOnline ? "bg-green-500 animate-ping" : "bg-red-500"
          }`}
        ></span>

        {/* User Name */}
        <h2 className="text-lg font-semibold text-white">{selectedUser.fullName}</h2>
      </div>

      {/* Status Text */}
      <span className="text-sm text-gray-300">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default ChatHeader;
