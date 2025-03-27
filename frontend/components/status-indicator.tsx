"use client"

import { motion } from "framer-motion"

interface StatusIndicatorProps {
  isConnected: boolean
  isSearching: boolean
}

export default function StatusIndicator({ isConnected, isSearching }: StatusIndicatorProps) {
  let statusText = "Disconnected"
  let statusColor = "bg-red-500"

  if (isSearching) {
    statusText = "Searching..."
    statusColor = "bg-yellow-500"
  } else if (isConnected) {
    statusText = "Connected"
    statusColor = "bg-green-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full"
    >
      <motion.div
        animate={{
          scale: isSearching ? [1, 1.2, 1] : 1,
        }}
        transition={{
          repeat: isSearching ? Number.POSITIVE_INFINITY : 0,
          duration: 1.5,
        }}
        className={`w-2 h-2 rounded-full mr-2 ${statusColor}`}
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">{statusText}</span>
    </motion.div>
  )
}

