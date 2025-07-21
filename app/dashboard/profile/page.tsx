export default function ProfilePage() {
  return (
    <div className="p-6 bg-[#1a1a1a] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#00ff88]">Profile Settings</h2>
      <div className="space-y-4 text-gray-300">
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Preferred Genre:</strong> Sci-Fi
        </p>
        <p>
          <strong>Language:</strong> English
        </p>
        <p>Update your personal profile information.</p>
      </div>
    </div>
  )
}
