import NavBar from "@/components/custom/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full w-full">
            <NavBar />
            <div className="flex-1 w-full">
                <SidebarProvider className="h-full !min-h-0">
                    {children}
                </SidebarProvider>
            </div>
        </div>
    )
}