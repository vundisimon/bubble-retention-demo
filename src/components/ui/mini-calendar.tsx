"use client"

import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns'

interface MiniCalendarProps {
  currentDate: Date
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export function MiniCalendar({ currentDate, selectedDate, onDateSelect }: MiniCalendarProps) {
  const firstDay = startOfMonth(currentDate)
  const lastDay = endOfMonth(currentDate)
  const startDate = startOfWeek(firstDay, { weekStartsOn: 1 })
  const endDate = endOfWeek(lastDay, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const dayHeaders = [
    { key: 'mon', label: 'M' },
    { key: 'tue', label: 'T' },
    { key: 'wed', label: 'W' },
    { key: 'thu', label: 'T' },
    { key: 'fri', label: 'F' },
    { key: 'sat', label: 'S' },
    { key: 'sun', label: 'S' }
  ]

  return (
    <div className="bg-[#242424] rounded-xl p-4">
      <div className="mb-4">
        <span className="text-sm font-medium">{format(currentDate, 'MMMM')}</span>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {dayHeaders.map(({ key, label }) => (
          <div key={key} className="text-xs text-gray-500 text-center p-1">
            {label}
          </div>
        ))}
        
        {days.map(day => (
          <button
            key={day.toString()}
            onClick={() => onDateSelect(day)}
            className={`
              aspect-square flex items-center justify-center text-xs rounded-full
              hover:bg-[#F7B928]/10 transition-colors
              ${!isSameMonth(day, currentDate) ? 'text-gray-600' : ''}
              ${isSameDay(day, selectedDate) 
                ? 'bg-[#F7B928] text-black hover:bg-[#F7B928]' 
                : ''}
            `}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  )
} 