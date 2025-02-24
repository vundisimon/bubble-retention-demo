"use client"

import { useState, KeyboardEvent, useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Mic, Paperclip, SmilePlus, Trash2 } from "lucide-react"
import oscarAvatar from "@/components/img/top.png"
import { AutoPilotModal } from "@/components/ui/autopilot-modal"
import { RetentionChart } from "@/components/ui/retention-chart"
import { SegmentChart } from "@/components/ui/segment-chart"
import { EmailPreview } from "@/components/ui/email-preview"
import { CalendarGrid } from "@/components/ui/calendar-grid"

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isTyping?: boolean
  showProgress?: boolean
  showChart?: boolean
  showSegmentChart?: boolean
  showEmailPreview?: boolean
  showCalendar?: boolean
  emailContent?: {
    subject: string
    preheader: string
    body: string
    segment: {
      name: string
      size: number
      criteria: string[]
    }
    metrics: {
      source: string
      value: string
      trend: string
    }[]
    isValentineTemplate?: boolean
  }
}

interface EmailContent {
  subject: string
  preheader: string
  body: string
  segment: {
    name: string
    size: number
    criteria: string[]
  }
  metrics: {
    source: string
    value: string
    trend: string
  }[]
  isValentineTemplate?: boolean
}

const EMOJI_LIST = [
  '😊', '😂', '🥰', '😎', '🤔', '👍', '❤️', '🎉',
  '🔥', '✨', '🙌', '💪', '🤝', '👏', '🌟', '💯'
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('mainChatMessages')
      return savedMessages ? JSON.parse(savedMessages) : [{
        id: Date.now(),
        role: 'assistant',
        content: "Hi! I'm Oscar, your AI retention marketer. I can help you analyze customer data and create personalized campaigns. Would you like to create an email campaign? 🤔",
        timestamp: new Date().toLocaleTimeString()
      }]
    }
    return [{
      id: Date.now(),
      role: 'assistant',
      content: "Hi! I'm Oscar, your AI retention marketer. I can help you analyze customer data and create personalized campaigns. Would you like to create an email campaign? 🤔",
      timestamp: new Date().toLocaleTimeString()
    }]
  })

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mainChatMessages', JSON.stringify(messages))
    }
  }, [messages])

  const [inputValue, setInputValue] = useState("")
  const [isAutoPilot, setIsAutoPilot] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [calendarEvents, setCalendarEvents] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateTypingEffect = async (message: string, delay: number = 4500) => {
    const typingMessage: Message = {
      id: Date.now() + Math.random(),  
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString(),
      isTyping: true
    }
    setMessages(prev => [...prev, typingMessage])

    await new Promise(resolve => setTimeout(resolve, delay))
    
    setMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== typingMessage.id)
      return [...filtered, {
        id: Date.now() + Math.random(),  
        role: 'assistant',
        content: message,
        timestamp: new Date().toLocaleTimeString()
      }]
    })
  }

  const simulateWebsiteScraping = async () => {
    const scrapingMessage: Message = {
      id: Date.now() + Math.random(),  
      role: 'assistant',
      content: "Hey Steve! Just a moment while I'm Scraping website and analyzing data... 🤔",
      timestamp: new Date().toLocaleTimeString(),
      showProgress: true
    }
    setMessages(prev => [...prev, scrapingMessage])

    await new Promise(resolve => setTimeout(resolve, 8000))

    const completionMessage = "Done! I've checked your website to learn more about your brand and the products you offer. I've also populated the brand kit with all the relevant information from your brand. What would you like us to do next? 🤔"
    
    setMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== scrapingMessage.id)
      return [...filtered, {
        id: Date.now() + Math.random(),  
        role: 'assistant',
        content: completionMessage,
        timestamp: new Date().toLocaleTimeString()
      }]
    })
  }

  const simulateAnalysis = async () => {
    const analysisMessage: Message = {
      id: Date.now() + Math.random(),  
      role: 'assistant',
      content: "Cool! I'm Analyzing your retention data from Klaviyo, LoyaltyLion, and other integrated platforms. Just a sec... 🕒",
      timestamp: new Date().toLocaleTimeString(),
      showProgress: true
    }
    setMessages(prev => [...prev, analysisMessage])

    await new Promise(resolve => setTimeout(resolve, 8000))

    const analysisResult = `Based on my analysis of your historical data, Steve, here are some key insights:

1. Customer Retention Metrics:
   • Your repeat purchase rate has increased by 15.8% in the last month
   • Average customer lifetime value (CLV) is $285
   • Email engagement rates are 25% above industry average

2. Loyalty Program Performance:
   • Only 45% of eligible customers are enrolled
   • Point redemption rate is lower than optimal at 62%
   • Top-tier customers show 3.2x higher retention

I've shared the detailed analysis to your email. Here's a really cool visualization of your retention trends: 📊`

    setMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== analysisMessage.id)
      return [...filtered, {
        id: Date.now() + Math.random(),  
        role: 'assistant',
        content: analysisResult,
        timestamp: new Date().toLocaleTimeString(),
        showChart: true
      }]
    })
  }

  const simulateSegmentation = async () => {
    const segmentMessage: Message = {
      id: Date.now() + Math.random(),  
      role: 'assistant',
      content: "Awesome! Creating customer segments and personalizing email campaigns. Gonna be Awesome. 🤩",
      timestamp: new Date().toLocaleTimeString(),
      showProgress: true
    }
    setMessages(prev => [...prev, segmentMessage])

    await new Promise(resolve => setTimeout(resolve, 8000))

    const segmentResult = `Hey Steve. I've analyzed your customer base and created strategic segments based on behavior patterns and engagement metrics. Here's the current distribution of your customers:

Looking at the segmentation data, here are my recommendations to turbocharge your campaigns:

1. VIP Loyalists (15%):
   • Implement exclusive early-access programs
   • Create personalized product bundles
   • Increase WhatsApp engagement for premium support

2. At-Risk High-Value (8%):
   • Launch targeted win-back SMS campaign
   • Offer personalized loyalty point bonuses
   • Send curated product recommendations

3. Loyalty Program Opportunities (22%):
   • Implement automated enrollment triggers
   • Create segment-specific welcome flows
   • Use social proof in messaging

Would you like me to create personalized campaigns for each segment? 🤔`

    setMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== segmentMessage.id)
      return [...filtered, {
        id: Date.now() + Math.random(),  
        role: 'assistant',
        content: segmentResult,
        timestamp: new Date().toLocaleTimeString(),
        showSegmentChart: true
      }]
    })
  }

  const simulateEmailCreation = async () => {
    const analysisMessage: Message = {
      id: Date.now() + Math.random(),
      role: 'assistant',
      content: "Awesome! Just a sec while I'm Analyzing customer data from Klaviyo, Postscript, Shopify, and Skio to create personalized campaign... 🤔",
      timestamp: new Date().toLocaleTimeString(),
      showProgress: true
    }
    setMessages(prev => [...prev, analysisMessage])

    await new Promise(resolve => setTimeout(resolve, 8000))

    const emailContent: EmailContent = {
      subject: "🧴 Build Your Perfect Skincare Routine",
      preheader: "Of Your Face",
      body: `Hi {{first_name}},

We've crafted the perfect 4-step skincare routine just for you! Each product is carefully selected to work together for the best results:

Step 1: Fresh Start Gel Cleanser
- Gently removes dirt and oil
- Leaves skin feeling fresh, not tight
- Perfect for morning and night use

Step 2: Level Up Balancing Moisturizer
- Lightweight but deeply hydrating
- Helps maintain skin's natural balance
- Great under makeup or on its own

Step 3: Break Even Clarifying Toner
- Unclogs pores and removes excess oil
- Helps prevent breakouts
- Soothes and calms skin

Step 4: Bounce Back Nourishing Mask
- Weekly treatment for glowing skin
- Packed with antioxidants
- Restores skin's natural radiance

🎁 Limited Time Offer:
Get 20% off when you build your 4-step routine
Use code: ROUTINE20

Plus, free shipping on orders over $50!

Happy Glowing,
The Bubble Team`,
      segment: {
        name: "First-Time Customers",
        size: 2547,
        criteria: [
          "No previous purchases",
          "Viewed website in last 30 days",
          "Email subscribers",
          "Age: 18-34"
        ]
      },
      metrics: [
        {
          source: "Average Order Value",
          value: "$65.50",
          trend: "+12% vs. prev campaigns"
        },
        {
          source: "Open Rate",
          value: "28.5%",
          trend: "+5% vs. benchmark"
        },
        {
          source: "Click Rate",
          value: "4.2%",
          trend: "+2% vs. benchmark"
        }
      ]
    }

    const emailResult = `I've analyzed the data and created a personalized email campaign for your skincare products. Here's a preview of the email. Please tell me incase we need to change anything: 📧`

    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      role: 'assistant',
      content: emailResult,
      timestamp: new Date().toLocaleTimeString(),
      showEmailPreview: true,
      emailContent
    }])
  }

  const simulateEmailFlow = async () => {
    const analysisMessage: Message = {
      id: Date.now() + Math.random(),
      role: 'assistant',
      content: "Let me help you create a personalized campaign! 🎯\n\nFirst, I'll analyze your customer data... 📊",
      timestamp: new Date().toLocaleTimeString(),
      showProgress: true
    }

    setMessages(prev => [...prev, analysisMessage])

    await new Promise(resolve => setTimeout(resolve, 3000))

    const emailResult = `✨ Based on your customer data, I've created some segments:

🎯 High-Value Customers:
   • Average order value > $100
   • Purchase frequency: 2.3x monthly
   • Retention rate: 85%

👥 New Customers (Last 30 Days):
   • First-time buyers
   • Browse-to-buy rate: 3.2%
   • Cart abandonment: 68%

🔄 At-Risk Customers:
   • No purchase in 60+ days
   • High engagement with emails
   • Previous loyal customers

Would you like me to create personalized campaigns for each segment? 💌`

    setMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== analysisMessage.id)
      return [...filtered, {
        id: Date.now() + Math.random(),
        role: 'assistant',
        content: emailResult,
        timestamp: new Date().toLocaleTimeString()
      }]
    })
  }

  const simulateEmailPreview = async () => {
    const processingMessage: Message = {
      id: Date.now() + Math.random(),
      role: 'assistant',
      content: "Creating your email preview... ✨",
      timestamp: new Date().toLocaleTimeString(),
      showProgress: true
    }

    setMessages(prev => [...prev, processingMessage])

    await new Promise(resolve => setTimeout(resolve, 2000))

    const emailContent = {
      subject: "🌟 Special Offer Just for You!",
      preview: "We've missed you at Bubble! Here's something special...",
      body: `Hi [Customer_Name],

✨ We hope this email finds you well!

🫧 We noticed you've been loving our skincare products, and we wanted to thank you for being an amazing customer. As a token of our appreciation, we've got something special for you:

🎁 Exclusive Offer:
   • 20% off your next purchase
   • Free Bubble Mini Set with orders over $50
   • Early access to our new Cloud Surf Serum

🕒 This offer is valid for the next 48 hours only!

💫 Ready to glow? Shop now and treat your skin to the best!

Best wishes,
The Bubble Team 🫧`
    }

    setMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== processingMessage.id)
      return [...filtered, {
        id: Date.now() + Math.random(),
        role: 'assistant',
        content: "✨ Here's your personalized email preview! Let me know if you'd like to make any changes:",
        timestamp: new Date().toLocaleTimeString(),
        showEmailPreview: true,
        emailContent
      }]
    })
  }

  const simulateCalendarUpdate = async () => {
    const message: Message = {
      id: Date.now() + Math.random(),
      role: 'assistant',
      content: '📅 Here is your updated campaign calendar. You can click on any campaign to see more details or reschedule it!',
      timestamp: new Date().toLocaleTimeString(),
      showCalendar: true
    }

    setMessages(prev => [...prev, message])
  }

  const handleMainChatMessage = (content: string) => {
    const message: Message = {
      id: Date.now() + Math.random(),
      role: 'assistant',
      content,
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, message])
  }

  const addCalendarEvent = (event: any) => {
    setCalendarEvents(prev => [...prev, event])
    // Add calendar view message
    const message: Message = {
      id: Date.now() + Math.random(),
      role: 'assistant',
      content: 'Here is your updated campaign calendar: 📅',
      timestamp: new Date().toLocaleTimeString(),
      showCalendar: true
    }
    setMessages(prev => [...prev, message])
  }

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now() + Math.random(),
        role: 'user',
        content: inputValue.trim(),
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages(prev => [...prev, userMessage])
      setInputValue('')

      const input = inputValue.toLowerCase().trim()

      if (input === 'add more images and change color pallete') {
        // Show processing message
        const processingMessage: Message = {
          id: Date.now() + Math.random(),
          role: 'assistant',
          content: "Sure! Just a moment... 🤔",
          timestamp: new Date().toLocaleTimeString(),
          showProgress: true
        }
        setMessages(prev => [...prev, processingMessage])

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Valentine's Day themed email content
        const emailContent: EmailContent = {
          subject: "💘 Steal hearts on v-tine's day with Bubble gifts! 💘",
          preheader: "FOR THE FACES U LOVE!",
          body: ``,
          segment: {
            name: "First-Time Customers",
            size: 2547,
            criteria: [
              "No previous purchases",
              "Viewed website in last 30 days",
              "Email subscribers",
              "Age: 18-34"
            ]
          },
          metrics: [
            {
              source: "Average Order Value",
              value: "$65.50",
              trend: "+12% vs. prev campaigns"
            },
            {
              source: "Open Rate",
              value: "28.5%",
              trend: "+5% vs. benchmark"
            },
            {
              source: "Click Rate",
              value: "4.2%",
              trend: "+2% vs. benchmark"
            }
          ],
          isValentineTemplate: true
        }

        // Remove processing message and show new template
        setMessages(prev => {
          const filtered = prev.filter(msg => msg.id !== processingMessage.id)
          return [...filtered, {
            id: Date.now() + Math.random(),
            role: 'assistant',
            content: "I've updated the template with a Valentine's Day theme and more product images: 📸",
            timestamp: new Date().toLocaleTimeString(),
            showEmailPreview: true,
            emailContent
          }]
        })
      } else if (input === 'yes. create an email campaign') {
        // Directly show email preview without analysis
        const emailContent: EmailContent = {
          subject: "🧴 Build Your Perfect Skincare Routine",
          preheader: "Of Your Face",
          body: `Hi {{first_name}},

We've crafted the perfect 4-step skincare routine just for you! Each product is carefully selected to work together for the best results:

Step 1: Fresh Start Gel Cleanser
- Gently removes dirt and oil
- Leaves skin feeling fresh, not tight
- Perfect for morning and night use

Step 2: Level Up Balancing Moisturizer
- Lightweight but deeply hydrating
- Helps maintain skin's natural balance
- Great under makeup or on its own

Step 3: Break Even Clarifying Toner
- Unclogs pores and removes excess oil
- Helps prevent breakouts
- Soothes and calms skin

Step 4: Bounce Back Nourishing Mask
- Weekly treatment for glowing skin
- Packed with antioxidants
- Restores skin's natural radiance

🎁 Limited Time Offer:
Get 20% off when you build your 4-step routine
Use code: ROUTINE20

Plus, free shipping on orders over $50!

Happy Glowing,
The Bubble Team`,
          segment: {
            name: "First-Time Customers",
            size: 2547,
            criteria: [
              "No previous purchases",
              "Viewed website in last 30 days",
              "Email subscribers",
              "Age: 18-34"
            ]
          },
          metrics: [
            {
              source: "Average Order Value",
              value: "$65.50",
              trend: "+12% vs. prev campaigns"
            },
            {
              source: "Open Rate",
              value: "28.5%",
              trend: "+5% vs. benchmark"
            },
            {
              source: "Click Rate",
              value: "4.2%",
              trend: "+2% vs. benchmark"
            }
          ]
        }

        setMessages(prev => [...prev, {
          id: Date.now() + Math.random(),
          role: 'assistant',
          content: "Here's a preview of the email campaign: 📧",
          timestamp: new Date().toLocaleTimeString(),
          showEmailPreview: true,
          emailContent
        }])
      } else if (input.toLowerCase().includes('can you scrape this website') && input.toLowerCase().includes('to learn more about our brand')) {
        await simulateWebsiteScraping()
      } else if (input.includes('analyze') || input.includes('retention')) {
        await simulateAnalysis()
      } else if (input.includes('segment') || input.includes('personalize')) {
        await simulateSegmentation()
      } else if (input.includes('email') || input.includes('campaign')) {
        await simulateEmailCreation()
      } else {
        await simulateTypingEffect("I'm here to help! Would you like to create an email campaign? Just say 'yes. create an email campaign' to get started. 🤔")
      }
    }
  }

  const handleNewChat = () => {
    setMessages([{
      id: Date.now(),
      role: 'assistant',
      content: "Hi! I'm Oscar, your AI retention marketer. I can help you analyze customer data and create personalized campaigns. Would you like to create an email campaign? 🤔",
      timestamp: new Date().toLocaleTimeString()
    }])
  }

  const handleAutoPilotChange = (checked: boolean) => {
    setIsAutoPilot(checked)
    if (checked === false) {
      setIsModalOpen(true)
    }
  }

  const handleEmojiClick = (emoji: string) => {
    setInputValue(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)] md:h-screen bg-[#141414]">
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-[#232323] gap-4 md:gap-0">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={oscarAvatar.src} alt="Oscar" />
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">Oscar</h2>
            <p className="text-sm text-gray-400">Your AI retention marketer</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#212121] rounded-full p-1">
            <span className={`text-sm px-3 py-1 rounded-full transition-colors ${!isAutoPilot ? 'text-white' : 'text-gray-500'}`}>
              Auto Pilot
            </span>
            <Switch
              checked={isAutoPilot}
              onCheckedChange={handleAutoPilotChange}
              className="bg-[#F7B928] data-[state=checked]:bg-[#F7B928]"
            />
            <span className={`text-sm px-3 py-1 rounded-full transition-colors ${isAutoPilot ? 'text-white' : 'text-gray-500'}`}>
              Co-Pilot
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNewChat}
            className="border-[#333] text-gray-300 hover:bg-[#333] hover:text-white"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] p-3 ${
                message.role === 'user' 
                  ? 'bg-[#F7B928] text-black' 
                  : 'bg-[#212121] text-white'
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
                    <div className="w-full h-2 bg-[#333] rounded-full">
                      <div className="h-2 bg-[#F7B928] rounded-full animate-[progress_8s_ease-in-out]" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.showChart && <RetentionChart />}
                    {message.showSegmentChart && <SegmentChart />}
                    {message.showEmailPreview && message.emailContent && (
                      <EmailPreview 
                        content={message.emailContent} 
                        onMainChatMessage={handleMainChatMessage}
                        onAddCalendarEvent={addCalendarEvent}
                      />
                    )}
                    {message.showCalendar && (
                      <CalendarGrid events={calendarEvents} />
                    )}
                  </>
                )}
              </Card>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 bg-[#141414] mt-auto">
        <div className="flex items-center gap-2 bg-[#212121] rounded-full p-2 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <SmilePlus className="h-6 w-6" />
          </Button>
          <Input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a Message" 
            className="bg-transparent border-none focus-visible:ring-0 text-white"
          />
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Mic className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Paperclip className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-20 right-4 bg-[#212121] p-2 rounded-lg shadow-lg">
          <div className="grid grid-cols-8 gap-1">
            {EMOJI_LIST.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="hover:bg-[#333] p-1 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <AutoPilotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}