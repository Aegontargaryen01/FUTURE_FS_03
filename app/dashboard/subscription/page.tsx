import { Button } from "@/components/ui/button"

export default function SubscriptionPage() {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#00ff88]">My Subscription Plan</h2>
      <div className="space-y-4 text-gray-300">
        <p>
          <strong>Current Plan:</strong> Premium ($17.99/month)
        </p>
        <p>
          <strong>Features:</strong> 4K + HDR, Spatial Audio, 4 devices, Ad-free
        </p>
        <p>You are enjoying the ultimate BingeFlix experience!</p>
        <Button className="bg-gradient-to-r from-[#ff0040] to-[#ff2060] hover:from-[#ff2060] hover:to-[#ff4080] text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300">
          Change Plan
        </Button>
        <Button variant="outline" className="ml-4 border-gray-700 text-gray-300 hover:bg-[#2a2a2a] bg-transparent">
          Cancel Subscription
        </Button>
      </div>
    </div>
  )
}
