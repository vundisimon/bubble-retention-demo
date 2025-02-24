"use client"

import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { Sidebar } from "@/components/ui/sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsMobileSidebarOpen(false),
    onSwipedRight: () => setIsMobileSidebarOpen(true),
    trackMouse: true
  })

  return (
    <div className="h-screen flex" {...handlers}>
      {/* Overlay for mobile swipe */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Your existing Sidebar with added mobile control */}
      <Sidebar 
        className={cn(
          "transition-transform duration-300 ease-in-out z-50",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
} 