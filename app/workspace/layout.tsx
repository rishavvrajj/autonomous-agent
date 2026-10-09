import React from 'react';
import AppSidebar from '@/components/custom/workspace/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-50">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <SidebarTrigger/>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}