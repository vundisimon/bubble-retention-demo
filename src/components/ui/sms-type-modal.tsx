"use client"

import React, { useState } from 'react'
import { X, Mail, MessageCircle } from 'lucide-react'
import SMSEditorModal from './sms-editor-modal'

interface SMSTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectEmail: () => void
}

export default function SMSTypeModal({ isOpen, onClose, onSelectEmail }: SMSTypeModalProps) {
  const [selectedSegment, setSelectedSegment] = useState('')
  const [showEditor, setShowEditor] = useState(false)

  // Sample segments
  const segments = [
    'All Customers',
    'New Customers',
    'Loyal Customers',
    'Inactive Customers',
    'High-Value Customers',
    'Recent Purchasers'
  ]

  const handleGenerate = () => {
    if (selectedSegment) {
      setShowEditor(true)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-[#141414] rounded-3xl p-6 md:p-10 w-full max-w-[600px] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#F7B928] hover:text-[#F7B928]/80"
          >
            <X className="h-6 w-6" />
          </button>

          <h1 className="text-white text-center mb-8 text-xl md:text-2xl font-normal">
            Give a <span className="text-[#F7B928]">short brief</span> of your{' '}
            <span className="text-[#F7B928]">campaign</span>.
          </h1>

          <div className="space-y-6">
            <div>
              <label className="text-white block mb-3">Type</label>
              <div className="flex gap-4">
                <button
                  onClick={onSelectEmail}
                  className="flex-1 py-3 px-4 rounded-2xl border border-[#F7B928] 
                           text-white hover:bg-[#F7B928]/10 transition-colors duration-200 
                           flex items-center justify-center gap-2"
                >
                  <Mail className="h-5 w-5" /> Email
                </button>
                <button
                  className="flex-1 py-3 px-4 rounded-2xl border border-[#F7B928] 
                           bg-[#F7B928] text-black transition-colors duration-200 
                           flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" /> SMS
                </button>
              </div>
            </div>

            <div>
              <label className="text-white block mb-3">Send To?</label>
              <div className="relative">
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="w-full appearance-none bg-transparent border border-[#F7B928] 
                           text-gray-400 rounded-2xl px-4 py-3 focus:outline-none 
                           focus:ring-2 focus:ring-[#F7B928]"
                >
                  <option value="" disabled>Select a segment</option>
                  {segments.map(segment => (
                    <option 
                      key={segment} 
                      value={segment}
                      className="bg-[#141414] text-white"
                    >
                      {segment}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center">
                  <svg className="h-4 w-4 text-[#F7B928]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button 
              onClick={handleGenerate}
              disabled={!selectedSegment}
              className="w-[60%] md:w-[40%] bg-[#F7B928] text-black hover:bg-[#F7B928]/90 
                       rounded-full py-4 md:py-6 px-6 md:px-8 
                       text-base md:text-lg font-medium 
                       transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center"
            >
              Generate
            </button>
          </div>
        </div>
      </div>

      {showEditor && (
        <SMSEditorModal 
          isOpen={showEditor} 
          onClose={() => setShowEditor(false)} 
          segment={selectedSegment}
        />
      )}
    </>
  )
} 