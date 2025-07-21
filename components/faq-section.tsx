"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "What is BingeFlix?",
    answer:
      "BingeFlix is a streaming entertainment service that offers TV series, movies and more on thousands of internet-connected devices. You can enjoy unlimited ad-free viewing of our content.",
  },
  {
    question: "How much does BingeFlix cost?",
    answer:
      "Watch BingeFlix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month. No extra costs, no contracts.",
  },
  {
    question: "Where can I watch?",
    answer:
      "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your BingeFlix account to watch instantly on the web at bingeflix.com from your personal computer or on any internet-connected device.",
  },
  {
    question: "How do I cancel?",
    answer:
      "BingeFlix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
  },
  {
    question: "What can I watch on BingeFlix?",
    answer:
      "BingeFlix has an extensive library of feature films, documentaries, TV shows, anime, award-winning BingeFlix originals, and more. Watch as much as you want, anytime you want.",
  },
  {
    question: "Is BingeFlix good for kids?",
    answer:
      "The BingeFlix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls.",
  },
]

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-12 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-[#00ff88] text-shadow-lg">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#222] hover:shadow-lg hover:shadow-[#00ff88]/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center text-white hover:text-[#00ff88] transition-colors duration-300"
              >
                <span className="text-xl font-medium">{faq.question}</span>
                <Plus
                  className={`w-8 h-8 text-[#00ddff] transition-all duration-300 ${
                    activeIndex === index ? "rotate-45 text-[#00ff88]" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <div className="px-8 bg-[#0f0f0f]">
                  <p className="text-gray-300 text-lg leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
