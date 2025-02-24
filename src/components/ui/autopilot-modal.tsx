"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SMSTypeModal from '@/components/ui/sms-type-modal'

interface AutoPilotModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AutoPilotModal({ isOpen, onClose }: AutoPilotModalProps) {
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedCampaign, setSelectedCampaign] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [showSMSModal, setShowSMSModal] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const campaigns = [
    'Promotional', 'Newsletter', 'Holiday', 'Transactional',
    'Product Launch', 'Milestone Emails', 'Sale', 'Event Invitation'
  ]

  const handleTypeSelect = (type: string) => {
    if (type === 'sms') {
      setShowSMSModal(true)
    } else {
      setSelectedType(type)
    }
  }

  return (
    <>
      {showSMSModal ? (
        <SMSTypeModal 
          isOpen={isOpen} 
          onClose={onClose}
          onSelectEmail={() => {
            setShowSMSModal(false)
            setSelectedType('email')
          }}
        />
      ) : (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-3xl p-6 md:p-10 w-full max-w-[600px] max-h-[90vh] overflow-y-auto relative">
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
                  {['Email', 'SMS'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type.toLowerCase())}
                      className={`flex-1 py-3 px-4 rounded-2xl border border-[#F7B928] 
                        ${selectedType === type.toLowerCase()
                          ? 'bg-[#F7B928] text-black'
                          : 'text-white hover:bg-[#F7B928]/10'
                        } transition-colors duration-200 flex items-center justify-center gap-2`}
                    >
                      {type === 'Email' ? '✉' : '💬'} {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white block mb-3">Select your campaign</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {campaigns.map((campaign) => (
                    <button
                      key={campaign}
                      onClick={() => setSelectedCampaign(campaign)}
                      className={`p-3 rounded-2xl border border-[#F7B928] text-sm
                        ${selectedCampaign === campaign
                          ? 'bg-[#F7B928] text-black'
                          : 'text-white hover:bg-[#F7B928]/10'
                        } transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis`}
                    >
                      {campaign}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white block mb-3">
                  What type of products are you promoting?
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full border border-[#F7B928] text-white bg-[#141414] rounded-2xl px-4 py-3 
                    focus:outline-none focus:ring-2 focus:ring-[#F7B928] appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23F7B928\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5em',
                    backgroundRepeat: 'no-repeat' }}
                >
                  <option value="">Select</option>
                  <option value="product1">Product 1</option>
                  <option value="product2">Product 2</option>
                </select>
              </div>

              <Input
                placeholder="What is your email about?"
                className="border-[#F7B928] text-white bg-transparent rounded-2xl px-4 py-3 h-auto placeholder:text-gray-500"
              />

              <Input
                placeholder="Add any discount code"
                className="border-[#F7B928] text-white bg-transparent rounded-2xl px-4 py-3 h-auto placeholder:text-gray-500"
              />

              <Input
                placeholder="Where should the CTA lead to?"
                className="border-[#F7B928] text-white bg-transparent rounded-2xl px-4 py-3 h-auto placeholder:text-gray-500"
              />

              <button 
                className="w-full bg-[#F7B928] text-black hover:bg-[#F7B928]/90 rounded-full py-4 
                  text-lg font-medium transition-colors duration-200 mt-8"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 