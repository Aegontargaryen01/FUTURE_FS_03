import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar" // This is the correct import
import { DashboardMainContent } from "@/components/dashboard-main-content" // This is the correct import

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <DashboardMainContent>{children}</DashboardMainContent>
    </SidebarProvider>
  )
}
