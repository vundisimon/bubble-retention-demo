"use client"

import { Mail, MessageSquare, Clock, Send, FileEdit } from "lucide-react"
import Image from "next/image"
import top from "@/components/img/top.png"
import { ChatModal } from "@/components/ui/chat-modal"
import { useState } from "react"

// Dummy data for flows
const flows = [
  {
    id: 1,
    type: "email",
    name: "Abandoned Cart",
    date: "Yesterday 4:00pm",
    status: "scheduled",
    revenue: "—",
    recipients: null
  },
  {
    id: 2,
    type: "sms",
    name: "Customer Thankyou",
    date: "8th, September 12:00 noon",
    status: "sent",
    revenue: "$666",
    recipients: "20 Recipients"
  },
  {
    id: 3,
    type: "email",
    name: "Product Review",
    date: "6th, September 11:00am",
    status: "sent",
    revenue: "$2000",
    recipients: "50 Recipients"
  },
  {
    id: 4,
    type: "email",
    name: "Welcome Series",
    date: "6th, September 11:00am",
    status: "draft",
    revenue: "—",
    recipients: null
  },
]

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'scheduled':
      return <Clock className="w-4 h-4 text-yellow-500" />
    case 'sent':
      return <Send className="w-4 h-4 text-emerald-500" />
    case 'draft':
      return <FileEdit className="w-4 h-4 text-zinc-500" />
    default:
      return null
  }
}

export default function FlowsPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header with gold underline */}
      <div className="relative pb-0.5">
        <div className="p-2 md:p-4">
          <div className="flex items-center gap-2">
            <Image
              src={top}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-yellow-500 font-semibold text-sm">Oscar</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"></div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-8">
        <div className="rounded-xl border border-yellow-500/50 bg-zinc-900/50">
          {/* Flows Header */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-yellow-500 mb-8">Flows</h2>
            
            {/* Column Headers */}
            <div className="grid grid-cols-12 gap-4 mb-4 px-2">
              <div className="col-span-5 text-zinc-400">Flows</div>
              <div className="col-span-4 text-zinc-400">Status</div>
              <div className="col-span-3 text-right text-zinc-400">Revenue</div>
            </div>

            {/* Flow Rows */}
            <div className="space-y-6">
              {flows.map((flow) => (
                <div 
                  key={flow.id} 
                  className="grid grid-cols-12 gap-4 py-4 border-t border-zinc-800"
                >
                  {/* Flow Info */}
                  <div className="col-span-5">
                    <div className="flex items-start gap-3">
                      {flow.type === 'email' 
                        ? <Mail className="w-5 h-5 text-zinc-400" />
                        : <MessageSquare className="w-5 h-5 text-zinc-400" />
                      }
                      <div>
                        <div className="font-medium">{flow.name}</div>
                        <div className="text-sm text-zinc-500">{flow.date}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={flow.status} />
                      <span className="capitalize">{flow.status}</span>
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="col-span-3 text-right">
                    <div>{flow.revenue}</div>
                    {flow.recipients && (
                      <div className="text-sm text-zinc-500">{flow.recipients}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal Trigger */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <button 
          className={`rounded-full overflow-hidden w-10 h-10 md:w-12 md:h-12 border transition-colors ${
            isChatOpen ? 'border-yellow-500' : 'border-zinc-800 hover:border-zinc-700'
          }`}
          onClick={toggleChat}
        >
          <Image
            src={top}
            alt="Chat"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {isChatOpen && (
        <ChatModal 
          isOpen={isChatOpen}
          onClose={toggleChat}
          userAvatar={top.src}
          userName="Oscar"
        />
      )}
    </div>
  )
} 