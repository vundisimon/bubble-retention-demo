"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BrandKit } from "@/components/ui/brand-kit"
import { IntegrationsModal } from "@/components/ui/integrations-modal"
import { ChevronRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import logo from "../../components/img/icon.png"
import profile from "../../components/img/top.png"
import oscarImage from "../../components/img/oscar.png"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false)
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    legalName: "Peter Griffin",
    email: "h***@designdrop.co",
    phone: "",
    address: "Not provided"
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = (field: string) => {
    setEditingField(null)
    // Here you would typically make an API call to save the changes
  }

  const handleCancel = (field: string) => {
    setEditingField(null)
    // Reset to original value if needed
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] p-3 sm:p-4 md:p-6 
                    overflow-y-auto scrollbar scrollbar-w-[2px] 
                    scrollbar-track-[#1C1C1C] scrollbar-thumb-[#333]
                    hover:scrollbar-thumb-[#444]">
      {/* Logo */}
      <div className="mb-6 sm:mb-8">
        <Image 
          src={logo} 
          alt="Sauti Logo" 
          width={100} 
          height={40}
          className="h-8 sm:h-10 w-auto"
        />
      </div>

      {/* Main Container - Centered with max width */}
      <div className="max-w-[800px] mx-auto">
        {/* Yellow Header Card */}
        <div className="relative mb-20 sm:mb-24 px-2 sm:px-4 md:px-0">
          <div className="bg-[#F5B740] rounded-[24px] sm:rounded-[32px] p-4 sm:p-6">
            <h1 className="text-black text-xl sm:text-2xl font-bold">My Account</h1>
          </div>
          {/* Profile Image Overlay */}
          <div className="absolute left-1/2 -bottom-14 sm:-bottom-16 -translate-x-1/2">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FFB6A6] p-1">
              <Avatar className="w-full h-full">
                <AvatarImage src={profile} alt="Profile" />
                <AvatarFallback>O</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Upload/Remove Buttons */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <Button 
            className="bg-[#F5B740] text-black hover:bg-[#F5B740]/90 rounded-full px-4 sm:px-6"
          >
            Upload
          </Button>
          <Button 
            variant="outline"
            className="bg-[#1C1C1C] text-white border-none hover:bg-[#333] rounded-full px-4 sm:px-6"
          >
            Remove
          </Button>
        </div>

        {/* Settings Container with Border */}
        <div className="border border-[#F5B740] rounded-[32px] p-8 space-y-6 bg-[#1A1A1A]">
          {/* Profile Section */}
          <div className="space-y-6">
            <div className="border-b border-gray-800">
              <button 
                className="w-full flex items-center justify-between py-4 group"
                onClick={() => setExpandedSection(expandedSection === 'profile' ? null : 'profile')}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg">Profile</span>
                  <div className="w-4 h-4 rounded-full border border-[#F5B740] flex items-center justify-center">
                    <span className="text-[#F5B740] text-xs">?</span>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-[#F5B740]" />
              </button>
              {expandedSection === 'profile' && (
                <div className="py-4 space-y-6">
                  {/* Legal Name Field */}
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                      <p className="text-gray-400 text-sm">Legal name</p>
                      {editingField === 'legalName' ? (
                        <Input
                          value={profileData.legalName}
                          onChange={(e) => handleInputChange('legalName', e.target.value)}
                          className="bg-[#2A2A2A] border-[#F5B740] text-white mt-1"
                        />
                      ) : (
                        <p className="text-white">{profileData.legalName}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingField === 'legalName' ? (
                        <>
                          <button 
                            onClick={() => handleSave('legalName')} 
                            className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => handleCancel('legalName')} 
                            className="text-gray-400 text-sm hover:text-gray-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setEditingField('legalName')} 
                          className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                      <p className="text-gray-400 text-sm">Email address</p>
                      {editingField === 'email' ? (
                        <Input
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-[#2A2A2A] border-[#F5B740] text-white mt-1"
                        />
                      ) : (
                        <p className="text-white">{profileData.email}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingField === 'email' ? (
                        <>
                          <button 
                            onClick={() => handleSave('email')} 
                            className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => handleCancel('email')} 
                            className="text-gray-400 text-sm hover:text-gray-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setEditingField('email')} 
                          className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Phone Numbers Field */}
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                      <p className="text-gray-400 text-sm">Phone numbers</p>
                      {editingField === 'phone' ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Add a number"
                          className="bg-[#2A2A2A] border-[#F5B740] text-white mt-1"
                        />
                      ) : (
                        <p className="text-white">{profileData.phone || "Add a number"}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingField === 'phone' ? (
                        <>
                          <button 
                            onClick={() => handleSave('phone')} 
                            className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => handleCancel('phone')} 
                            className="text-gray-400 text-sm hover:text-gray-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setEditingField('phone')} 
                          className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                        >
                          {profileData.phone ? 'Edit' : 'Add'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Physical Address Field */}
                  <div className="flex justify-between items-center">
                    <div className="flex-1 mr-4">
                      <p className="text-gray-400 text-sm">Physical Address</p>
                      {editingField === 'address' ? (
                        <Input
                          value={profileData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="bg-[#2A2A2A] border-[#F5B740] text-white mt-1"
                        />
                      ) : (
                        <p className="text-white">{profileData.address}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingField === 'address' ? (
                        <>
                          <button 
                            onClick={() => handleSave('address')} 
                            className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => handleCancel('address')} 
                            className="text-gray-400 text-sm hover:text-gray-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setEditingField('address')} 
                          className="text-[#F5B740] text-sm hover:text-[#F5B740]/80"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Integrations Section */}
            <div className="border-b border-gray-800">
              <button 
                className="w-full flex items-center justify-between py-4 group"
                onClick={() => setIsIntegrationsOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg">Integrations</span>
                  <div className="w-4 h-4 rounded-full border border-[#F5B740] flex items-center justify-center">
                    <span className="text-[#F5B740] text-xs">?</span>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-[#F5B740]" />
              </button>
            </div>

            {/* Brand Kit Section */}
            <div className="border-b border-gray-800">
              <button 
                className="w-full flex items-center justify-between py-4 group"
                onClick={() => setIsBrandKitOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg">Brand Kit</span>
                  <div className="w-4 h-4 rounded-full border border-[#F5B740] flex items-center justify-center">
                    <span className="text-[#F5B740] text-xs">?</span>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-[#F5B740]" />
              </button>
            </div>

            {/* Settings Section */}
            <div className="border-b border-gray-800">
              <div className="py-4">
                <span className="text-white text-lg">Settings</span>
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-2 py-2">
              <span className="text-white text-xl">Security</span>
              <div className="flex flex-col sm:flex-row justify-between 
                              items-start sm:items-center gap-3 sm:gap-4 mt-2">
                <span className="text-gray-400">Manage your Password</span>
                <Button 
                  className="bg-[#F5B740] text-black hover:bg-[#F5B740]/90 
                            rounded-full w-full sm:w-auto"
                >
                  Change Password
                </Button>
              </div>
            </div>

            {/* Workers Section */}
            <div className="bg-black rounded-2xl p-4 sm:p-6 mt-8">
              <h2 className="text-white text-xl mb-4">My Workers</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center 
                              sm:justify-between gap-4 sm:gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <Image 
                      src={oscarImage}
                      alt="Oscar"
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="bg-[#333]">O</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-white text-base block">Oscar</span>
                    <span className="text-gray-400 text-sm block">The Content Manager</span>
                  </div>
                </div>
                <Button 
                  className="bg-[#F7B928] text-black hover:bg-[#F7B928]/90 
                            rounded-full w-full sm:w-auto"
                >
                  Manage Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Logout Button Container */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button 
              variant="outline"
              className="border-[#F5B740] text-[#F5B740] hover:bg-[#F5B740]/10 
                       rounded-full text-sm sm:text-base px-8 sm:px-12"
            >
              Log Out
            </Button>
          </div>
        </div>

        {/* Product Feedback Button */}
        {/*<div className="fixed bottom-4 right-4">
          <Button 
            className="bg-[#F5B740] text-black hover:bg-[#F5B740]/90 rounded-full"
          >
            Product feedback
          </Button>
        </div>*/}
      </div>

      {/* Modals */}
      <BrandKit isOpen={isBrandKitOpen} onClose={() => setIsBrandKitOpen(false)} />
      <IntegrationsModal isOpen={isIntegrationsOpen} onClose={() => setIsIntegrationsOpen(false)} />
    </div>
  )
} 