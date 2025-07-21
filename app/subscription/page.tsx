"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuthModal from "@/components/auth-modal"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$8.99",
    period: "/month",
    features: [
      "Watch on 1 device at a time",
      "HD available",
      "Download on 1 device",
      "Unlimited movies and TV shows",
      "Cancel anytime",
    ],
    popular: false,
    color: "from-gray-600 to-gray-700",
  },
  {
    name: "Standard",
    price: "$13.99",
    period: "/month",
    features: [
      "Watch on 2 devices at a time",
      "Full HD available",
      "Download on 2 devices",
      "Unlimited movies and TV shows",
      "Cancel anytime",
      "Ad-free experience",
    ],
    popular: true,
    color: "from-[#ff0040] to-[#ff2060]",
  },
  {
    name: "Premium",
    price: "$17.99",
    period: "/month",
    features: [
      "Watch on 4 devices at a time",
      "4K + HDR available",
      "Download on 4 devices",
      "Unlimited movies and TV shows",
      "Cancel anytime",
      "Ad-free experience",
      "Spatial audio",
    ],
    popular: false,
    color: "from-[#00ff88] to-[#00ddff]",
  },
]

export default function SubscriptionPage() {
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

  const handlePlanSelect = (planName: string) => {
    setAuthMode("signup")
    setShowAuthModal(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header onSignUpClick={handleSignUpClick} onLoginClick={handleLoginClick} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00ff88] to-[#00ddff] bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join millions of viewers and get unlimited access to thousands of movies and TV shows
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#ff0040] shadow-2xl shadow-[#ff0040]/20"
                    : "bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-700 hover:border-gray-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#ff0040] to-[#ff2060] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-[#00ff88] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#ff0040] to-[#ff2060] hover:from-[#ff2060] to-[#ff4080] text-white shadow-lg hover:shadow-xl hover:shadow-[#ff0040]/30"
                      : "bg-gradient-to-r from-[#00ff88] to-[#00ddff] hover:from-[#00ddff] to-[#00ff88] text-black shadow-lg hover:shadow-xl hover:shadow-[#00ff88]/30"
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16 space-y-4">
            <p className="text-gray-400 text-lg">No contracts, no cancellation fees, no commitments.</p>
            <p className="text-gray-400">Switch or cancel your plan anytime.</p>
          </div>
        </div>
      </main>

      <Footer />

      {showAuthModal && (
        <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} onSwitchMode={(mode) => setAuthMode(mode)} />
      )}
    </div>
  )
}
