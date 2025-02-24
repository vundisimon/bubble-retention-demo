//Not in use 

"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Mic, Paperclip, SmilePlus } from "lucide-react"
import oscarAvatar from "@/components/img/top.png"

interface Message {
  id: number
  content: string
  sender: 'user' | 'assistant'
  timestamp: string
  isTyping?: boolean
  showProgress?: boolean
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isAutoPilot, setIsAutoPilot] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const simulateTypingEffect = async (message: string, delay: number = 2500) => {
    setIsTyping(true)
    const newMessage: Message = {
      id: Date.now(),
      content: '',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString(),
      isTyping: true
    }
    setMessages(prev => [...prev, newMessage])

    await new Promise(resolve => setTimeout(resolve, delay))
    
    setMessages(prev => prev.map(msg => 
      msg.id === newMessage.id 
        ? { ...msg, content: message, isTyping: false }
        : msg
    ))
    setIsTyping(false)
  }

  const simulateWebsiteScraping = async () => {
    const scrapingMessage: Message = {
      id: Date.now(),
      content: "Scraping website and analyzing data...",
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString(),
      showProgress: true
    }
    setMessages(prev => [...prev, scrapingMessage])

    await new Promise(resolve => setTimeout(resolve, 6000))

    const completionMessage = "Done! I've checked your website to learn more about your brand and the products you offer. I've also populated the brand kit with all the relevant information from your brand. What would you like us to do next?"
    await simulateTypingEffect(completionMessage)
    
    setMessages(prev => prev.filter(msg => msg.id !== scrapingMessage.id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Demo script for Scene 1
    if (inputValue.toLowerCase().includes('scrape') && inputValue.toLowerCase().includes('website')) {
     await simulateWebsiteScraping()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)] md:h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-[#232323] gap-4 md:gap-0">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={oscarAvatar.src} alt="Oscar" />
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
          <span className="text-white font-medium">Oscar</span>
        </div>
        <div className="flex items-center gap-2 bg-[#141414] rounded-full p-1">
          <span className={`text-sm px-3 py-1 rounded-full transition-colors ${!isAutoPilot ? 'text-white' : 'text-gray-500'}`}>
            Auto Pilot
          </span>
          <Switch
            checked={isAutoPilot}
            onCheckedChange={setIsAutoPilot}
            className="bg-[#F7B928] data-[state=checked]:bg-[#F7B928]"
          />
          <span className={`text-sm px-3 py-1 rounded-full transition-colors ${isAutoPilot ? 'text-white' : 'text-gray-500'}`}>
            Co-Pilot
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] p-3 ${
                message.sender === 'user' 
                  ? 'bg-[#F7B928] text-black' 
                  : 'bg-white text-black'
              } rounded-2xl`}>
                {message.isTyping ? (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                ) : message.showProgress ? (
                  <div>
                    <div className="mb-2">{message.content}</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-[#F7B928] rounded-full animate-[progress_6s_ease-in-out]" />
                    </div>
                  </div>
                ) : (
                  message.content
                )}
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-black mt-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-[#141414] rounded-full p-2 max-w-4xl mx-auto">
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <SmilePlus className="h-6 w-6" />
          </Button>
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Send a Message" 
            className="bg-transparent border-none focus-visible:ring-0 text-white"
          />
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Mic className="h-6 w-6" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Paperclip className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  )
} 