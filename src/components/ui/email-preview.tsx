"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit2, MessageSquare, Send, X } from "lucide-react"
import { EmailChatModal } from "@/components/ui/email-chat-modal"
import { CampaignChatModal } from "@/components/ui/campaign-chat-modal"
import { useEventsStore } from "@/lib/events-store"

interface EmailPreviewProps {
  content: {
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
  onMainChatMessage?: (message: string) => void
  onAddCalendarEvent?: (event: any) => void
}

export function EmailPreview({ content, onMainChatMessage, onAddCalendarEvent }: EmailPreviewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCampaignChatOpen, setIsCampaignChatOpen] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [isCampaignScheduled, setIsCampaignScheduled] = useState(false)
  const addEvent = useEventsStore((state) => state.addEvent)

  const handleApplySuggestion = (suggestion: string) => {
    const suggestionLower = suggestion.toLowerCase()
    const triggerWords = ['add', 'more', 'images', 'change', 'color', 'pallete']
    
    if (triggerWords.some(word => suggestionLower.includes(word))) {
      setEditedContent({
        ...editedContent,
        isValentineTemplate: true,
        subject: "💘 FOR THE FACES U LOVE! Valentine's Day Skincare Gifts",
        preheader: "Steal hearts this Valentine's Day with Bubble's perfect skincare pairs"
      })
    } else {
      setEditedContent({
        ...editedContent,
        [suggestion.type]: suggestion.content
      })
    }
  }

  const getNextTuesday = () => {
    const now = new Date()
    const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7 // If today is Tuesday, get next Tuesday
    const nextTuesday = new Date(now)
    nextTuesday.setDate(now.getDate() + daysUntilTuesday)
    nextTuesday.setHours(10, 0, 0, 0)
    return nextTuesday.toISOString()
  }

  const handleCampaignScheduled = () => {
    setIsCampaignScheduled(true)
    
    // Create campaign event
    const campaignEvent = {
      title: editedContent.subject,
      date: getNextTuesday(),
      type: "Email Campaign",
      segment: editedContent.segment.name,
      recipients: editedContent.segment.size,
      status: "Scheduled"
    }

    // Add to calendar store
    addEvent(campaignEvent)

    // Add to calendar view
    if (onAddCalendarEvent) {
      onAddCalendarEvent(campaignEvent)
    }

    // Send message to main chat
    if (onMainChatMessage) {
      onMainChatMessage("The campaign has been successfully scheduled. I'll monitor it and keep you updated via email and Slack in case of any changes.")
    }
  }

  const handleCampaignChatClose = () => {
    setIsCampaignChatOpen(false)
    handleCampaignScheduled()
  }

