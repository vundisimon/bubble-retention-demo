"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEventsStore } from "@/lib/events-store"
import { format } from "date-fns"

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: string
  segment: string
  recipients: number
  status: string
}

interface CalendarViewProps {
}

export function CalendarView() {
  const events = useEventsStore(state => state.events)

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <Card className="w-full mt-4 bg-[#212121] text-white">
      <CardHeader>
        <CardTitle className="text-lg">Campaign Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <div 
              key={event.id}
              className="p-4 rounded-lg bg-[#333] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{event.title}</h3>
                <Badge variant="outline" className="bg-[#F7B928] text-black">
                  {event.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-400">
                <p>Date: {format(new Date(event.date), 'PPP p')}</p>
                <p>Type: {event.type}</p>
                <p>Segment: {event.segment} ({event.recipients.toLocaleString()} recipients)</p>
              </div>
            </div>
          ))}
          {sortedEvents.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No events scheduled. Use the chat to schedule a new event!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
