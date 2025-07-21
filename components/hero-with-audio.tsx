"use client"

import { useState, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function HeroWithAudio() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
        // Unmute when user interacts
        if (isMuted) {
          videoRef.current.muted = false
          setIsMuted(false)
        }
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
        className="absolute inset-0 w-full h-full object-cover z-0 cursor-pointer"
        onClick={handleVideoClick}
        onLoadedData={() => setIsPlaying(true)}
      >
        <source src="/videos/game-of-thrones-with-audio.mp4" type="video/mp4" />
        <source src="/videos/game-of-thrones-with-audio.webm" type="video/webm" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10 pointer-events-none"></div>

      {/* Audio Control Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>

      {/* Audio Indicator */}
      {!isMuted && (
        <div className="absolute top-6 left-6 z-30 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          🔊 Audio On
        </div>
      )}

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

        {/* Click to unmute hint */}
        {isMuted && (
          <div className="mt-6 text-gray-300 text-sm flex items-center">
            <VolumeX className="w-4 h-4 mr-2" />
            Click the volume button to enable audio
          </div>
        )}
      </div>
    </section>
  )
}
