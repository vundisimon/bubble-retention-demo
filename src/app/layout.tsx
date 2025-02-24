"use client"

import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Toaster } from 'sonner'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsMobileSidebarOpen(false),
    onSwipedRight: () => setIsMobileSidebarOpen(true),
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 10,
    swipeDuration: 500,
  })

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <TooltipProvider>
          <div className="h-screen flex" {...handlers}>
            {/* Mobile overlay */}
            {isMobileSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 md:hidden z-40"
                onClick={() => setIsMobileSidebarOpen(false)}
              />
            )}

            {/* Sidebar with mobile controls */}
            <div className={cn(
              "fixed md:static md:translate-x-0 z-50",
              "transition-transform duration-300 ease-in-out",
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
              <Sidebar 
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
              />
            </div>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[rgba(0,0,0,1)] to-[rgba(49,37,4,1)] w-full">
              {children}
            </main>
          </div>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  )
}
