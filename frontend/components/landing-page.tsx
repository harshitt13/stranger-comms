"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ThemeToggle from "@/components/theme-toggle"
import { MessageSquare, Users, Video } from "lucide-react"
import { motion } from "framer-motion"

interface LandingPageProps {
  onStartChat: () => void
  isDarkMode: boolean
  toggleTheme: () => void
}

export default function LandingPage({ onStartChat, isDarkMode, toggleTheme }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-3xl" />

        {/* Animated floating shapes */}
        <div className="absolute top-[20%] left-[20%] w-16 h-16 rounded-lg bg-blue-400/20 animate-float-slow" />
        <div className="absolute top-[60%] left-[70%] w-20 h-20 rounded-full bg-green-400/20 animate-float-medium" />
        <div className="absolute top-[30%] left-[80%] w-12 h-12 rounded-lg bg-yellow-400/20 animate-float-fast rotate-45" />
        <div className="absolute top-[70%] left-[10%] w-24 h-24 rounded-full bg-pink-400/20 animate-float-slow" />
        <div className="absolute top-[15%] left-[50%] w-10 h-10 rounded-full bg-purple-400/20 animate-float-medium" />
        <div className="absolute top-[80%] left-[40%] w-14 h-14 rounded-lg bg-indigo-400/20 animate-float-fast rotate-12" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] dark:opacity-[0.08]" />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-sm border-t border-white/20 dark:border-white/10">
          <CardContent className="flex flex-col items-center p-8 space-y-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                RandomChat
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Connect with random people from around the world</p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 w-full">
              <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-blue-500/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Video Chat</span>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Text Chat</span>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-purple-500/10 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Meet People</span>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full">
              <Button
                onClick={onStartChat}
                size="lg"
                className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 h-12 text-base"
              >
                <span className="relative z-10">Start Chatting Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-[-100%] group-hover:translate-x-[100%]"></span>
              </Button>
            </motion.div>

            <div className="text-xs text-gray-400 dark:text-gray-500 text-center">
              By clicking "Start Chatting Now", you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

