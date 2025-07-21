"use client"

import { useEffect } from "react"

export default function Footer() {
  const footerLinks = [
    "FAQ",
    "Help Center",
    "Account",
    "Media Center",
    "Investor Relations",
    "Jobs",
    "Ways to Watch",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
  ]

  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }, [])

  return (
    <footer className="bg-[#0a0a0a] py-16 px-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-400 hover:text-[#00ff88] transition-colors duration-300 text-sm"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-sm">© 2025 BingeFlix, Inc.</p>
      </div>
    </footer>
  )
}
