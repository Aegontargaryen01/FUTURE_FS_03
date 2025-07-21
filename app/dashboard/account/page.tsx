export default function AccountPage() {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#00ff88]">Account Overview</h2>
      <div className="space-y-4 text-gray-300">
        <p>
          <strong>Email:</strong> user@example.com
        </p>
        <p>
          <strong>Membership:</strong> Premium Plan
        </p>
        <p>
          <strong>Next Billing Date:</strong> August 20, 2025
        </p>
        <p>Manage your account settings and preferences here.</p>
      </div>
    </div>
  )
}
