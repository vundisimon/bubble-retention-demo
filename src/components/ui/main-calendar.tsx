"use client"

import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek, 
  format, 
  isSameMonth, 
  isSameDay,
  addHours,
  startOfDay,
  eachHourOfInterval
} from 'date-fns'
import { useEventsStore } from "@/lib/events-store"

interface MainCalendarProps {
  currentDate: Date
  selectedDate: Date
  onDateSelect: (date: Date) => void
  view: string
}

export function MainCalendar({ currentDate, selectedDate, onDateSelect, view }: MainCalendarProps) {
  const events = useEventsStore((state) => state.events)

  const firstDay = startOfMonth(currentDate)
  const lastDay = endOfMonth(currentDate)
  const startDate = startOfWeek(firstDay, { weekStartsOn: 0 }) // 0 = Sunday
  const endDate = endOfWeek(lastDay, { weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return isSameDay(eventDate, day)
    })
  }

  const renderEvents = (day: Date) => {
    const dayEvents = getEventsForDay(day)
    return dayEvents.map((event, index) => (
      <div
        key={index}
        className="mt-1 p-1 text-xs bg-[#F7B928] text-black rounded truncate"
        title={`${event.title} - ${event.segment}`}
      >
        {event.title}
      </div>
    ))
  }

  const renderMonthView = () => (
    <div className="grid grid-cols-7 border-l border-t border-[#FFD150]">
      {/* Day headers with solid black background */}
      <div className="col-span-7 grid grid-cols-7">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div 
            key={day} 
            className="bg-black p-3 text-center text-sm text-gray-400 border-r border-b border-[#FFD150]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days with FFD150 grid lines */}
      {days.map(day => (
        <div
          key={day.toString()}
          onClick={() => onDateSelect(day)}
          className={`
            bg-[#242424] min-h-[120px] p-3 transition-colors cursor-pointer
            border-r border-b border-[#FFD150]
            hover:bg-[#2A2A2A]
            ${!isSameMonth(day, currentDate) ? 'text-gray-600' : ''}
            ${isSameDay(day, new Date()) ? 'ring-1 ring-inset ring-[#FFD150]' : ''}
            ${isSameDay(day, selectedDate) ? 'bg-[#FFD150]/10' : ''}
          `}
        >
          <span className="text-sm">{format(day, 'd')}</span>
          {renderEvents(day)}
        </div>
      ))}
    </div>
  )

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 })
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

    return (
      <div className="grid grid-cols-8 h-full border-l border-t border-[#FFD150]">
        {/* Time column */}
        <div className="border-r border-b border-[#FFD150]">
          <div className="bg-black p-3 h-[48px] border-b border-[#FFD150]"></div>
          {eachHourOfInterval({
            start: startOfDay(currentDate),
            end: addHours(startOfDay(currentDate), 23)
          }).map(hour => (
            <div 
              key={hour.toString()} 
              className="p-2 border-b border-[#FFD150] h-[60px] text-xs text-gray-400"
            >
              {format(hour, 'HH:mm')}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {days.map(day => (
          <div key={day.toString()} className="border-r border-[#FFD150]">
            <div className="bg-black p-3 text-center border-b border-[#FFD150] h-[48px]">
              <div className="text-sm text-gray-400">{format(day, 'EEE')}</div>
              <div className="text-sm">{format(day, 'd')}</div>
              {renderEvents(day)}
            </div>
            {eachHourOfInterval({
              start: startOfDay(day),
              end: addHours(startOfDay(day), 23)
            }).map(hour => (
              <div 
                key={hour.toString()} 
                className="border-b border-[#FFD150] h-[60px] hover:bg-[#2A2A2A] transition-colors"
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  const renderDayView = () => {
    const hours = eachHourOfInterval({
      start: startOfDay(currentDate),
      end: addHours(startOfDay(currentDate), 23)
    })

    return (
      <div className="grid grid-cols-2 h-full border-l border-t border-[#FFD150]">
        {/* Time column */}
        <div className="border-r border-b border-[#FFD150] w-[100px]">
          <div className="bg-black p-3 h-[48px] border-b border-[#FFD150]"></div>
          {hours.map(hour => (
            <div 
              key={hour.toString()} 
              className="p-2 border-b border-[#FFD150] h-[60px] text-xs text-gray-400"
            >
              {format(hour, 'HH:mm')}
            </div>
          ))}
        </div>

        {/* Day column */}
        <div className="border-r border-[#FFD150] col-span-1">
          <div className="bg-black p-3 text-center border-b border-[#FFD150] h-[48px]">
            <div className="text-sm text-gray-400">{format(currentDate, 'EEEE')}</div>
            <div className="text-sm">{format(currentDate, 'd MMMM')}</div>
            {renderEvents(currentDate)}
          </div>
          {hours.map(hour => (
            <div 
              key={hour.toString()} 
              className="border-b border-[#FFD150] h-[60px] hover:bg-[#2A2A2A] transition-colors"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}
    </div>
  )
} 