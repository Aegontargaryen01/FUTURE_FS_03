"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface HeaderProps {
  onSignUpClick: () => void
  onLoginClick: () => void
}

export default function Header({ onSignUpClick, onLoginClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Set initial state based on client-side window.scrollY after mount
    setScrolled(window.scrollY > 50)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      const href = target.getAttribute("href")

      if (href?.startsWith("#")) {
        e.preventDefault()
        const element = document.querySelector(href)
        // Type assertion here:
        if (element instanceof HTMLElement) {
          // Check if it's an HTMLElement
          const headerHeight = 80 // Account for fixed header
          const elementPosition = element.offsetTop - headerHeight

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          })
        }
      }
    }

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll)
    })

    // Cleanup event listeners
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll)
      })
    }
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/98 backdrop-blur-md shadow-2xl shadow-[#00ff88]/10 border-b border-white/10"
          : "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <nav className="flex justify-between items-center px-12 py-5">
        <Link href="/" className="text-3xl font-bold text-[#00ff88] animate-pulse">
          BingeFlix
        </Link>

        <ul className="hidden md:flex space-x-10">
          <li>
            <Link
              href="/"
              className="text-white hover:text-[#00ddff] transition-all duration-300 px-5 py-2 rounded-full hover:bg-[#00ddff]/10 hover:shadow-lg hover:shadow-[#00ddff]/20"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/#series"
              className="text-white hover:text-[#00ddff] transition-all duration-300 px-5 py-2 rounded-full hover:bg-[#00ddff]/10 hover:shadow-lg hover:shadow-[#00ddff]/20"
            >
              Shows
            </Link>
          </li>
          <li>
            <Link
              href="/#movies"
              className="text-white hover:text-[#00ddff] transition-all duration-300 px-5 py-2 rounded-full hover:bg-[#00ddff]/10 hover:shadow-lg hover:shadow-[#00ddff]/20"
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              href="/subscription"
              className="text-white hover:text-[#00ddff] transition-all duration-300 px-5 py-2 rounded-full hover:bg-[#00ddff]/10 hover:shadow-lg hover:shadow-[#00ddff]/20"
            >
              Subscription
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-white hover:text-[#00ddff] transition-all duration-300 px-5 py-2 rounded-full hover:bg-[#00ddff]/10 hover:shadow-lg hover:shadow-[#00ddff]/20"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={onLoginClick}
            className="text-white hover:text-[#00ddff] transition-all duration-300 px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={onSignUpClick}
            className="bg-gradient-to-r from-[#ff0040] to-[#ff2060] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#ff0040]/40"
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  )
}
