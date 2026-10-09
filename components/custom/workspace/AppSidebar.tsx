import * as React from "react";
import { ChevronUp, Monitor, Plus, Settings, ShoppingBag, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AppSidebar() {
  // Placeholder agent data
  const placeholderAgents = [
    { id: 1, name: "Agent Alpha", image: "/placeholder-agent-1.jpg" },
    { id: 2, name: "Agent Beta", image: "/placeholder-agent-2.jpg" },
    { id: 3, name: "Agent Gamma", image: "/placeholder-agent-3.jpg" },
  ];

  const MarketplaceAgent = [
    {
      id: "research-agent",
      name: "Research Agent",
      image: "/agents/research.png",
      description: "Researches a topic and summarizes reliable sources.",
      category: "Research",
      rating: 4.9,
      installs: 1280,
    },
    {
      id: "workflow-agent",
      name: "Workflow Agent",
      image: "/agents/workflow.png",
      description: "Automates repetitive tasks across your workflows.",
      category: "Automation",
      rating: 4.8,
      installs: 940,
    },
    {
      id: "support-agent",
      name: "Support Agent",
      image: "/agents/support.png",
      description: "Drafts helpful replies to common customer questions.",
      category: "Customer support",
      rating: 4.7,
      installs: 760,
    },
    {
      id: "data-analyst",
      name: "Data Analyst",
      image: "/agents/analytics.png",
      description: "Explores datasets and turns findings into clear summaries.",
      category: "Analytics",
      rating: 4.9,
      installs: 680,
    },
    {
      id: "content-agent",
      name: "Content Agent",
      image: "/agents/content.png",
      description: "Creates and refines content from your notes and briefs.",
      category: "Content",
      rating: 4.6,
      installs: 520,
    },
  ]

  return (
    <>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Rishav Admin"
                className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
              >
                <Link href="/workspace" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden text-sm font-medium text-gray-900">
                    Spotify
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarSeparator />

        {/* Create New Agent Button */}
        <SidebarContent className="w-full">

          <SidebarGroup>
            <SidebarGroupLabel className="font-bold">
              Create New Agent
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Create New Agent"
                    className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                  >
                    <Link href="/workspace/create" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden text-sm font-medium text-gray-900">
                        Create New Agent
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Your Agents Section */}
          <SidebarGroup>

            <SidebarGroupLabel className="font-bold">
              Your Agents
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {placeholderAgents.map((agent) => (
                  <SidebarMenuItem key={agent.id}>
                    <SidebarMenuButton
                      className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                    >
                      <User2 className="h-4 w-4" />
                      <span className="group-data-[collapsible=icon]:hidden text-sm font-medium text-gray-900">
                        {agent.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>

            <SidebarGroupLabel className="font-bold">
              Marketplace
            </SidebarGroupLabel>

            <SidebarGroupContent>

              <SidebarMenu className="gap-1">
                {MarketplaceAgent.map((market) => {
                  // Choose appropriate icon based on category
                  let iconElement;
                  switch (market.category) {
                    case "Research":
                      iconElement = <Monitor className="h-4 w-4" />;
                      break;
                    case "Automation":
                      iconElement = <Plus className="h-4 w-4" />;
                      break;
                    case "Customer support":
                      iconElement = <Settings className="h-4 w-4" />;
                      break;
                    case "Analytics":
                      iconElement = <Monitor className="h-4 w-4" />;
                      break;
                    case "Content":
                      iconElement = <Settings className="h-4 w-4" />;
                      break;
                    default:
                      iconElement = <User2 className="h-4 w-4" />;
                  }

                  return (
                    <SidebarMenuItem key={market.id}>
                      <SidebarMenuButton
                        className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                      >
                        {iconElement}
                        <span className="group-data-[collapsible=icon]:hidden text-sm font-medium text-gray-900">
                          {market.name}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>
        {/* User menu */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      tooltip="Rishav's account"
                      className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                    >
                      <User2 className="size-4" />

                      <span className="group-data-[collapsible=icon]:hidden">
                        Rishav
                      </span>

                      <ChevronUp className="ml-auto group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  }
                />

                <DropdownMenuContent side="top" align="start">
                  <DropdownMenuItem className={'cursor-pointer transition-all duration-300 card'}>
                    <User2 className="mr-2 size-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem className={'cursor-pointer transition-all duration-300 card'}>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem variant="destructive" className={'cursor-pointer transition-all duration-300 card'}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}