import React, { useEffect } from "react";
import { useChat } from "../hooks/useChat";
import SideBarLoading from "./SideBarLoading";
import { Users } from "lucide-react";
import defaultImage from '../assets/default.jpg';
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const { getUsers, setSelectedUser, users, selectedUser, isUsersLoading } =
    useChat();

  const {onlineUsers} = useAuth();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if(isUsersLoading) return <SideBarLoading/>;



  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6"/>
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/*Todo online filter*/}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user)=>(
           <button
           key={user._id}
           onClick={()=>setSelectedUser(user)}
           className={
            `w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
            ${selectedUser?._id == user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`
           }
           >
            <div className="realtive mx-auto lg:mx-0">
              <img
              src={user.profilePic || defaultImage}
              alt={user.name}
              className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"
                ></span>
              )}
            </div>

            <div className="hidden_lg:block_text-left_min-w-0">
              <div className="font-medium_truncate">{user.fullName}</div>
              <div className="text-sm_text-zinc-400">{onlineUsers.includes(user._id)? "Online" : "Offline"}</div>
            </div>
           </button>
          ))}
        
        
      </div>
    </aside>
  )
  
 };

export default Sidebar;
