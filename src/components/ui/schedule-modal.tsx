"use client"

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { TimePickerDemo } from '@/components/ui/time-picker'
import { format } from "date-fns"

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  onSchedule: (date: Date, time: string) => void
}

export function ScheduleModal({ isOpen, onClose, onSchedule }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [showCalendar, setShowCalendar] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  if (!isOpen) return null

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setShowCalendar(false)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setShowTimePicker(false)
  }

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':')
      const scheduledDate = new Date(selectedDate)
      scheduledDate.setHours(parseInt(hours), parseInt(minutes))
      onSchedule(scheduledDate, selectedTime)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-[#F7B928] rounded-3xl p-1 w-full max-w-[400px]">
        <div className="bg-[#141414] rounded-3xl w-full relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-white/80"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-white text-xl mb-8 text-center">Schedule</h2>

          <div className="space-y-4">
            {/* Date Selection */}
            <button
              onClick={() => {
                setShowCalendar(true)
                setShowTimePicker(false)
              }}
              className="w-full px-4 py-3 rounded-lg bg-transparent
                       border border-[#F7B928] text-left text-gray-400
                       focus:outline-none hover:bg-[#F7B928]/5 transition-colors"
            >
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </button>

            {/* Time Selection */}
            <button
              onClick={() => {
                setShowTimePicker(true)
                setShowCalendar(false)
              }}
              className="w-full px-4 py-3 rounded-lg bg-transparent
                       border border-[#F7B928] text-left text-gray-400
                       focus:outline-none hover:bg-[#F7B928]/5 transition-colors"
            >
              {selectedTime || 'Select time'}
            </button>

            {/* Schedule Button */}
            <button
              onClick={handleSchedule}
              disabled={!selectedDate || !selectedTime}
              className="w-full bg-gradient-to-r from-[#F7B928] to-[#D4A347]
                       text-black rounded-full py-3 mt-6
                       hover:from-[#F7B928]/90 hover:to-[#D4A347]/90 
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Overlay */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]">
          <div className="bg-[#242424] p-6 rounded-3xl border border-[#F7B928]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md bg-[#242424]"
            />
          </div>
        </div>
      )}

      {/* Time Picker Overlay */}
      {showTimePicker && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]">
          <div className="bg-[#242424] p-8 rounded-3xl border border-[#F7B928]
                        w-[90%] max-w-[300px] mx-auto">
            <TimePickerDemo 
              onTimeSelect={handleTimeSelect}
              selectedTime={selectedTime}
            />
          </div>
        </div>
      )}
    </div>
  )
} 