"use client"

import { useState } from "react"
import { format, addMonths, subMonths } from "date-fns"
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { MiniCalendar } from "@/components/ui/mini-calendar"
import { UpcomingEvents } from "@/components/ui/upcoming-events"
import { MainCalendar } from "@/components/ui/main-calendar"
import { ChatModal } from "@/components/ui/chat-modal"
import oscarAvatar from "@/components/img/oscar.png"
import { useEventsStore } from "@/lib/events-store"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2025-02-24T11:54:32+03:00'))
  const [selectedDate, setSelectedDate] = useState(new Date('2025-02-24T11:54:32+03:00'))
  const [calendarView, setCalendarView] = useState('month')
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header */}
      <header className="h-[60px] border-b border-[#333333] flex items-center px-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-[#F7B928]">
            <img src={oscarAvatar.src} alt="Oscar" className="object-cover" />
          </Avatar>
          <span className="text-[#F7B928] font-medium">Oscar</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-60px)]">
        {/* Sidebar - hidden on mobile, shown on md and up */}
        <div className="hidden md:block w-[300px] border-r border-[#333333] p-5 space-y-5 overflow-y-auto custom-scrollbar">
          <MiniCalendar 
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <UpcomingEvents />
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Calendar Controls */}
          <div className="h-[60px] border-b border-[#333333] flex items-center justify-between px-3 md:px-5 shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="text-[#F7B928] hover:bg-[#F7B928]/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <span className="text-base md:text-lg font-medium min-w-[120px] md:min-w-[150px] text-center">
                {format(currentDate, 'MMMM yyyy')}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="text-[#F7B928] hover:bg-[#F7B928]/10"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <select 
                value={calendarView}
                onChange={(e) => setCalendarView(e.target.value)}
                className="hidden md:block bg-[#333333] text-[#F7B928] border border-[#444444] rounded-md px-3 py-1.5 ml-4"
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#F7B928] hover:bg-[#F7B928]/10"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button 
                onClick={() => setIsChatOpen(true)}
                className="bg-[#F7B928] text-black hover:bg-[#F7B928]/90"
              >
                <Plus className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Create</span>
              </Button>
            </div>
          </div>

          {/* Main Calendar Grid */}
          <div className="flex-1 overflow-y-auto">
            <MainCalendar 
              currentDate={currentDate}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              view={calendarView}
            />
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userAvatar={oscarAvatar.src}
        userName="Oscar"
      />

      {/* Chat Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-5 right-5 w-[50px] h-[50px] rounded-full border-2 border-[#F7B928] overflow-hidden hover:scale-105 transition-transform bg-[#1C1C1C] z-50"
      >
        <img src={oscarAvatar.src} alt="Chat" className="w-full h-full object-cover" />
      </button>
    </div>
  )
}