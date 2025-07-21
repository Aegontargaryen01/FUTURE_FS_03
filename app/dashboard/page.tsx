import { redirect } from "next/navigation"

export default function DashboardPage() {
  redirect("/dashboard/account")
  return null // This component will not render anything as it redirects
}
