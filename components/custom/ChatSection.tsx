'use client'

import { User, Mail } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";

export default function ChatSection() {
  const [isActive, setIsActive] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", isUser: false },
    { id: 2, text: "Can you help me set up a new project?", isUser: true },
    { id: 3, text: "Absolutely! I'll guide you through the setup process step by step.", isUser: false }
  ]);

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
          <p className="text-xs text-gray-500">{isActive ? 'Active' : 'Inactive'}</p>
        </div>
        {/* Spacer */}
        <div className="ml-auto"></div>
        {/* Active/Inactive Toggle */}
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-3 py-1 rounded-md hover:bg-blue-600 transition-colors ${
            isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </button>
        <SidebarTrigger/>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg rounded-lg p-3 ${
              message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
            } text-sm`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-2 p-4 border-t border-gray-200">
        <textarea
          className="flex-1 min-h-12 resize-none border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
          placeholder="Ask your agent anything..."
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center text-xs">
          <Mail className="size-4" /> Send
        </button>
      </div>
    </div>
  );
}