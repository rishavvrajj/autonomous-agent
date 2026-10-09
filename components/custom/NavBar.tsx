'use client'

import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function NavBar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme();

    const segments = pathname.split("/").filter(Boolean)

    const routeLabels: Record<string, string> = {
        dashboard: "Dashboard",
        profile: "Profile",
        settings: "Settings",
        projects: "Projects",
        analytics: "Analytics",
    }

    const formatSegment = (segment: string) => {
        return (
            routeLabels[segment] ??
            decodeURIComponent(segment)
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())
        )
    }

    const SwitchTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <nav className='flex items-center justify-between sticky z-10 top-0 px-2 p-1 w-full'>

            {/* Nav */}
            <div className='flex items-center justify-center'>
                <SidebarTrigger size={"icon-lg"} />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link href="/" />}>
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {segments.map((segment, index) => {
                            const href = `/${segments.slice(0, index + 1).join("/")}`
                            const isCurrentPage = index === segments.length - 1

                            return (
                                <div key={href} className="contents">
                                    <BreadcrumbSeparator />

                                    <BreadcrumbItem>
                                        {isCurrentPage ? (
                                            <BreadcrumbPage>
                                                {formatSegment(segment)}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink render={<Link href={href} />}>
                                                {formatSegment(segment)}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Menu */}
            <div className='flex items-center justify-end space-x-2'>

                {/* Theme Switcher */}
                <div className='flex items-center justify-center p-2 rounded-lg border border-neutral-200 dark:border-neutral-700'>
                    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='top-0 left-0 h-4 w-4 relative items-center justify-center text-neutral-600 dark:text-neutral-400 hover:cursor-pointer hover:rotate-12 transition-transform duration-200'>
                        <Sun size={16} className='absolute dark:scale-0 dark:rotate-45 inset-0 w-full h-full transition-all duration-300' />
                        <Moon size={12} className='absolute scale-0 dark:scale-100 inset-0 w-full h-full transition-all duration-300' />
                    </button>
                </div>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={<Button variant="outline" size="icon" className="cursor-pointer mr-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700" />}
                    >
                        <Avatar size='sm' className="cursor-pointer">
                            <AvatarImage src="/favicon.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10} className='bg-white dark:bg-gray-800 border border-neutral-200 dark:border-neutral-700'>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className='text-neutral-600 dark:text-neutral-400'>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className='border-neutral-200 dark:border-neutral-700' />
                            <DropdownMenuItem>
                                <User className='h-[1.2rem] w-[1.2rem] cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100' />
                                <span className='ml-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className='h-[1.2rem] w-[1.2rem] cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100' />
                                <span className='ml-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant='destructive' className='text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700'>
                                <LogOut className='h-[1.2rem] w-[1.2rem] cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100' />
                                <span className='ml-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}