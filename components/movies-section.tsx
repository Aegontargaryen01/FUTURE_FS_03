"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import { useRouter } from "next/navigation"
import MovieRow from "./movie-row"

const recentReleases = [
  { title: "Superman", genre: "Superhero • Action", image: "", cssClass: "movie-superman" },
  { title: "Fantastic Four", genre: "Superhero • Adventure", image: "", cssClass: "movie-fantastic-four" },
  { title: "F1", genre: "Sports • Drama", image: "", cssClass: "movie-f1" },
  { title: "Blade Runner 2099", genre: "Sci-Fi • Thriller", image: "", cssClass: "movie-blade-runner" },
  { title: "Avatar 3", genre: "Sci-Fi • Adventure", image: "", cssClass: "movie-avatar-3" },
  { title: "Mission: Impossible 8", genre: "Action • Thriller", image: "", cssClass: "movie-mission-impossible" },
  { title: "John Wick 5", genre: "Action • Crime", image: "", cssClass: "movie-john-wick" },
  { title: "Dune: Part Three", genre: "Sci-Fi • Epic", image: "", cssClass: "movie-dune-3" },
  { title: "My New Movie", genre: "Action • Thriller", image: "", cssClass: "movie-my-new-movie" },
]

const marvelMovies = [
  { title: "The Avengers", genre: "Superhero • Action", image: "", cssClass: "movie-avengers-1" },
  { title: "Avengers: Age of Ultron", genre: "Superhero • Action", image: "", cssClass: "movie-avengers-2" },
  { title: "Avengers: Infinity War", genre: "Superhero • Action", image: "", cssClass: "movie-avengers-3" },
  { title: "Avengers: Endgame", genre: "Superhero • Action", image: "", cssClass: "movie-avengers-4" },
  // { title: "Captain Marvel 2", genre: "Superhero • Sci-Fi", image: "", cssClass: "movie-captain-marvel-2" },
]

const spiderManCollection = [
  { title: "Spider-Man", genre: "Superhero • Action", image: "", cssClass: "movie-spider-man-1" },
  { title: "Spider-Man 2", genre: "Superhero • Action", image: "", cssClass: "movie-spider-man-2" },
  { title: "Spider-Man 3", genre: "Superhero • Action", image: "", cssClass: "movie-spider-man-3" },
  { title: "The Amazing Spider-Man", genre: "Superhero • Action", image: "", cssClass: "movie-amazing-spider-man-1" },
  { title: "The Amazing Spider-Man 2", genre: "Superhero • Action", image: "", cssClass: "movie-amazing-spider-man-2" },
  { title: "Spider-Man: Homecoming", genre: "Superhero • Action", image: "", cssClass: "movie-spider-man-homecoming" },
  {
    title: "Spider-Man: Far From Home",
    genre: "Superhero • Action",
    image: "",
    cssClass: "movie-spider-man-far-from-home",
  },
  {
    title: "Spider-Man: No Way Home",
    genre: "Superhero • Action",
    image: "",
    cssClass: "movie-spider-man-no-way-home",
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    genre: "Animation • Action",
    image: "",
    cssClass: "movie-spider-verse-1",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation • Action",
    image: "",
    cssClass: "movie-spider-verse-2",
  },
  { title: "Venom", genre: "Action • Sci-Fi", image: "", cssClass: "movie-venom-1" },
  { title: "Venom: Let There Be Carnage", genre: "Action • Sci-Fi", image: "", cssClass: "movie-venom-2" },
]

const romanceMovies = [
  { title: "Fifty Shades of Grey", genre: "Romance • Drama", image: "", cssClass: "movie-fifty-shades-1" },
  { title: "Fifty Shades Darker", genre: "Romance • Drama", image: "", cssClass: "movie-fifty-shades-2" },
  { title: "Fifty Shades Freed", genre: "Romance • Drama", image: "", cssClass: "movie-fifty-shades-3" },
  { title: "The Notebook", genre: "Romance • Drama", image: "", cssClass: "movie-the-notebook" },
  { title: "Titanic", genre: "Romance • Drama", image: "", cssClass: "movie-titanic" },
  { title: "La La Land", genre: "Romance • Musical", image: "", cssClass: "movie-la-la-land" },
  // { title: "New Romance", genre: "Romance • Comedy", image: "", cssClass: "movie-new-romance" },
]

