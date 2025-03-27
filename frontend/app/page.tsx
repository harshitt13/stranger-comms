"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import ChatInterface from "@/components/chat-interface"

export default function Home() {
  const [isChatting, setIsChatting] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const startChat = () => setIsChatting(true)
  const stopChat = () => setIsChatting(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <main className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {!isChatting ? (
          <LandingPage onStartChat={startChat} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        ) : (
          <ChatInterface onStopChat={stopChat} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        )}
      </div>
    </main>
  )
}

