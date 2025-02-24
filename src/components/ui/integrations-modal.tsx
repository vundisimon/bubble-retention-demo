"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import klaviyoLogo from '@/components/img/klaviyo.png'
import hubspotLogo from '@/components/img/hubspot.png'
import omnisendLogo from '@/components/img/omnisend.png'
import shopifyLogo from '@/components/img/shopify.png'
import litmusLogo from '@/components/img/litmus.png'
import mailchimpLogo from '@/components/img/mailchimp.png'
import yotpoLogo from '@/components/img/yotpo.png'
import postscriptLogo from '@/components/img/postscript.png'
import Image from "next/image"

interface IntegrationsModalProps {
  isOpen: boolean
  onClose: () => void
}

const integrations = [
  { id: 1, name: 'Klaviyo', logo: klaviyoLogo, isActive: true },
  { id: 2, name: 'HubSpot', logo: hubspotLogo, isActive: false },
  { id: 3, name: 'Omnisend', logo: omnisendLogo, isActive: false },
  { id: 4, name: 'Shopify', logo: shopifyLogo, isActive: false },
  { id: 5, name: 'Litmus', logo: litmusLogo, isActive: false },
  { id: 6, name: 'MailChimp', logo: mailchimpLogo, isActive: false },
  { id: 7, name: 'Yotpo', logo: yotpoLogo, isActive: false },
  { id: 8, name: 'Postscript', logo: postscriptLogo, isActive: false },
]

export function IntegrationsModal({ isOpen, onClose }: IntegrationsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[420px] h-[49vh] bg-[#1A1A1A] border border-[#F5B740] 
                               rounded-[24px] p-4 overflow-y-auto
                               scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent">
        <div className="text-center">
          <h1 className="text-[#F5B740] text-xl sm:text-2xl mb-2">
            INTEGRATIONS
          </h1>
          <h2 className="text-white text-base sm:text-lg mb-6">
            Explore All Integrations
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-2">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="relative bg-white border border-[#F5B740] rounded-[16px] 
                         p-2 flex items-center justify-center
                         cursor-pointer transition-all duration-200 
                         hover:scale-105 aspect-square
                         group overflow-hidden"
              >
                <div className="relative w-[56px] h-[56px] sm:w-[70px] sm:h-[70px]">
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    width={112}
                    height={112}
                    className="object-contain p-1"
                  />
                </div>
                
                {!integration.isActive && (
                  <div className="absolute inset-0 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute -rotate-45 bg-[#F5B740] text-black text-[10px] font-medium
                                  py-0.5 px-4 w-[150%]
                                  flex items-center justify-center
                                  shadow-md">
                      COMING SOON
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 