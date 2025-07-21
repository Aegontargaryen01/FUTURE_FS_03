"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export default function HeroEnhancedAudio() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)

      // Show feedback
      console.log(newMutedState ? "Video muted" : "Video unmuted")
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
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

  return (
    <section className="h-screen relative overflow-hidden flex items-center pl-12">
      {/* Video Background with Audio */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/videos/game-of-thrones-with-audio.mp4" type="video/mp4" />
        <source src="/videos/game-of-thrones-with-audio.webm" type="video/webm" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>

      {/* Enhanced Audio Controls Panel */}
      <div className="absolute top-6 right-6 z-30 bg-black/80 backdrop-blur-sm rounded-2xl p-4 space-y-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-full bg-[#00ff88] hover:bg-[#00ddff] text-black p-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className={`w-full p-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${
            isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#00ff88] hover:bg-[#00ddff] text-black"
          }`}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>

        {/* Volume Slider */}
        <div className="flex flex-col items-center space-y-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-white text-xs">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      {/* Audio Status Indicator */}
      <div className="absolute top-6 left-6 z-30 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm">
        {isMuted ? "🔇 Muted" : "🔊 Audio On"}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 right-6 z-30 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm max-w-xs">
        Click the volume button to enable audio
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
          <button className="bg-gradient-to-r from-[#00ff88] to-[#00ddff] text-black px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00ff88]/30">
            ▶ Play
          </button>
          <button className="bg-white/20 text-white px-8 py-4 rounded-full text-xl border-2 border-[#00ddff] transition-all duration-300 hover:bg-[#00ddff]/20 hover:shadow-xl hover:shadow-[#00ddff]/30">
            ℹ More Info
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #00ff88;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #00ff88;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  )
}
