import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        {/* <SidebarTrigger /> */}
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">A</div>
        </div>
      </div>
    </header>
  )
}
