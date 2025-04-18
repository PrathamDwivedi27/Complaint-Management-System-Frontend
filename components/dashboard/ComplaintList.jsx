"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

// const complaints = [
//   {
//     id: 1,
//     title: "Street light not working",
//     description: "The street light near my house has been out for a week.",
//     status: "Pending",
//     date: "2023-10-01",
//   },
//   {
//     id: 2,
//     title: "Water leakage",
//     description: "There is a water leakage in front of my building.",
//     status: "In Progress",
//     date: "2023-09-28",
//   },
//   {
//     id: 3,
//     title: "Garbage not collected",
//     description: "Garbage hasn't been collected for 3 days in our lane.",
//     status: "Completed",
//     date: "2023-09-25",
//   },
// ];

export default function ComplaintList({complaints}) {

  const router = useRouter();
  console.log("complaints in complaint list component", complaints);
    

  return (
    <div className="grid grid-cols-1 gap-6">
      {complaints.map((complaint) => (
        <Card key={complaint._id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {complaint.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {complaint.description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Date:{" "}
                {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => router.push(`/dashboard/complaints/${complaint._id}`)}
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                complaint?.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : complaint?.status === "in-progress"
                  ? "bg-blue-100 text-blue-800" : 
                    complaint?.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : complaint?.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : complaint?.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {complaint?.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
