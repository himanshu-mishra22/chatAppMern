import React from 'react'
import { useChat } from '../hooks/useChat'
// import { Sidebar } from 'lucide-react';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';

function HomePage() {
  const {selectedUser} = useChat();
  return (
    <div className="h-full bg-cover bg-center">
      <div className="flex items-center justify-center pt-2 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-screen">
          <div className="flex text-2xl h-full rounded-lg overflow-hidden">
            <Sidebar/>
            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage