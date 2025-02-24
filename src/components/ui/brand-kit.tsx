"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Upload, Search, Cloud, Plus, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from 'next/image'
import { useDebounce } from 'use-debounce' // Install: npm install use-debounce
import { brandInfo } from '@/data/brand-info'
import { ProductImagePlaceholder } from './product-image-placeholder'

interface BrandKitProps {
  isOpen: boolean
  onClose: () => void
}

// Define allowed file types
const ALLOWED_FILE_TYPES = {
  logos: ['image/png', 'image/jpeg', 'image/svg+xml'],
  icons: ['image/png', 'image/jpeg', 'image/svg+xml'],
}

// Type for upload response
interface UploadResponse {
  url: string;
  id: string;
}

interface ColorItem {
  id: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}

export function BrandKit({ isOpen, onClose }: BrandKitProps) {
  const [expandedSections, setExpandedSections] = useState({
    logos: true,
    icons: true,
    voice: true,
    rules: true,
    colors: true,
    products: true
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadType, setUploadType] = useState<'logos' | 'icons' | null>(null)
  const [ruleAction, setRuleAction] = useState<'avoid' | 'replace'>('replace')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch] = useDebounce(searchQuery, 300)
  const [brandVoice, setBrandVoice] = useState('')
  const [ruleInputs, setRuleInputs] = useState({
    replace: '',
    with: ''
  })
  const [uploads, setUploads] = useState({
    logos: brandInfo.assets.logos,
    icons: brandInfo.assets.icons,
    voice: [] as string[]
  })
  const [ruleMode, setRuleMode] = useState<'avoid' | 'replace'>('replace')
  const [colors, setColors] = useState<ColorItem[]>(brandInfo.colors)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [colorInput, setColorInput] = useState('')
  const [products, setProducts] = useState<Product[]>(brandInfo.products)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(brandInfo.products)
  const [isLoading, setIsLoading] = useState(false)

  const [urls] = useState({
    main: brandInfo.urls.main,
    products: brandInfo.urls.products,
    blog: brandInfo.urls.blog,
    about: brandInfo.urls.about
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  // Handle file upload
  const handleFileUpload = async (files: FileList | null, type: 'logos' | 'icons') => {
    if (!files?.length) return

    const file = files[0]
    if (!ALLOWED_FILE_TYPES[type].includes(file.type)) {
      toast.error(`Invalid file type. Please upload ${ALLOWED_FILE_TYPES[type].join(', ')}`)
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      // Backend API call would go here
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data: UploadResponse = await response.json()
      
      setUploads(prev => ({
        ...prev,
        [type]: [...prev[type], data]
      }))

      toast.success(`${type === 'logos' ? 'Logo' : 'Icon'} uploaded successfully`)
    } catch (error) {
      toast.error('Upload failed. Please try again.')
      console.error('Upload error:', error)
    }
  }

  const handleUploadClick = (type: 'logos' | 'icons') => {
    setUploadType(type)
    fileInputRef.current?.click()
  }

  // Handle voice text addition
  const handleVoiceAdd = async (text: string) => {
    try {
      // Backend API call would go here
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) throw new Error('Failed to add voice text')

      setUploads(prev => ({
        ...prev,
        voice: [...prev.voice, text]
      }))

      toast.success('Voice text added successfully')
    } catch (error) {
      toast.error('Failed to add voice text')
      console.error('Voice add error:', error)
    }
  }

  const handleAddColor = (color: string) => {
    if (color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      setColors(prev => [...prev, { id: crypto.randomUUID(), value: color }])
      setColorInput('')
      setShowColorPicker(false)
    }
  }

  const handleRemoveColor = (id: string) => {
    setColors(prev => prev.filter(color => color.id !== id))
  }

  const addNewButtonClass = "bg-[#333] text-gray-300 rounded-full px-6 transition-all duration-200 hover:bg-[#F5B740] hover:text-black border-none"

  // Filter products based on search
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setFilteredProducts(products)
      return
    }

    const searchLower = debouncedSearch.toLowerCase()
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    )
    setFilteredProducts(filtered)
  }, [debouncedSearch, products])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[690px] p-4 border-none bg-transparent">
        <DialogTitle className="sr-only">Brand Kit Settings</DialogTitle>
        <div className="bg-[#1A1A1A] border border-[#F5B740] rounded-[32px] p-8 
                      w-full h-[90vh] overflow-y-auto
                      scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent
                      hover:scrollbar-thumb-[#444444]">
          
          <h1 className="text-[#F5B740] text-center text-3xl font-semibold mb-12">
            BRAND KIT
          </h1>

          {/* URLs Section */}
          <div className="mb-12">
            <h2 className="text-white text-xl mb-6">URLs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                value={urls.main}
                readOnly
                placeholder="Add your website URL"
                className="bg-[#242424] border-[#F5B740] rounded-2xl h-14 
                         text-gray-400 text-base sm:text-lg px-6"
              />
              <Input 
                value={urls.about}
                readOnly
                placeholder="About Us Page"
                className="bg-[#242424] border-[#F5B740] rounded-2xl h-14 
                         text-gray-400 text-base sm:text-lg px-6"
              />
              <Input 
                value={urls.products}
                readOnly
                placeholder="Product Page"
                className="bg-[#242424] border-[#F5B740] rounded-2xl h-14 
                         text-gray-400 text-base sm:text-lg px-6"
              />
              <Input 
                value={urls.blog}
                readOnly
                placeholder="Blogs"
                className="bg-[#242424] border-[#F5B740] rounded-2xl h-14 
                         text-gray-400 text-base sm:text-lg px-6"
              />
            </div>
          </div>

          {/* Logos Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <ChevronDown className="h-6 w-6 text-[#F5B740]" />
                <span className="text-white text-xl">Logos</span>
              </div>
              <Button 
                variant="ghost"
                className={addNewButtonClass}
                onClick={() => {
                  setUploadType('logos')
                  fileInputRef.current?.click()
                }}
              >
                Add New
              </Button>
            </div>
            <div className="border border-[#F5B740] rounded-2xl p-8 bg-[#242424]">
              <div className="bg-white rounded-xl p-6">
                <Image
                  src="/images/bubble-logo.svg"
                  alt="Bubble Logo"
                  width={300}
                  height={100}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Icons Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <ChevronDown className="h-6 w-6 text-[#F5B740]" />
                <span className="text-white text-xl">Icons</span>
              </div>
              <Button 
                variant="ghost"
                className={addNewButtonClass}
                onClick={() => {
                  setUploadType('icons')
                  fileInputRef.current?.click()
                }}
              >
                Add New
              </Button>
            </div>
            <div className="border border-[#F5B740] rounded-2xl p-8 bg-[#242424]">
              <div className="bg-white rounded-xl p-6">
                <Image
                  src="/images/bubble-logo.svg"
                  alt="Bubble Icon"
                  width={100}
                  height={100}
                  className="w-32 h-32 object-contain mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Voice Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <ChevronDown className="h-6 w-6 text-[#F5B740]" />
                <span className="text-white text-xl">Voice</span>
              </div>
              <Button 
                variant="ghost"
                className={addNewButtonClass}
                onClick={() => {
                  const text = prompt('Enter voice text:')
                  if (text) handleVoiceAdd(text)
                }}
              >
                Add New
              </Button>
            </div>
            <div className="border border-[#F5B740] rounded-2xl bg-[#242424]">
              <textarea
                value="The brand voice is confident, sophisticated, and reassuring, combining authority with a sense of care. It positions itself as an industry leader, emphasizing premium quality and long-lasting results. The tone is both calming and thoughtful, focusing on the benefits of gentle formulas that deliver consistent, lasting outcomes over time. By prioritizing the best ingredients and conducting extensive clinical tests, the brand conveys a sense of expertise and commitment to delivering the highest quality skincare. The collaboration with dermatologists adds an element of trustworthiness, assuring consumers that the products are not only effective but also safe and scientifically backed. Overall, the voice embodies a blend of luxury and professionalism, speaking with calm assurance and offering premium care designed for real, lasting results."
                onChange={(e) => setBrandVoice(e.target.value)}
                placeholder="Type your Brand Voice here"
                className="w-full bg-transparent text-gray-400 p-6 rounded-2xl
                         border-none focus:outline-none resize-none h-32"
              />
            </div>
          </div>

          {/* Rules Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <ChevronDown className="h-6 w-6 text-[#F5B740]" />
                <span className="text-white text-xl">Rules</span>
              </div>
              <Button 
                variant="ghost"
                className={addNewButtonClass}
              >
                Add New
              </Button>
            </div>
            <div className="border border-[#F5B740] rounded-2xl p-4 bg-[#242424]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Toggle Buttons */}
                <div className="flex rounded-full bg-[#333] p-1 w-full sm:w-auto">
                  <button
                    onClick={() => setRuleMode('avoid')}
                    className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full transition-all duration-200 text-sm
                      ${ruleMode === 'avoid' 
                        ? 'bg-[#F5B740] text-black' 
                        : 'bg-transparent text-white hover:text-gray-300'}`}
                  >
                    Avoid
                  </button>
                  <button
                    onClick={() => setRuleMode('replace')}
                    className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full transition-all duration-200 text-sm
                      ${ruleMode === 'replace' 
                        ? 'bg-[#F5B740] text-black' 
                        : 'bg-transparent text-white hover:text-gray-300'}`}
                  >
                    Replace
                  </button>
                </div>
                
                {/* Input Fields */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                  <Input
                    placeholder="Replace"
                    className="bg-[#333] border-none text-gray-400 rounded-xl h-10 w-full"
                  />
                  <span className="text-white hidden sm:block">With</span>
                  <Input
                    placeholder="With"
                    className="bg-[#333] border-none text-gray-400 rounded-xl h-10 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Colors Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <ChevronDown className="h-6 w-6 text-[#F5B740]" />
                <span className="text-white text-xl">Colors</span>
              </div>
              <Button 
                variant="ghost"
                className={addNewButtonClass}
                onClick={() => setShowColorPicker(true)}
              >
                Add New
              </Button>
            </div>
            <div className="border border-[#F5B740] rounded-2xl p-6 bg-[#242424]">
              {showColorPicker && (
                <div className="mb-4 p-4 bg-[#1A1A1A] rounded-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input
                      type="color"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      className="w-12 h-12 rounded-full cursor-pointer bg-transparent border-none
                                [&::-webkit-color-swatch-wrapper]:p-0 
                                [&::-webkit-color-swatch]:border-none
                                [&::-webkit-color-swatch]:rounded-full"
                    />
                    <Input
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      placeholder="#000000"
                      className="bg-[#333] border-none text-gray-400 rounded-xl h-10 
                               font-mono uppercase"
                      maxLength={7}
                    />
                    <Button
                      onClick={() => handleAddColor(colorInput)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                {colors.map(color => (
                  <div key={color.id} className="w-12 h-12 rounded-full" style={{ backgroundColor: color.value }} />
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
          {expandedSections.products && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-12 bg-[#242424] border-[#F5B740] rounded-2xl h-14 
                           text-gray-400 text-base sm:text-lg"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#242424] p-4 rounded-lg flex items-center gap-4"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#333] flex-shrink-0">
                      {!product.imageUrl.startsWith('/products/') ? (
                        <ProductImagePlaceholder 
                          name={product.name} 
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-400 text-sm">{product.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 