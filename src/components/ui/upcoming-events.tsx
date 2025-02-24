"use client"

import { format, addDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { useEventsStore } from '@/lib/events-store'

export function UpcomingEvents() {
  const events = useEventsStore(state => state.events)
  const now = new Date('2025-02-24T11:46:15+03:00')

  // Get next few days
  const getUpcomingDays = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const date = addDays(now, i)
      return {
        date,
        dayName: format(date, 'EEEE'),
        events: events.filter(event => {
          const eventDate = new Date(event.date)
          return isWithinInterval(eventDate, {
            start: startOfDay(date),
            end: endOfDay(date)
          })
        })
      }
    })
  }

  const upcomingDays = getUpcomingDays()

  const EventGroup = ({ day, date, events }: { 
    day: string
    date: Date
    events: any[]
  }) => (
    <div className="mb-5">
      <h3 className="text-sm text-gray-400 mb-2">{day}</h3>
      {events.length > 0 ? (
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F7B928]" />
              <div className="flex-1">
                <p className="text-sm text-white">{event.title}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(event.date), 'h:mm a')} · {event.type} · {event.segment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-500" />
          <span className="text-xs text-gray-500 italic">No planned events</span>
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-[#242424] rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
      <div className="space-y-2">
        {upcomingDays.map(({ dayName, date, events }) => (
          <EventGroup 
            key={dayName} 
            day={dayName}
            date={date}
            events={events}
          />
        ))}
      </div>
    </div>
  )
}