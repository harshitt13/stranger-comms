"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

interface ThemeToggleProps {
  isDarkMode: boolean
  toggleTheme: () => void
}

export default function ThemeToggle({ isDarkMode, toggleTheme }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex items-center justify-center"
      >
        {isDarkMode ? <Moon className="h-4 w-4 absolute" /> : <Sun className="h-4 w-4 absolute" />}
      </motion.div>
    </Button>
  )
}

