"use client"

import { useState, useEffect, KeyboardEvent } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Send, Wand2 } from "lucide-react"

interface EmailChatModalProps {
  isOpen: boolean
  onClose: () => void
  onApplySuggestion: (suggestion: string) => void
  onCampaignScheduled?: () => void
}

interface Message {
  id: number
  content: string
  sender: 'user' | 'assistant'
  suggestion?: string
}

export function EmailChatModal({ isOpen, onClose, onApplySuggestion, onCampaignScheduled }: EmailChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm here to help you refine your email. What would you like to improve?",
      sender: 'assistant'
    }
  ])
  
  const [input, setInput] = useState("")

  const generateSuggestion = async (query: string) => {
    const userMessage: Message = {
      id: Date.now(),
      content: query,
      sender: 'user'
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")

    // Simulate thinking
    const thinkingMessage: Message = {
      id: Date.now() + 1,
      content: "Thinking...",
      sender: 'assistant'
    }
    setMessages(prev => [...prev, thinkingMessage])

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    let response: Message
    const queryLower = query.toLowerCase().trim()
    const triggerWords = ['add', 'more', 'images', 'change', 'color', 'pallete']
    
    if (triggerWords.some(word => queryLower.includes(word))) {
      response = {
        id: Date.now() + 2,
        content: "I'll update the email with a new design. Here's a preview:",
        sender: 'assistant',
        suggestion: "add_valentine_template"
      }
    } else if (queryLower.includes('subject')) {
      response = {
        id: Date.now() + 2,
        content: "I suggest making the subject line more personalized and urgent. Here's a suggestion:",
        sender: 'assistant',
        suggestion: " {{first_name}}, Your Exclusive VIP Early Access Ends Soon!"
      }
    } else if (queryLower.includes('body')) {
      response = {
        id: Date.now() + 2,
        content: "Let's make the email body more engaging with social proof and scarcity. Here's a suggestion:",
        sender: 'assistant',
        suggestion: `Hi {{first_name}},

Last year, VIP members like you saved an average of $250 during our Early Access event. This year's deals are even better!

We've noticed you love {{recent_product_category}}, so we've secured special VIP pricing on these hand-picked items:

{{dynamic_product_recommendations}}

 Your Exclusive VIP Perks (48 hours only):
• Extra 15% off with your code: VIPEARLY
• Double loyalty points on everything
• Free express shipping
• First access to new arrivals

Only 100 VIP spots remaining - shop now before these deals go public!

Happy shopping,
The Team

P.S. Your current loyalty balance: {{loyalty_points}} points`
      }
    } else if (queryLower.includes('preheader')) {
      response = {
        id: Date.now() + 2,
        content: "Let's optimize the preheader with more specific value proposition:",
        sender: 'assistant',
        suggestion: "Save up to 40% + earn 2X points during VIP-only early access"
      }
    } else if (queryLower.includes('image') || queryLower.includes('design')) {
      response = {
        id: Date.now() + 2,
        content: "Try saying 'add more images and change color pallete' to see a new template design.",
        sender: 'assistant'
      }
    } else {
      response = {
        id: Date.now() + 2,
        content: "I can help you improve the subject line, preheader, or email body. What would you like to focus on?",
        sender: 'assistant'
      }
    }

    setMessages(prev => prev.filter(msg => msg.id !== thinkingMessage.id).concat(response))
  }

  useEffect(() => {
    if (isOpen && onCampaignScheduled) {
      const hasSchedulingMessage = messages.some(msg => 
        msg.content.includes("The campaign has been successfully scheduled")
      )
      
      if (!hasSchedulingMessage) {
        const message: Message = {
          id: Date.now(),
          content: "The campaign has been successfully scheduled. I'll monitor it and keep you updated via email and Slack in case of any changes.",
          sender: 'assistant'
        }
        setMessages(prev => [...prev, message])
      }
    }
  }, [isOpen, onCampaignScheduled])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      generateSuggestion(input.trim())
    }
  }

  const handleApplySuggestion = (suggestion: string) => {
    if (suggestion === 'add_valentine_template') {
      // Special handling for Valentine's template
      onApplySuggestion('add more images and change color pallete')
      onClose()
    } else {
      onApplySuggestion(suggestion)
    }
  }

  const handleNewChat = () => {
    setMessages([{
      id: 1,
      content: "Hi! I'm here to help you refine your email. What would you like to improve?",
      sender: 'assistant'
    }])
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#212121] text-white">
        <DialogTitle className="text-lg font-semibold mb-1">Email Co-Pilot</DialogTitle>
        <p className="text-sm text-gray-400 mb-4">
          Ask for suggestions to improve your email content
        </p>
        <div className="flex flex-col h-[400px]">
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
                    {message.suggestion && (
                      <div className="mt-2">
                        <div className="bg-[#1a1a1a] p-2 rounded-md text-white text-sm whitespace-pre-wrap">
                          {message.suggestion === 'add_valentine_template' ? 
                            "New template design" :
                            message.suggestion
                          }
                        </div>
                        <Button
                          size="sm"
                          className="mt-2 bg-[#F7B928] text-black hover:bg-[#E5A922]"
                          onClick={() => handleApplySuggestion(message.suggestion!)}
                        >
                          <Wand2 className="h-4 w-4 mr-2" />
                          Apply Suggestion
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for suggestions..."
              className="bg-[#333] border-gray-600 text-white"
            />
            <Button
              onClick={() => input.trim() && generateSuggestion(input.trim())}
              className="bg-[#F7B928] text-black hover:bg-[#E5A922]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
