import React, { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Send, X, Image } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const { sendMessage } = useChat();

  const handleImgChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    const reader = new FileReader();
    // reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImg = () => {
    setImg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!text.trim() && !img) return;

  try {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("text", text.trim());

    console.log("Sending message:", { text, file });

    const response = await sendMessage(formData);
    console.log("Response from sendMessage:", response);

    // Clear fields
    setText("");
    setImg(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  } catch (error) {
    toast.error("Failed to send message!");
    console.error("Error sending message:", error);
  }
};
  return (
    <div className="p-2 w-full">
      {img && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={img}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImg}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex p-5 justify-center items-center gap-2"
      >
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full h-16 input input-bordered rounded-lg sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            name="image"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImgChange}
          />

          <button
            type="button"
            name="image"
            className={`hidden sm:flex btn btn-circle
                     ${img ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
          <button
            type="submit"
            className="btn btn-md btn-circle"
            disabled={!text.trim() && !img}
          >
            <Send size={22} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
