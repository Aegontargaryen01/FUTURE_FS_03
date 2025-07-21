"use client"

import type React from "react"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AuthModalProps {
  mode: "login" | "signup"
  onClose: () => void
  onSwitchMode: (mode: "login" | "signup") => void
}

export default function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    onClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{mode === "login" ? "Sign In" : "Sign Up"}</h2>
          <p className="text-gray-400">
            {mode === "login" ? "Welcome back to BingeFlix" : "Join millions of viewers worldwide"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-[#1a1a1a] border-gray-700 text-white focus:border-[#00ff88] focus:ring-[#00ff88]/20"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-[#1a1a1a] border-gray-700 text-white focus:border-[#00ff88] focus:ring-[#00ff88]/20"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="bg-[#1a1a1a] border-gray-700 text-white focus:border-[#00ff88] focus:ring-[#00ff88]/20"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="bg-[#1a1a1a] border-gray-700 text-white focus:border-[#00ff88] focus:ring-[#00ff88]/20 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div>
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-[#1a1a1a] border-gray-700 text-white focus:border-[#00ff88] focus:ring-[#00ff88]/20"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff0040] to-[#ff2060] hover:from-[#ff2060] hover:to-[#ff4080] text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#ff0040]/30"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onSwitchMode(mode === "login" ? "signup" : "login")}
              className="text-[#00ff88] hover:text-[#00ddff] font-semibold transition-colors"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Social Login (for signup) */}
        {mode === "signup" && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0a0a0a] text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]">
                Google
              </Button>
              <Button variant="outline" className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]">
                Facebook
              </Button>
              <Button variant="outline" className="bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#2a2a2a]">
                Apple
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
