"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Search, Video, VideoOff } from "lucide-react"

interface VideoAreaProps {
  isConnected: boolean
  isSearching: boolean
}

export default function VideoArea({ isConnected, isSearching }: VideoAreaProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Simulate local video stream
  useEffect(() => {
    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing media devices:", err)
      }
    }

    getLocalStream()

    return () => {
      // Clean up video streams when component unmounts
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[40vh] relative">
      {/* Background decorative elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[30%] w-24 h-24 rounded-full bg-primary/5 blur-xl" />
        <div className="absolute bottom-[10%] right-[20%] w-32 h-32 rounded-full bg-purple-500/5 blur-xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden bg-gray-800 relative h-full shadow-lg border border-gray-700/50">
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Video className="w-3 h-3 mr-1" /> You
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-gray-800 relative h-full flex items-center justify-center shadow-lg border border-gray-700/50">
          {isConnected && !isSearching ? (
            <>
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Video className="w-3 h-3 mr-1" /> Stranger
              </div>
            </>
          ) : (
            <div className="text-white text-center p-4 flex flex-col items-center justify-center h-full">
              {isSearching ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400 animate-pulse" />
                  </div>
                  <div className="animate-pulse text-lg font-medium mb-1">Finding someone to chat with...</div>
                  <div className="text-gray-400 text-sm">This won't take long</div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                    <VideoOff className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-lg font-medium mb-1">No one connected</div>
                  <div className="text-gray-400 text-sm">Waiting for someone to join</div>
                </>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

