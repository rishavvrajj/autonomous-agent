'use client'

import { User, Mail } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";
import { MessageType } from "@/types/Messages";
import { useParams } from "next/navigation";

export default function ChatSection() {

  const [message, setMessage] = useState<MessageType[]>([
    {
      id: "Welcome",
      role: "agent",
      content: "hello! I'm agent, how can i help you today?",
      time: new Date().toISOString()
    }
  ]);

  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { agentId } = useParams();

  const handleSave = () => {
    if (!userInput.trim() || !agentId) {
      return;
    }

    const userMsg:MessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userInput,
      time: new Date().toISOString()
    }

    const updatedMsgs = [...message, userMsg];
    setMessage(updatedMsgs);
    setUserInput('');
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b border-gray-200">
        {/* Agent Avatar */}
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="size-4" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-gray-900">Agent Name</h3>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        {/* Spacer */}
        <div className="ml-auto"></div>
        {/* Active/Inactive Toggle */}
        <button
        
          className={`px-3 py-1 rounded-md hover:bg-blue-600 transition-colors bg-blue-500 text-white
            }`}
        >
          Active
        </button>
        <SidebarTrigger />
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map(message => (
          <div key={message.id} className={`flex ${message.role === "user" ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg rounded-lg p-3 ${message.role === "user" ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
              } text-sm`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-2 p-4 border-t border-gray-200">
        <textarea
          className="flex-1 min-h-12 resize-none border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
          onChange={(event) => setUserInput(event.target.value)}
          placeholder="Ask your agent anything..."
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center text-xs"
        >
          <Mail className="size-4" /> Send
        </button>
      </div>
    </div>
  );
}