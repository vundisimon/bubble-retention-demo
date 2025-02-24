"use client"

import React, { useState } from 'react'
import { X, Image as ImageIcon, Edit2, Smile, RotateCcw, Calendar, Send } from 'lucide-react'
import { ScheduleModal } from './schedule-modal'

interface SMSEditorModalProps {
  isOpen: boolean
  onClose: () => void
  segment: string
}

export default function SMSEditorModal({ isOpen, onClose, segment }: SMSEditorModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [messageText, setMessageText] = useState(
    "Hey there! 👋 Don't miss out on our exclusive summer sale! Get 20% off on all items. Shop now at example.com 🛍️"
  )
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  if (!isOpen) return null

  const handleRegenerate = () => {
    // Add regeneration logic here
    console.log("Regenerating message...")
  }

  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setUploadedImage(result)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
  }

  const handleScheduleComplete = (date: Date, time: string) => {
    console.log('Scheduled for:', date, time)
    // Add your calendar population logic here
  }

  const handleSchedule = () => {
    setShowScheduleModal(true)
  }

  const handleSendNow = () => {
    console.log("Sending SMS now...")
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="border border-[#F7B928] rounded-3xl p-1 w-full max-w-[600px] h-[90vh] md:h-auto">
          <div className="bg-[#141414] rounded-3xl w-full relative flex flex-col h-full">
            {/* Top Section - Fixed Header */}
            <div className="p-4 md:p-10 pb-4 md:pb-6 flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#F7B928] hover:text-[#F7B928]/80"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col gap-6">
                {/* Action Buttons - Right aligned and more compact */}
                <div className="flex gap-2 sm:gap-3 justify-end">
                  <button
                    onClick={handleSchedule}
                    className="flex items-center justify-center gap-1.5 
                             px-3 sm:px-4 py-1.5 sm:py-2
                             rounded-full border border-[#F7B928] bg-transparent
                             text-[#F7B928] hover:bg-[#F7B928]/10 transition-colors
                             text-xs sm:text-sm"
                  >
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Schedule
                  </button>
                  <button
                    onClick={handleSendNow}
                    className="flex items-center justify-center gap-1.5 
                             px-3 sm:px-4 py-1.5 sm:py-2
                             rounded-full bg-[#F7B928] text-black 
                             hover:bg-[#F7B928]/90 transition-colors
                             text-xs sm:text-sm"
                  >
                    <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Send Now
                  </button>
                </div>

                <div>
                  <h2 className="text-white text-xl mb-2">SMS Preview</h2>
                  <p className="text-gray-400 text-sm">Sending to: {segment}</p>
                </div>
              </div>
            </div>

            {/* Scrollable Message Area with fixed height on mobile */}
            <div className="flex-1 overflow-y-auto px-4 md:px-10 h-[40vh] md:h-auto">
              <div className="bg-black rounded-xl p-4 md:p-6">
                {isEditing ? (
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-transparent text-white border-none outline-none resize-none"
                    rows={4}
                    autoFocus
                    onBlur={handleSaveEdit}
                  />
                ) : (
                  <div className="space-y-4">
                    <p className="text-white whitespace-pre-wrap">{messageText}</p>
                    {uploadedImage && (
                      <div className="relative group">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded content"
                          className="w-full h-auto rounded-lg max-h-[120px] md:max-h-[150px] object-cover" 
                        />
                        <button
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-2 rounded-full bg-black/50 
                                   opacity-0 group-hover:opacity-100 transition-opacity
                                   hover:bg-black/70 cursor-pointer"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Bottom Section */}
            <div className="flex-shrink-0">
              {/* Gold Separator Line */}
              <div className="border-t border-[#F7B928] w-full" />

              {/* Action Buttons */}
              <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Regenerate Button */}
                  <button
                    onClick={handleRegenerate}
                    className="flex items-center gap-2 bg-black border border-[#F7B928] 
                             rounded-full px-4 py-2 md:px-6 md:py-3 hover:bg-black/80 
                             transition-colors duration-200 text-sm md:text-base"
                  >
                    <RotateCcw className="h-4 w-4 md:h-5 md:w-5 text-[#F7B928]" />
                    <span className="text-[#F7B928]">Regenerate</span>
                  </button>

                  {/* Right side buttons - More compact on mobile */}
                  <div className="flex items-center gap-2 md:gap-4 ml-auto">
                    <button
                      onClick={handleImageUpload}
                      className="flex items-center gap-1 p-2 hover:bg-[#333] 
                               rounded-full transition-colors duration-200"
                    >
                      <ImageIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      <span className="text-white text-xs md:text-sm hidden sm:inline">Add image</span>
                    </button>
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-1 p-2 hover:bg-[#333] 
                               rounded-full transition-colors duration-200"
                    >
                      <Edit2 className="h-4 w-4 md:h-5 md:w-5 text-white" />
                      <span className="text-white text-xs md:text-sm hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 hover:bg-[#333] rounded-full transition-colors duration-200"
                    >
                      <Smile className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Emoji Picker - Repositioned for mobile */}
            {showEmojiPicker && (
              <div className="absolute bottom-[80px] right-2 md:bottom-24 md:right-4 
                            bg-[#1C1C1C] rounded-xl p-3 md:p-4 
                            shadow-lg border border-[#F7B928] z-10">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {["👋", "🎉", "💫", "🔥", "💯", "✨", "🎨", "🛍️"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setMessageText(messageText + emoji)
                        setShowEmojiPicker(false)
                      }}
                      className="hover:bg-[#333] p-1.5 md:p-2 rounded-lg 
                               transition-colors duration-200 text-sm md:text-base"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Schedule Modal */}
      <ScheduleModal 
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleComplete}
      />
    </>
  )
} 