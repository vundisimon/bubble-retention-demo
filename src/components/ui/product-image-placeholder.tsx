import React from 'react'

interface ProductImagePlaceholderProps {
  name: string
  className?: string
}

export function ProductImagePlaceholder({ name, className = '' }: ProductImagePlaceholderProps) {
  // Get initials from the product name
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div 
      className={`${className} w-full h-full flex items-center justify-center bg-[#333] text-white font-medium`}
    >
      {initials}
    </div>
  )
}
