"use client"

import { useState } from "react"
import { ChatModal } from "@/components/ui/chat-modal"
import { CampaignPerformance } from "@/components/ui/campaign-performance"
import { FlowPerformance } from "@/components/ui/flow-performance"
import { KeyInsights } from "@/components/ui/key-insights"
import top from "@/components/img/top.png"
import Image from "next/image"

type Channel = 'email' | 'shopify' | 'sms'

// Data for different channels
const channelData = {
  shopify: {
    title: "Shopify Performance",
    metrics: ["Orders", "Revenue", "Conversion"],
    values: ["3,456", "$30,980", "102,990"],
    changes: [2.5, -2.5, 0.5]
  },
  email: {
    title: "Email Performance",
    metrics: ["Click Rate", "Open Rate", "Place Order Rate"],
    values: ["3,456", "$30,980", "102,990"],
    changes: [2.5, -2.5, 0.5]
  },
  sms: {
    title: "SMS Performance",
    metrics: ["Opt-in Rate", "Conversion Rate", "Unsubscribe Rate"],
    values: ["3,456", "$30,980", "102,990"],
    changes: [2.5, -2.5, 0.5]
  }
}

export default function AnalyticsPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeChannel, setActiveChannel] = useState<Channel>('shopify')

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header with tighter gold underline */}
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
      <div className="p-3 md:p-6 space-y-6 md:space-y-8">
        {/* Time Filter with dropdown icon */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-400">Show:</span>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Weekly</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Channel Tabs */}
        <div className="flex gap-4 md:gap-6 border-b border-zinc-800">
          {(['email', 'shopify', 'sms'] as Channel[]).map((channel) => (
            <button
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`px-1 pb-2 text-sm md:text-base capitalize transition-colors ${
                activeChannel === channel
                  ? 'text-yellow-500 border-b-2 border-yellow-500'
                  : 'text-zinc-400'
              }`}
            >
              {channel}
            </button>
          ))}
        </div>

        {/* Performance Charts */}
        <div className="space-y-6 md:space-y-8">
          <CampaignPerformance 
            title={channelData[activeChannel].title}
            metrics={channelData[activeChannel].metrics}
            values={channelData[activeChannel].values}
            changes={channelData[activeChannel].changes}
          />
          
          {/* Key Insights */}
          <KeyInsights insight={channelData[activeChannel].insight} />

          {/* Show Flow Performance only for email channel */}
          {activeChannel === 'email' && <FlowPerformance />}
        </div>
      </div>

      {/* Chat Modal Trigger - Updated with toggle functionality */}
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