"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CampaignChatModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: number
  content: string
  sender: 'user' | 'assistant'
}

export function CampaignChatModal({ isOpen, onClose }: CampaignChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "The email has been scheduled for next Tuesday at 10 AM. I'll track open rates, click-through rates, and conversions in real-time. I'll notify you if there are any significant drops or changes in engagement so we can adjust the strategy.",
      sender: 'assistant'
    }
  ])

  const addMessage = async (content: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now(),
      content,
      sender
    }
    setMessages(prev => [...prev, newMessage])

    if (sender === 'user' && content.toLowerCase().includes('thank')) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const response: Message = {
        id: Date.now() + 1,
        content: "Scheduling on Calendar",
        sender: 'assistant'
      }
      setMessages(prev => [...prev, response])
      
      // Close the modal after a short delay
      setTimeout(() => {
        onClose()
      }, 1500)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#212121] text-white">
        <DialogTitle className="text-lg font-semibold mb-1">Campaign Status</DialogTitle>
        <div className="flex flex-col h-[300px]">
          <ScrollArea className="flex-1 pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <Card
                    className={`max-w-[80%] p-3 ${
                      message.sender === 'user'
                        ? 'bg-[#F7B928] text-black'
                        : 'bg-[#333] text-white'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={() => addMessage("Thank you. Keep me updated on the progress.", 'user')}
              className="w-full bg-[#F7B928] text-black hover:bg-[#E5A922]"
            >
              Thank you. Keep me updated on the progress.
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
