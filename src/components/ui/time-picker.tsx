"use client"

import React, { useState } from 'react'
import { cn } from "@/lib/utils"

interface TimePickerProps {
  onTimeSelect: (time: string) => void
  selectedTime?: string
}

export function TimePickerDemo({ onTimeSelect, selectedTime }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0')
  )
  const minutes = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  )

  const [hour, setHour] = useState(selectedTime?.split(':')[0] || '00')
  const [minute, setMinute] = useState(selectedTime?.split(':')[1] || '00')

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(e.target.value)
    onTimeSelect(`${e.target.value}:${minute}`)
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(e.target.value)
    onTimeSelect(`${hour}:${e.target.value}`)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-[#F7B928] text-lg">Select Time</h3>
      <div className="flex items-center gap-3">
        <select
          value={hour}
          onChange={handleHourChange}
          className={cn(
            "bg-[#1A1A1A] text-[#F7B928] border border-[#F7B928] rounded-xl",
            "px-4 py-2 appearance-none cursor-pointer focus:outline-none",
            "text-center text-lg"
          )}
        >
          {hours.map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <span className="text-[#F7B928] text-2xl">:</span>
        <select
          value={minute}
          onChange={handleMinuteChange}
          className={cn(
            "bg-[#1A1A1A] text-[#F7B928] border border-[#F7B928] rounded-xl",
            "px-4 py-2 appearance-none cursor-pointer focus:outline-none",
            "text-center text-lg"
          )}
        >
          {minutes.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  )
} 