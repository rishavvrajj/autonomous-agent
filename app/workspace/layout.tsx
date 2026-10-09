import React from 'react';
import AppSidebar from '@/components/custom/workspace/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import NavBar from '@/components/custom/NavBar';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                    <NavBar/>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}