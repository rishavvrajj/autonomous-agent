'use client'

import ChatSection from "@/components/custom/ChatSection";
import AgentSidebar from "@/components/custom/AgentSidebar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AgentConfigContext } from "@/context/agentConfig";
import { toast } from "@/components/ui/toast";

export default function AgentSpacePage() {

  const { agentId } = useParams();
  const [agentConfig, setAgentConfig] = useState<any>()

  const GetAgentConfig = async () => {
    const result = await axios.get("/api/agent-config", {
      params: { agentId },
    });

    setAgentConfig(result.data)
  }

  // const SaveAgentConfig = async () => {

  //   toast.add({
  //     title: "saving agent configuration",
  //     description: "Your agent configuration",
  //     type: "info",
  //   })

  //   const result = await axios.put("/api/agent", agentConfig)
  //   console.log(result.data);

  //   toast.add({
  //     title: "agent configuration saved",
  //     description: "Your agent configuration",
  //     type: "info",
  //   })
  // }

  // useEffect(() => {
  //   agentConfig && SaveAgentConfig()
  // }, [agentConfig])

  useEffect(() => {
    agentId && GetAgentConfig();
  }, [agentId])

  return (
    <AgentConfigContext.Provider value={{ agentConfig, setAgentConfig }}>
      <div className="flex h-full w-full overflow-hidden border-t">
        {/* Center: Chat Section */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <ChatSection />
        </div>

        {/* Right Sidebar: Agent Configuration Sidebar */}
        <div className="relative h-full shrink-0">
          <AgentSidebar />
        </div>
      </div>
    </AgentConfigContext.Provider>
  );
}