  const renderValentineTemplate = () => {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <style>
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100% }
      table, td { border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0 }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic }
    </style>
  </head>
  <body style="word-spacing:normal;background-color:#FFFFFF;">
    <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
      FOR THE FACES U LOVE! 
    </div>
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
              <div style="margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                        <img alt="💘  Steal hearts on v-tine's day with Bubble gifts!  💘" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/b9b936bf-4037-466b-ae6f-8ca953948e9d.png" style="width:100%;height:auto;display:block;" />
                        <img alt="Bubble Skincare" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/a055b15e-120d-4fc3-af74-cd12a120834c.jpeg" style="width:100%;height:auto;display:block;" />
                        <img alt="Skincare Soulmates" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/b69b51de-6393-4ade-8aaf-6038490f3f3d.jpeg" style="width:100%;height:auto;display:block;" />
                        <img alt="Perfect Combinations" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/08230815-b071-4111-8d86-fbfe70bc32e7.png" style="width:100%;height:auto;display:block;" />
                        <img alt="Day Dream Serum" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/aa009cd7-4873-4ce5-a198-c2397d331359.jpeg" style="width:100%;height:auto;display:block;" />
                        <img alt="Super Clear Serum" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/7752a7eb-3ee4-4f63-80f0-bffee12c4b97.jpeg" style="width:100%;height:auto;display:block;" />
                        <img alt="Water Slide Serum" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/8ce558a1-58b5-4189-879b-35982beb6d85.jpeg" style="width:100%;height:auto;display:block;" />
                        <img alt="Happy Valentine's Day" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/c6e9333c-72e5-485a-be5b-109fc3519810.png" style="width:100%;height:auto;display:block;" />
                        <img alt="WELOVEU" src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/10be1547-4c61-47fb-8fe5-80107daf8534.png" style="width:100%;height:auto;display:block;" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`
  }

  const renderEmailTemplate = () => {
    if (editedContent.isValentineTemplate) {
      return renderValentineTemplate()
    }
    
    return `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <img src="https://d3k81ch9hvuctc.cloudfront.net/company/UDPRfF/images/088cb726-8345-4b11-8441-0dc64ad8e868.jpeg" 
             alt="Bubble Skincare" 
             style="width: 100%; height: auto; display: block; margin-bottom: 20px;" />
        
        <div style="padding: 20px; background-color: #ffffff; color: #333333;">
          <h1 style="font-size: 24px; color: #333; margin-bottom: 20px;">
            Build Your Perfect Skincare Routine
          </h1>
          
          <div style="margin-bottom: 30px;">
            ${editedContent.body.split('\n').map(line => {
              if (line.startsWith('Step')) {
                return `<h2 style="font-size: 20px; color: #000; margin-top: 25px; margin-bottom: 15px;">${line}</h2>`
              } else if (line.startsWith('-')) {
                return `<li style="margin-bottom: 8px; color: #666;">${line.substring(2)}</li>`
              } else if (line.startsWith('')) {
                return `<div style="background-color: #f8f4ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                          <h3 style="color: #000; margin-top: 0;">${line}</h3>`
              } else if (line.includes('ROUTINE20')) {
                return `<p style="font-size: 18px; color: #000; font-weight: bold;">${line}</p>`
              } else if (line.includes('free shipping')) {
                return `<p style="color: #666;">${line}</p></div>`
              } else if (line.trim() === '') {
                return '<br/>'
              } else {
                return `<p style="color: #333; margin-bottom: 15px;">${line}</p>`
              }
            }).join('')}
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="#" style="display: inline-block; background-color: #F7B928; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    `
  }

  return (
    <>
      <Card className="w-full mt-4 bg-[#212121] text-white">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg">Email Campaign Preview</CardTitle>
            <CardDescription className="text-gray-400">
              Segment: {content.segment.name} ({content.segment.size.toLocaleString()} recipients)
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="text-white border-gray-600 hover:bg-gray-700"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="text-white border-gray-600 hover:bg-gray-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            </Button>
            <Button 
              size="sm" 
              className="bg-[#F7B928] text-black hover:bg-[#E5A922]"
              onClick={() => setIsCampaignChatOpen(true)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-400">Subject Line</label>
              {isEditing ? (
                <Input
                  value={editedContent.subject}
                  onChange={(e) => setEditedContent({ ...editedContent, subject: e.target.value })}
                  className="mt-1 bg-[#333] border-gray-600 text-white"
                />
              ) : (
                <p className="mt-1">{editedContent.subject}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Preheader</label>
              {isEditing ? (
                <Input
                  value={editedContent.preheader}
                  onChange={(e) => setEditedContent({ ...editedContent, preheader: e.target.value })}
                  className="mt-1 bg-[#333] border-gray-600 text-white"
                />
              ) : (
                <p className="mt-1 text-gray-300">{editedContent.preheader}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-400">Email Body</label>
              <ScrollArea className="mt-1 h-[500px] rounded-md border border-gray-600 bg-white p-4">
                <div 
                  className="text-black"
                  dangerouslySetInnerHTML={{ __html: renderEmailTemplate() }} 
                />
              </ScrollArea>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <div className="w-full">
            <p className="text-sm font-medium text-gray-400 mb-2">Segment Criteria</p>
            <div className="flex flex-wrap gap-2">
              {content.segment.criteria.map((criterion, index) => (
                <Badge key={index} variant="outline" className="bg-[#333] text-white border-gray-600">
                  {criterion}
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-full">
            <p className="text-sm font-medium text-gray-400 mb-2">Performance Metrics</p>
            <div className="grid grid-cols-3 gap-4">
              {content.metrics.map((metric, index) => (
                <div key={index} className="bg-[#333] rounded-lg p-3">
                  <p className="text-sm text-gray-400">{metric.source}</p>
                  <p className="text-lg font-semibold">{metric.value}</p>
                  <p className="text-sm text-green-400">{metric.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>

      <EmailChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onApplySuggestion={(suggestion) => {
          handleApplySuggestion(suggestion)
          setIsEditing(true)
        }}
        onCampaignScheduled={isCampaignScheduled ? handleCampaignScheduled : undefined}
      />
      <CampaignChatModal
        isOpen={isCampaignChatOpen}
        onClose={handleCampaignChatClose}
      />
    </>
  )
}
