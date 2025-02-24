"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

interface CalendarEvent {
  title: string
  date: string
  type: string
  segment: string
  recipients: number
  status: string
}

interface CalendarGridProps {
  events?: CalendarEvent[]
}

export function CalendarGrid({ events = [] }: CalendarGridProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    if (selectedDate) {
      const eventsOnDay = events.filter(event => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        )
      })
      setSelectedEvents(eventsOnDay)
    }
  }, [selectedDate, events])

  const getDayContent = (day: Date) => {
    const eventsOnDay = events.filter(event => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      )
    })

    return eventsOnDay.length > 0 ? (
      <div className="relative w-full h-full">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="h-1.5 w-1.5 bg-[#F7B928] rounded-full" />
        </div>
      </div>
    ) : null
  }

  return (
    <Card className="w-full bg-[#212121] text-white border-0">
      <CardHeader>
        <CardTitle className="text-lg">Campaign Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="calendar-wrapper">
            <style jsx global>{`
              .calendar-wrapper .rdp {
                --rdp-cell-size: 40px;
                --rdp-accent-color: #F7B928;
                --rdp-background-color: #333;
                --rdp-accent-color-dark: #E5A922;
                --rdp-background-color-dark: #262626;
                --rdp-outline: 2px solid var(--rdp-accent-color);
                --rdp-outline-selected: 2px solid var(--rdp-accent-color);
                margin: 0;
              }
              .calendar-wrapper .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: #333;
              }
              .calendar-wrapper .rdp-day_selected, 
              .calendar-wrapper .rdp-day_selected:hover {
                background-color: #F7B928;
                color: black;
              }
              .calendar-wrapper .rdp-day_today {
                background-color: #333;
                color: #F7B928;
                font-weight: bold;
              }
              .calendar-wrapper .rdp-button {
                color: white;
              }
              .calendar-wrapper .rdp-head_cell {
                color: #666;
                font-weight: 500;
              }
              .calendar-wrapper .rdp-nav_button {
                color: white;
              }
              .calendar-wrapper .rdp-caption_label {
                color: white;
                font-weight: 500;
                font-size: 1rem;
              }
            `}</style>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="text-white"
              modifiers={{
                event: (date) => {
                  return events.some(event => {
                    const eventDate = new Date(event.date)
                    return (
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear()
                    )
                  })
                }
              }}
              modifiersStyles={{
                event: {
                  fontWeight: '500'
                }
              }}
              components={{
                DayContent: ({ date }) => (
                  <div className="relative flex items-center justify-center w-full h-full">
                    <span>{date.getDate()}</span>
                    {getDayContent(date)}
                  </div>
                )
              }}
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-[#F7B928]">
              {selectedDate ? (
                `Events on ${selectedDate.toLocaleDateString()}`
              ) : (
                'Select a date to view events'
              )}
            </h3>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-[#333] flex flex-col gap-2 border border-[#444] hover:border-[#F7B928] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <Badge variant="outline" className="bg-[#F7B928] text-black border-0">
                      {event.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Time: {new Date(event.date).toLocaleTimeString()}</p>
                    <p>Type: {event.type}</p>
                    <p>Segment: {event.segment} ({event.recipients.toLocaleString()} recipients)</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">
                {selectedDate ? 'No events scheduled for this date' : 'Click on a date to view scheduled events'}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
