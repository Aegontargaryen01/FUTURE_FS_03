"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Plus, Search } from "lucide-react"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function DashboardMainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Helper to get the current page title for the header
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard/account":
        return "Account Overview"
      case "/dashboard/profile":
        return "Profile Settings"
      case "/dashboard/subscription":
        return "My Plan"
      case "/dashboard/watchlist":
        return "Watchlist"
      case "/dashboard/settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-800 px-4 bg-[#1a1a1a]">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-700" />
        <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-[#0f0f0f] overflow-auto">{children}</div>
    </SidebarInset>
  )
}