const epicMovies = [
  { title: "Troy", genre: "Action • Drama", image: "", cssClass: "movie-troy" },
  { title: "Gladiator", genre: "Action • Drama", image: "", cssClass: "movie-gladiator" },
  { title: "Braveheart", genre: "Action • Drama", image: "", cssClass: "movie-braveheart" },
  { title: "300", genre: "Action • History", image: "", cssClass: "movie-300" },
  { title: "Kingdom of Heaven", genre: "Action • Drama", image: "", cssClass: "movie-kingdom-of-heaven" },
  { title: "Alexander", genre: "Action • Biography", image: "", cssClass: "movie-alexander" },
]

export default function MoviesSection() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false) // Reflects actual video state for button text
  const [isManuallyControlled, setIsManuallyControlled] = useState(false) // New state: true if user clicked play/pause
  const [volume, setVolume] = useState(0.5)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handlePlayEvent = () => setIsPlaying(true)
    const handlePauseEvent = () => setIsPlaying(false)

    videoElement.addEventListener("play", handlePlayEvent)
    videoElement.addEventListener("pause", handlePauseEvent)

    // Initial state: video starts paused, not manually controlled
    setIsPlaying(false)
    setIsManuallyControlled(false)

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
      console.log(newMutedState ? "Marvel video muted" : "Marvel video unmuted")
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
        videoRef.current.play().catch(() => {}) // Catch potential play interruption errors
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
      videoRef.current.play().catch(() => {}) // Catch potential play interruption errors
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current && !isManuallyControlled) {
      videoRef.current.pause()
    }
  }

  return (
    <section className="py-16 px-12 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]" id="movies">
      {/* Marvel Hero Section with Video Background */}
      <div
        className="h-[70vh] relative overflow-hidden flex items-center pl-12 mb-16 rounded-2xl"
        onMouseEnter={handleMouseEnter} // Play on hover
        onMouseLeave={handleMouseLeave} // Pause on mouse leave
      >
        {/* Video Background - Removed autoplay, updated source */}
        <video
          ref={videoRef}
          muted={isMuted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/infinitySaga.mp4" type="video/mp4" />
          <source src="/videos/infinitySaga.webm" type="video/webm" />
          {/* Fallback to static image if video doesn't load */}
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability - Added pointer-events-none */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10 pointer-events-none"></div>

        {/* Audio Controls Panel - Top Right */}
        <div className="absolute top-6 right-6 z-30 bg-black/90 backdrop-blur-sm rounded-xl p-3 space-y-2 border border-gray-700">
          {/* Play/Pause Button */}
          <button
            onClick={toggleManualPlayPause}
            className="w-full bg-[#ff0040] hover:bg-[#ff2060] text-white p-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className={`w-full p-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center ${
              isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#ff0040] hover:bg-[#ff2060] text-white"
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
                background: `linear-gradient(to right, #ff0040 0%, #ff0040 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`,
              }}
            />
            <span className="text-white text-xs font-semibold">{Math.round(volume * 100)}%</span>
          </div>
        </div>

        {/* Audio Status Indicator - Top Left */}
        <div className="absolute top-6 left-6 z-30 bg-black/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm border border-gray-700">
          {isMuted ? "🔇 Muted" : "🔊 Audio On"}
        </div>

        {/* Marvel Hero Content */}
        <div className="max-w-2xl z-20 relative">
          <h1 className="text-6xl font-bold mb-6 text-shadow-lg">Marvel's <br />INFINITY SAGA</h1>
          
          <div className="flex space-x-4">
            <button
              onClick={handlePlayClick}
              className="bg-gradient-to-r from-[#ff0040] to-[#ff2060] text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#ff0040]/30"
            >
              ▶ Play
            </button>
            
          </div>
        </div>
      </div>
      <MovieRow title="Recent Releases" movies={recentReleases} />
      <MovieRow title="Marvel Cinematic Universe" movies={marvelMovies} />
      <MovieRow title="Spider-Man Collection" movies={spiderManCollection} />
      <MovieRow title="Romance & Drama" movies={romanceMovies} />
      <MovieRow title="Epic Movies" movies={epicMovies} />
    </section>
  )
}
