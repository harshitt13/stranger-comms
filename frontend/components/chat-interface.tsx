"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import VideoArea from "@/components/video-area"
import ChatBox from "@/components/chat-box"
import StatusIndicator from "@/components/status-indicator"
import { ArrowRight, X, Users, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ChatInterfaceProps {
  onStopChat: () => void
  isDarkMode: boolean
  toggleTheme: () => void
}

export default function ChatInterface({ onStopChat, isDarkMode, toggleTheme }: ChatInterfaceProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [isSearching, setIsSearching] = useState(true)
  const [partnerCount, setPartnerCount] = useState(0)

  // Simulate connection after component mount
  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      setIsSearching(false)
      setIsConnected(true)
      // Add a welcome message
      setMessages([{ text: "Hi there! How are you doing today?", isUser: false }])
    }, 2000)

    // Simulate random online count
    setPartnerCount(Math.floor(Math.random() * 5000) + 8000)
    const countInterval = setInterval(() => {
      setPartnerCount((prev) => prev + Math.floor(Math.random() * 10) - 5)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(countInterval)
    }
  }, [])

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      setMessages([...messages, { text, isUser: true }])

      // Simulate response after a short delay
      setTimeout(() => {
        const responses = [
          "That's interesting! Tell me more about it.",
          "I see what you mean. How does that make you feel?",
          "Cool! I've been thinking about similar things lately.",
          "That's awesome! What else have you been up to?",
          "I understand. It's been a similar experience for me too.",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        setMessages((prev) => [
          ...prev,
          {
            text: randomResponse,
            isUser: false,
          },
        ])
      }, 1000)
    }
  }

  const handleNext = () => {
    setIsConnected(false)
    setIsSearching(true)
    setMessages([])

    // Simulate finding a new partner
    setTimeout(() => {
      setIsSearching(false)
      setIsConnected(true)
      // Add a different welcome message
      const greetings = [
        "Hey there! How's it going?",
        "Hi! Nice to meet you!",
        "Hello! What brings you here today?",
        "Hey! How are you doing?",
        "Hi there! What's up?",
      ]
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
      setMessages([{ text: randomGreeting, isUser: false }])
    }, 2000)
  }

  return (
    <div className="flex flex-col h-screen max-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient background */}
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-[40%] bg-gradient-to-tl from-purple-500/10 to-transparent" />

        {/* Subtle patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

        {/* Floating elements */}
        <div className="absolute top-[10%] right-[5%] w-40 h-40 rounded-full bg-blue-400/10 blur-xl" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 rounded-full bg-green-400/10 blur-xl" />
        <div className="absolute top-[40%] left-[30%] w-32 h-32 rounded-full bg-purple-400/10 blur-xl" />
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 p-4 z-10"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              RandomChat
            </h1>
            <div className="hidden md:flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-full">
              <Users className="w-3 h-3 mr-1" />
              {partnerCount.toLocaleString()} online
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <StatusIndicator isConnected={isConnected} isSearching={isSearching} />
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 overflow-hidden container mx-auto p-4 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSearching ? "searching" : "connected"}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <VideoArea isConnected={isConnected} isSearching={isSearching} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-4 flex-1 min-h-0"
        >
          <ChatBox messages={messages} onSendMessage={handleSendMessage} />
        </motion.div>
      </div>

      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 p-4 z-10"
      >
        <div className="container mx-auto flex justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="destructive" onClick={onStopChat} className="flex items-center shadow-md">
              <X className="mr-2 h-4 w-4" /> Stop Chat
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNext}
              className="flex items-center bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-md"
            >
              Find Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}

