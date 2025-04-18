import { OfficerHeader } from "@/components/officer-header"
import { AssignedComplaints } from "@/components/assigned-complaints"

export default function OfficerDashboardPage() {
  return (
    <div className="flex flex-col h-screen mt-3 ml-5">
      <OfficerHeader />
      <div className="flex-1 p-6 overflow-auto">
        <AssignedComplaints />
      </div>
    </div>
  )
}
