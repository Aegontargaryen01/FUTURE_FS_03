"use client"

import type React from "react"

import { useState, useRef, useLayoutEffect } from "react" // Changed useEffect to useLayoutEffect
import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false) // Reflects actual video state for button text
  const [isManuallyControlled, setIsManuallyControlled] = useState(false) // New state: true if user clicked play/pause
  const [volume, setVolume] = useState(0.5)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useLayoutEffect(() => {
    // Changed from useEffect
    const videoElement = videoRef.current
    if (!videoElement) return

    // Set initial isPlaying state based on video element's actual state after mount
    // This ensures the client-side state matches the actual DOM state immediately after render
    setIsPlaying(!videoElement.paused)

    const handlePlayEvent = () => setIsPlaying(true)
    const handlePauseEvent = () => setIsPlaying(false)

    videoElement.addEventListener("play", handlePlayEvent)
    videoElement.addEventListener("pause", handlePauseEvent)

    return () => {
      videoElement.removeEventListener("play", handlePlayEvent)
      videoElement.removeEventListener("pause", handlePauseEvent)
    }
  }, []) // Empty dependency array: runs once on mount

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
      console.log(newMutedState ? "Video muted" : "Video unmuted")
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false
        setIsMuted(false)
      }
    }
  }

  // Navigate to subscription page when play button is clicked
  const handlePlayClick = () => {
    router.push("/subscription")
  }

  // New function for manual play/pause button
  const toggleManualPlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {})
        setIsManuallyControlled(true)
      } else {
        videoRef.current.pause()
        setIsManuallyControlled(true)
      }
    }
  }

  // Hover handlers
  const handleMouseEnter = () => {
    if (videoRef.current && !isManuallyControlled) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {})
      }
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current && !isManuallyControlled) {
      if (!videoRef.current.paused) {
        videoRef.current.pause()
      }
    }
  }

  return (
    <section
      className="h-screen relative overflow-hidden flex items-center pl-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Background - Removed autoplay */}
      <video
        ref={videoRef}
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/gotT.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>

      {/* Audio Controls Panel - Top Right */}
      <div className="absolute top-6 right-6 z-30 bg-black/90 backdrop-blur-sm rounded-xl p-3 space-y-2 border border-gray-700">
        {/* Play/Pause Button */}
        <button
          onClick={toggleManualPlayPause}
          className="w-full bg-[#00ff88] hover:bg-[#00ddff] text-black p-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
          title={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className={`w-full p-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center ${
            isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#00ff88] hover:bg-[#00ddff] text-black"
          }`}
          title={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Volume Slider */}
        <div className="flex flex-col items-center space-y-1">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #00ff88 0%, #00ff88 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`,
            }}
          />
          <span className="text-white text-xs font-semibold">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      {/* Audio Status Indicator - Top Left */}
      <div className="absolute top-6 left-6 z-30 bg-black/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm border border-gray-700">
        {isMuted ? "🔇 Muted" : "🔊 Audio On"}
      </div>

      {/* Content */}
      <div className="max-w-2xl z-20 relative">
        <h1 className="text-6xl font-bold mb-6 text-shadow-lg">Game of Thrones</h1>
        <p className="text-2xl mb-8 leading-relaxed font-light italic">
          When you play the <span className="text-red-500 text-5xl font-semibold">Game of Thrones</span>
          <br />
          you either <span className="text-[#00ff88] text-3xl italic">Win</span> or you{" "}
          <span className="text-red-500 text-3xl font-semibold">Die</span>
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handlePlayClick}
            className="bg-gradient-to-r from-[#00ff88] to-[#00ddff] text-black px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00ff88]/30"
          >
            ▶ Play
          </button>
          
        </div>
      </div>
    </section>
  )
}
