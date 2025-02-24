"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to /chats by default
    router.push('/chats')
  }, [router])

  return null
}
