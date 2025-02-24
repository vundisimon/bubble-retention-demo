"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Link2, Send, Calendar } from "lucide-react"
import { Avatar } from "./avatar"
import { Message } from "@/types/chat"
import { useEventsStore } from "@/lib/events-store"
import { parseISO, format, parse, addWeeks, startOfWeek, addDays, setDay } from "date-fns"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  userAvatar: string
  userName: string
}

export function ChatModal({ isOpen, onClose, userAvatar, userName }: ChatModalProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { findEventByTitle, rescheduleEvent } = useEventsStore()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault()
          onClose()
        }
      }
      document.addEventListener("keydown", handleEsc)
      return () => document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const parseDateExpression = (dateStr: string): Date | null => {
    const now = new Date('2025-02-24T11:37:34+03:00') // Using provided current time
    const thisWeekMatch = dateStr.match(/this week (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i)
    const nextWeekMatch = dateStr.match(/next week (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i)
    
    if (thisWeekMatch || nextWeekMatch) {
      const isNextWeek = !!nextWeekMatch
      const dayName = (thisWeekMatch?.[1] || nextWeekMatch?.[1])?.toLowerCase()
      const daysMap: { [key: string]: number } = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
      }
      
      const targetDay = daysMap[dayName!]
      const weekStart = startOfWeek(now, { weekStartsOn: 1 }) // Week starts on Monday
      let targetDate = addDays(weekStart, targetDay)
      
      if (isNextWeek) {
        targetDate = addDays(targetDate, 7)
      }
      
      // If the target date is before current date, move to next occurrence
      if (targetDate < now) {
        targetDate = addWeeks(targetDate, 1)
      }
      
      return targetDate
    }

    // Try parsing standard date formats as fallback
    try {
      const formats = [
        'yyyy-MM-dd',
        'MM/dd/yyyy',
        'MMMM d, yyyy',
        'MMM d, yyyy',
        'dd-MM-yyyy'
      ]
      
      for (const fmt of formats) {
        try {
          const parsed = parse(dateStr, fmt, now)
          if (parsed && !isNaN(parsed.getTime())) return parsed
        } catch (e) {
          continue
        }
      }
    } catch (e) {
      return null
    }

    return null
  }

  const handleRescheduleRequest = (eventTitle: string, dateStr: string) => {
    const event = findEventByTitle(eventTitle)
    if (!event) {
      return `🤔 I couldn't find an event with the title "${eventTitle}". Could you please check the event name and try again?`
    }

    try {
      const newDate = parseDateExpression(dateStr)
      
      if (!newDate) {
        return "🤔 I couldn't understand that date. You can say things like:\n" +
               "📅 - this week thursday\n" +
               "📅 - next week monday\n" +
               "📅 - 2024-01-15"
      }

      rescheduleEvent(event.id, newDate.toISOString())
      return `✨ Perfect! I've rescheduled "${event.title}" to ${format(newDate, 'EEEE, MMMM d, yyyy')}. Is there anything else you need help with? 😊`
    } catch (error) {
      return "😅 Oops! I had trouble updating the event. Please try again with a different date format."
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      setMessages([
        ...messages,
        { id: Date.now(), content: message, sender: "user" },
      ])

      // Process message for rescheduling
      const rescheduleMatch = message.match(/reschedule\s+(.+?)\s+to\s+(.+)/i)
      if (rescheduleMatch) {
        const [_, eventTitle, newDate] = rescheduleMatch
        const response = handleRescheduleRequest(eventTitle, newDate)
        
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { id: Date.now(), content: response, sender: "assistant" }
          ])
        }, 500)
      } else {
        // Default response for non-rescheduling messages
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { 
              id: Date.now(), 
              content: "👋 Hi there! I can help you reschedule events. Try saying something like:\n" +
                      "💡 - reschedule Campaign Name to this week thursday\n" +
                      "💡 - reschedule Campaign Name to next week monday", 
              sender: "assistant" 
            }
          ])
        }, 500)
      }

      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed bottom-20 right-5 w-[350px] bg-[#1A1A1A] border border-[#F7B928] 
                 rounded-2xl shadow-lg overflow-hidden transition-all duration-200 z-50"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose()
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#333333] flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <img src={userAvatar} alt={userName} className="object-cover" />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-white">
            Hey There {userName}! 👋
          </h2>
          <p className="text-xs text-gray-400">
            How can I help you today? ✨
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "assistant" && (
              <Avatar className="h-6 w-6 mr-2">
                <img src={userAvatar} alt="AI" className="object-cover" />
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-2xl p-3 ${
                msg.sender === "user"
                  ? "bg-[#F7B928] text-black"
                  : "bg-[#333333] text-white"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-[#333333]">
        <div className="flex items-center gap-2 bg-[#242424] rounded-full p-2 pl-4">
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-[#333333] rounded-full transition-colors">
              <Mic className="w-5 h-5 text-[#F7B928]" />
            </button>
            <button className="p-2 hover:bg-[#333333] rounded-full transition-colors">
              <Link2 className="w-5 h-5 text-[#F7B928]" />
            </button>
            <button className="p-2 hover:bg-[#333333] rounded-full transition-colors">
              <Send className="w-5 h-5 text-[#F7B928]" />
            </button>
            <button className="p-2 hover:bg-[#333333] rounded-full transition-colors">
              <Calendar className="w-5 h-5 text-[#F7B928]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}