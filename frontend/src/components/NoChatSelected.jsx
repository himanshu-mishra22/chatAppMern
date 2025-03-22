import { MdChatBubbleOutline } from "react-icons/md";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-base-200 rounded-lg">
      <MdChatBubbleOutline className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-500">No Chat Selected</h2>
      <p className="text-gray-400 mt-2">Select a chat to start messaging.</p>
    </div>
  );
};

export default NoChatSelected;
