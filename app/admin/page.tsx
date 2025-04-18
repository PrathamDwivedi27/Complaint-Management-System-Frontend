import { ComplaintsList } from "@/components/complaints-list"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen mt-5 ml-5">
      <DashboardHeader />
      <div className="flex-1 p-6 overflow-auto">
        
        <ComplaintsList />
      </div>
    </div>
  )
}
