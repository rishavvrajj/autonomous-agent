'use client'

import { ChevronUp, PlusIcon, Settings2, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AgentConfigType } from "@/types/AgentConfig";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AppSidebar() {
  const [agent, setAgent] = useState<AgentConfigType[]>([]);
  const [workspaceAvatarSeed, setWorkspaceAvatarSeed] = useState<string | null>(null);
  const [userAvatarSeed, setUserAvatarSeed] = useState<string | null>(null);
  const [marketplaceAgents, setMarketplaceAgents] = useState<Array<any>>([]);

  const GetUserAgent = async () => {
    try {
      const result = await axios.get("/api/agent-config");
      setAgent(result.data.agentConfig);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Failed to fetch agent config:",
          error.response?.status,
          error.config?.url
        );
      } else {
        console.error(error);
      }
    }
  };

  const path = usePathname();

  useEffect(() => {
    GetUserAgent();

    // Generate seeds for avatar images to ensure consistency between server and client
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      setWorkspaceAvatarSeed(crypto.randomUUID());
      setUserAvatarSeed(crypto.randomUUID());

      // Generate marketplace agent seeds
      const marketAgents = [
        {
          id: "research-agent",
          name: "Research Agent",
          seed: crypto.randomUUID(),
          description: "Researches a topic and summarizes reliable sources.",
          category: "Research",
          rating: 4.9,
          installs: 1280,
        },
        {
          id: "workflow-agent",
          name: "Workflow Agent",
          seed: crypto.randomUUID(),
          description: "Automates repetitive tasks across your workflows.",
          category: "Automation",
          rating: 4.8,
          installs: 940,
        },
        {
          id: "support-agent",
          name: "Support Agent",
          seed: crypto.randomUUID(),
          description: "Drafts helpful replies to common customer questions.",
          category: "Customer support",
          rating: 4.7,
          installs: 760,
        },
        {
          id: "data-analyst",
          name: "Data Analyst",
          seed: crypto.randomUUID(),
          description: "Explores datasets and turns findings into clear summaries.",
          category: "Analytics",
          rating: 4.9,
          installs: 680,
        },
        {
          id: "content-agent",
          name: "Content Agent",
          seed: crypto.randomUUID(),
          description: "Creates and refines content from your notes and briefs.",
          category: "Content",
          rating: 4.6,
          installs: 520,
        }
      ];
      setMarketplaceAgents(marketAgents);
    }
  }, [path]);

  const session = useSession();
  const userImage = session.data?.user?.image

  return (
    <>
      <Sidebar side="left" collapsible="icon" className="text-neutral-800 dark:text-neutral-200">
        <SidebarHeader className="">
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/workspace" className="flex items-center gap-2">
                <SidebarMenuButton
                  tooltip="Rishav Admin"
                  className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                >
                  {workspaceAvatarSeed ? (
                    <img src={`https://api.dicebear.com/10.x/fun-emoji/svg?backgroundColor=ffe3ea,e3edff,e2f5e9,fdf1d4,efe6ff&seed=${workspaceAvatarSeed}`} alt="Workspace" className="h-6 w-6 rounded-sm" />
                  ) : (
                    <img src="https://api.dicebear.com/10.x/fun-emoji/svg?backgroundColor=ffe3ea,e3edff,e2f5e9,fdf1d4,efe6ff&seed=placeholder" alt="Workspace" className="h-6 w-6 rounded-sm" />
                  )}
                  <span className="group-data-[collapsible=icon]:hidden text-sm font-medium ">
                    Elysium
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        {/* Create New Agent Button */}
        <SidebarContent className="w-full">
          <SidebarGroup>
            <SidebarGroupLabel className="font-bold">
              Create New Agent
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <Link href="/workspace/create" className="flex items-center gap-2">
                    <SidebarMenuButton
                      tooltip="Create New Agent"
                      className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                    >
                      <PlusIcon/>
                      <span className="group-data-[collapsible=icon]:hidden text-sm font-medium ">
                        Create New Agent
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


          {/* Your Agents Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="font-bold">
              Your Agents
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {(agent ?? []).map((agentItem) => (
                  <SidebarMenuItem key={agentItem.agentId}>
                    <Link href={`/workspace/${agentItem.agentId}`} >
                      <SidebarMenuButton
                        className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                      >
                        <img src={agentItem.agentImage} alt={`${agentItem.name}`} className="h-6 w-6 rounded-sm" />
                        <span className="group-data-[collapsible=icon]:hidden text-sm font-medium ">
                          {agentItem.name}
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


          <SidebarGroup>

            <SidebarGroupLabel className="font-bold">
              Marketplace
            </SidebarGroupLabel>

            <SidebarGroupContent>

              <SidebarMenu className="gap-1">
                {marketplaceAgents.map((market) => {
                  return (
                    <SidebarMenuItem key={market.id}>
                      <SidebarMenuButton
                        className="justify-start cursor-pointer group-data-[collapsible=icon]:justify-center transition-all duration-300 card"
                      >
                        {market.seed ? (
                          <img src={`https://api.dicebear.com/10.x/gaze/svg?tags=animation&seed=${market.seed}`} alt={`${market.name} icon`} className="h-6 w-6 rounded-sm" />
                        ) : (
                          <img src={`https://api.dicebear.com/10.x/gaze/svg?tags=animation&seed=placeholder`} alt={`${market.name} icon`} className="h-6 w-6 rounded-sm" />
                        )}
                        <span className="group-data-[collapsible=icon]:hidden text-sm font-medium ">
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
                      {userImage ? (
                        <img src={userImage} alt="Profile" className="size-6 rounded-sm" />
                      ) : (
                        userAvatarSeed ? (
                          <img src={`https://api.dicebear.com/10.x/fun-emoji/svg?tags=animation&seed=${userAvatarSeed}`} alt="Profile" className="size-6 rounded-sm" />
                        ) : (
                          <img src="https://api.dicebear.com/10.x/fun-emoji/svg?tags=animation&seed=placeholder" alt="Profile" className="size-6 rounded-sm" />
                        )
                      )}
                      <span className="group-data-[collapsible=icon]:hidden">
                        Rishav
                      </span>

                      <ChevronUp className="ml-auto group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                  }
                />

                <DropdownMenuContent side="top" align="start">
                  <DropdownMenuItem className={'cursor-pointer transition-all duration-300 card'}>
                    <User2/>
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem className={'cursor-pointer transition-all duration-300 card'}>
                    <Settings2/>
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