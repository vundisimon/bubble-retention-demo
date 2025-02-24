"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Calendar, 
  BarChart2, 
  MessageSquare, 
  Share2, 
  ChevronLeft,
  ChevronRight,
  Settings,
  Megaphone,
  GitBranch,
  Star,
  Repeat
} from "lucide-react"
import Image from "next/image"
import sautiIcon from "@/components/img/logo.png"
import oscarAvatar from "@/components/img/top.png"
import userAvatar from "@/components/img/set.png"

import { create } from 'zustand'

interface SidebarStore {
  isOpen: boolean
  toggle: () => void
}

export const useSidebar = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

const routes = [
  {
    label: 'Chats',
    icon: MessageSquare,
    href: '/chats',
  },
  {
    label: 'Calendar',
    icon: Calendar,
    href: '/calendar',
  },
  {
    label: 'Analytics',
    icon: BarChart2,
    href: '/analytics',
  },
  {
    label: 'Campaigns',
    icon: Megaphone,
    href: '/campaigns',
  },
  {
    label: 'Flows',
    icon: GitBranch,
    href: '/flows',
  },
  {
    label: 'Loyalty',
    icon: Star,
    href: '/loyalty',
  },
  {
    label: 'Subscriptions',
    icon: Repeat,
    href: '/subscriptions',
  },
 // {
 //   label: 'Settings',
 //   icon: Settings,
 //   href: '/settings',
 // },
]

export interface SidebarMenuItemProps {
  icon: any
  label: string
  href: string
  onClick?: () => void
}

export const SidebarMenuItem = ({ icon: Icon, label, href, onClick }: SidebarMenuItemProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </Link>
  )
}

export const SidebarMenuButton = ({
  icon: Icon,
  label,
  onClick
}: {
  icon: any
  label: string
  onClick: () => void
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 py-4 transition-all hover:text-slate-600 hover:bg-slate-300/20"
    >
      <Icon size={22} className="text-slate-500" />
      {label}
    </button>
  )
}

export const SidebarMenu = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarMenuItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

interface SidebarProps {
  className?: string
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ className, isMobileOpen, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "relative h-full",
      className
    )}>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "h-full flex flex-col border-r border-[#F7B928]/30",
        "bg-[#141414] bg-gradient-to-b from-[#141414] to-[#1a1a1a]",
        isCollapsed ? "w-[80px]" : "w-[240px]",
        "transition-all duration-300"
      )}>
        {/* Collapse button - only show on desktop */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-[-12px] top-6 rounded-full bg-[#232323] p-1 hover:bg-[#2a2a2a] hidden md:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <div className="flex h-full w-full flex-col space-y-4 py-4">
          {/* Logo */}
          <div className={cn("px-3 py-2", isCollapsed && "flex justify-center")}>
            <div className="flex items-center gap-2">
              <Image 
                src={sautiIcon}
                alt="Sauti Logo" 
                width={isCollapsed ? 40 : 100} 
                height={isCollapsed ? 40 : 100} 
              />
            </div>
          </div>

          {/* User Profile */}
          <div className={cn("px-3", isCollapsed && "flex justify-center")}>
            <div className={cn(
              "flex items-center gap-3",
              isCollapsed && "flex-col gap-1"
            )}>
              <Avatar className="border-2 border-[#F7B928]/30">
                <AvatarImage src={oscarAvatar.src} alt="Oscar" />
                <AvatarFallback>O</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-medium text-white">Oscar</span>
                  <span className="text-xs text-[#F7B928]">The Retention Marketer</span>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-[#232323]" />

          {/* Navigation */}
          <nav className={cn(
            "flex-1 px-3 space-y-1",
            isCollapsed && "flex flex-col items-center px-2"
          )}>
            {routes.map((route) => (
              <Tooltip key={route.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={route.href}
                    onClick={() => onMobileClose?.()}  // Close sidebar on mobile when navigating
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      "text-gray-300 hover:text-white hover:bg-[#232323]",
                      pathname === route.href && "bg-[#232323] text-white",
                      isCollapsed && "justify-center p-2"
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {!isCollapsed && route.label}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {route.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>

          {/* Footer */}
          <div className={cn(
            "mt-auto px-3 flex flex-col items-center",
            isCollapsed && "px-2"
          )}>
            <Separator className="mb-4 bg-[#232323] w-full" />
            <div className="mb-4 flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/settings">
                    <Avatar className="border-2 border-[#F7B928]/30 cursor-pointer hover:opacity-90 transition">
                      <AvatarImage src={userAvatar.src} alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    Settings
                  </TooltipContent>
                )}
              </Tooltip>
            </div>
            {!isCollapsed && (
              <Button 
                variant="ghost" 
                className="bg-[#F7B928] text-black hover:bg-[#F7B928]/90 w-fit px-4"
                size="sm"
              >
                Product feedback
              </Button>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}
