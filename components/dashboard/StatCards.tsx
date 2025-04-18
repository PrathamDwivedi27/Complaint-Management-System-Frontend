import { Card } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-semibold text-gray-900">3</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <p className="text-2xl font-semibold text-gray-900">2</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-semibold text-gray-900">5</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
