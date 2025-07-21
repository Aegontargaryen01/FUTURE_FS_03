"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ContentSection from "@/components/content-section"
import MoviesSection from "@/components/movies-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import AuthModal from "@/components/auth-modal"
import Image from "next/image" // Import Image component

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")

  const handleSignUpClick = () => {
    setAuthMode("signup")
    setShowAuthModal(true)
  }

  const handleLoginClick = () => {
    setAuthMode("login")
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Header onSignUpClick={handleSignUpClick} onLoginClick={handleLoginClick} />
      <main>
        <Hero />
        <ContentSection />
        <MoviesSection />
        <FAQSection />

        {/* New QR Code Section */}
        <section className="py-16 px-12 bg-[#0a0a0a] text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
            <p className="text-3xl font-bold mb-8 text-[#00ff88] text-shadow-lg">
              Scan this code for a 1 month free trial!
            </p>
            <Image
              src="/images/rickroll.png"
              alt="QR Code for 1 month free trial"
              width={250}
              height={250}
              className="rounded-lg shadow-xl border-4 border-[#00ff88]"
            />
          </div>
        </section>
      </main>
      <Footer />

      {showAuthModal && (
        <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} onSwitchMode={(mode) => setAuthMode(mode)} />
      )}
    </div>
  )
}
