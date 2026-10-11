import React from 'react';
import AppSidebar from '@/components/custom/workspace/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}