import * as React from "react";
import { Monitor, Plus, ShoppingBag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  // Placeholder agent data
  const placeholderAgents = [
    { id: 1, name: "Agent Alpha", image: "/placeholder-agent-1.jpg" },
    { id: 2, name: "Agent Beta", image: "/placeholder-agent-2.jpg" },
    { id: 3, name: "Agent Gamma", image: "/placeholder-agent-3.jpg" },
  ];

  return (
    <Sidebar>
      <SidebarTrigger aria-label="Open sidebar">
        <Monitor className="h-4 w-4" />
      </SidebarTrigger>
      <SidebarContent>
        <SidebarHeader className="flex items-center space-x-3 mb-6">
          <Monitor className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-900">Orbit</span>
        </SidebarHeader>

        {/* Create New Agent Button */}
        <SidebarGroup>
          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">Create New Agent</span>
          </button>
        </SidebarGroup>

        {/* Your Agents Section */}
        <SidebarGroup>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Your Agents
          </h3>
          <SidebarMenu className="space-y-2">
            {placeholderAgents.map((agent) => (
              <SidebarMenuItem
                key={agent.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <img
                  src={agent.image}
                  alt={`${agent.name} avatar`}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-900">{agent.name}</span>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto p-4 border-t border-gray-200">
        {/* Marketplace */}
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600 hover:text-gray-800 transition-colors">
          <ShoppingBag className="h-4 w-4" />
          <span>Marketplace</span>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <img
            src="/placeholder-user.jpg"
            alt="User avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}