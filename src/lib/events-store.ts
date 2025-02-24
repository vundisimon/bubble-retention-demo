"use client"

import { create } from 'zustand'

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: string
  segment: string
  recipients: number
  status: string
}

interface EventsStore {
  events: CalendarEvent[]
  addEvent: (event: CalendarEvent) => void
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void
  rescheduleEvent: (id: string, newDate: string) => void
  findEventByTitle: (title: string) => CalendarEvent | undefined
}

export const useEventsStore = create<EventsStore>((set, get) => ({
  events: [],
  addEvent: (event) => set((state) => ({ 
    events: [...state.events, { ...event, id: Math.random().toString(36).substr(2, 9) }] 
  })),
  updateEvent: (id, updates) => set((state) => ({
    events: state.events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    )
  })),
  rescheduleEvent: (id, newDate) => set((state) => ({
    events: state.events.map(event =>
      event.id === id ? { ...event, date: newDate } : event
    )
  })),
  findEventByTitle: (title) => {
    const state = get()
    return state.events.find(event => 
      event.title.toLowerCase().includes(title.toLowerCase())
    )
  }
}))
