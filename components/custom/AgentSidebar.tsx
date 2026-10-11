'use client'

import { useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Calendar, Loader2, Settings, Shuffle, Slack, User } from 'lucide-react'
import { Separator } from '../ui/separator';

export default function AgentSidebar() {
    const [activeTab, setActiveTab] = useState('settings')

    return (
        <Sidebar side="right" className="text-neutral-800 dark:text-neutral-200">

            <SidebarHeader className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-col items-start justify-start gap-3">
                            <h2 className="text-sm font-semibold">Agent Configuration</h2>

                            {/* Agent Image/Avatar and Shuffle Avatar button */}
                            <div className="flex items-center gap-3 w-full">
                                <div className="flex shrink-0 items-center justify-center rounded-lg overflow-hidden border border-sidebar-border">
                                    <img
                                        src={`https://api.dicebear.com/10.x/fun-emoji/svg?backgroundColor=ffe3ea,e3edff,e2f5e9,fdf1d4,efe6ff&seed=${crypto.randomUUID()}`}
                                        alt="Agent avatar"
                                        className="h-16 w-16 rounded-lg"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 min-w-0 flex-1">
                                    <input
                                        type="text"
                                        className="w-full rounded-md border border-sidebar-border bg-transparent px-2 py-1.5 text-sm outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring"
                                        defaultValue="Agent Name"
                                    />

                                    <div className="flex items-center justify-between gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 cursor-pointer rounded-md bg-sidebar-accent px-2 py-1 text-xs font-medium text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
                                        >
                                            <Shuffle className="size-3" />
                                            Shuffle
                                        </button>

                                        <button
                                            type="button"
                                            className="rounded-md bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <Separator />

            <SidebarContent className="w-full">
                {/* Icon-only tab bar */}
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold">
                        Configuration Tabs
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="flex px-2 gap-2">
                            {/* Settings Tab */}
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`flex items-center justify-center size-6 cursor-pointer border border-gray-300 rounded ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                title="Settings"
                            >
                                <Settings className="size-4" />
                            </button>
                            {/* Tools Tab */}
                            <button
                                onClick={() => setActiveTab('tools')}
                                className={`flex items-center justify-center size-6 cursor-pointer border border-gray-300 rounded ${activeTab === 'tools' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                title="Tools"
                            >
                                <Slack className="size-4" />
                            </button>
                            {/* Schedule Tab */}
                            <button
                                onClick={() => setActiveTab('schedule')}
                                className={`flex items-center justify-center size-6 cursor-pointer border border-gray-300 rounded ${activeTab === 'schedule' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                title="Schedule"
                            >
                                <Calendar className="size-4" />
                            </button>
                            {/* Agent Settings Tab */}
                            <button
                                onClick={() => setActiveTab('agent-settings')}
                                className={`flex items-center justify-center size-6 cursor-pointer border border-gray-300 rounded ${activeTab === 'agent-settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                                title="Agent Settings"
                            >
                                <User className="size-4" />
                            </button>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Tab Content */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        {activeTab === 'settings' && (
                            <div className="space-y-3 px-2">
                                <div className="space-y-2">
                                    <label className="block text-xs font-medium text-gray-700">Agent Description</label>
                                    <textarea className="border border-gray-300 rounded px-2 py-1 w-full h-12 placeholder-gray-400 text-xs" placeholder="Enter agent description..." />
                                    <label className="block text-xs font-medium text-gray-700 mt-2">Agent Instructions</label>
                                    <textarea className="border border-gray-300 rounded px-2 py-1 w-full h-16 placeholder-gray-400 text-xs" placeholder="Enter agent instructions..." />
                                </div>
                            </div>
                        )}
                        {activeTab === 'tools' && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                        <div className='flex items-center gap-2'>
                                            <Slack className="size-5 text-blue-500" />
                                            <div>
                                                <h4 className="text-xs">Slack</h4>
                                                <p className="text-xs text-gray-500">Team communication</p>
                                            </div>
                                        </div>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs">
                                            Connect
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                        <div className='flex items-center gap-2'>
                                            <User className="size-5 text-green-500" />
                                            <div>
                                                <h4 className="text-xs">Gmail</h4>
                                                <p className="text-xs text-gray-500">Email integration</p>
                                            </div>
                                        </div>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs">
                                            Connect
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                        <div className='flex items-center gap-2'>
                                            <Calendar className="size-5 text-purple-500" />
                                            <div>
                                                <h4 className="text-xs">Google Calendar</h4>
                                                <p className="text-xs text-gray-500">Schedule management</p>
                                            </div>
                                        </div>
                                        <button className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs">
                                            Connect
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'schedule' && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-1">
                                        <input type="radio" id="manual" name="scheduleType" defaultChecked className="h-3 w-3 text-blue-500" />
                                        <label className="text-xs font-medium text-gray-700 cursor-pointer" htmlFor="manual">
                                            Manual
                                        </label>
                                    </div>
                                    <div className="flex items-start gap-1">
                                        <input type="radio" id="recurring" name="scheduleType" className="h-3 w-3 text-blue-500" />
                                        <label className="text-xs font-medium text-gray-700 cursor-pointer" htmlFor="recurring">
                                            Recurring
                                        </label>
                                    </div>
                                    <div className="flex items-start gap-1">
                                        <input type="radio" id="specific-time" name="scheduleType" className="h-3 w-3 text-blue-500" />
                                        <label className="text-xs font-medium text-gray-700 cursor-pointer" htmlFor="specific-time">
                                            Specific Time
                                        </label>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <label className="block text-xs font-medium text-gray-700">Frequency</label>
                                        <select className="border border-gray-300 rounded px-1 py-1 w-full text-xs">
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <label className="block text-xs font-medium text-gray-700">Time</label>
                                        <input type="time" className="border border-gray-300 rounded px-1 py-1 w-full text-xs" />
                                    </div>
                                    <div className="mt-2 space-y=1">
                                        <label className="block text-xs font-medium text-gray-700">Days</label>
                                        <div className="flex flex-wrap gap-1">
                                            <button className="px-1 py=0.5 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300">Mon</button>
                                            <button className="px-1 py=0.5 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300">Tue</button>
                                            <button className="px-1 py=0.5 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300">Wed</button>
                                            <button className="px-1 py=0.5 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300">Thu</button>
                                            <button className="px-1 py=0.5 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300">Fri</button>
                                            <button className="px-1 py=0.5 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300">Sat</button>
                                            <button className="px-1 py=0.5 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300">Sun</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'agent-settings' && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-1">
                                        <input type="checkbox" id="notifications" className="h-3 w-3 text-blue-500" />
                                        <label className="text-xs font-medium text-gray-700 cursor-pointer" htmlFor="notifications">
                                            Enable notifications
                                        </label>
                                    </div>
                                    <div className="flex items-start gap-1">
                                        <input type="checkbox" id="auto-save" className="h-3 w-3 text-blue-500" />
                                        <label className="text-xs font-medium text-gray-700 cursor-pointer" htmlFor="auto-save">
                                            Auto-save conversations
                                        </label>
                                    </div>
                                    <div className="flex items-start gap-1">
                                        <input type="checkbox" id="memory" className="h-3 w-3 text-blue-500" />
                                        <label className="text-xs font-medium text-gray-700 cursor-pointer" htmlFor="memory">
                                            Persistent memory
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <Separator />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarGroupContent>
                            <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs w-full">
                                Delete Agent
                            </button>
                        </SidebarGroupContent>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}