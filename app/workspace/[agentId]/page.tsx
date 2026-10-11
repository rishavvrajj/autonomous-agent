import ChatSection from "@/components/custom/ChatSection";
import AgentSidebar from "@/components/custom/AgentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AgentSpacePage() {
  return (
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
  );
}