"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Smile, Paperclip } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ChatBoxProps {
  messages: { text: string; isUser: boolean }[]
  onSendMessage: (text: string) => void
}

export default function ChatBox({ messages, onSendMessage }: ChatBoxProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Card className="flex flex-col h-full relative overflow-hidden shadow-lg border-gray-200/50 dark:border-gray-700/50">
      {/* Decorative elements */}
      <div className="absolute -z-10 inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[30%] bg-gradient-to-bl from-primary/5 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-tr from-purple-500/5 to-transparent opacity-50" />
      </div>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 h-full flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
              <Smile className="w-6 h-6 text-gray-400" />
            </div>
            <p>No messages yet</p>
            <p className="text-xs mt-1">Say hello to start the conversation!</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.isUser
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="border-t border-gray-200/50 dark:border-gray-700/50 p-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Button type="button" size="icon" variant="ghost" className="text-gray-500">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="button" size="icon" variant="ghost" className="text-gray-500">
            <Smile className="h-4 w-4" />
          </Button>
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

