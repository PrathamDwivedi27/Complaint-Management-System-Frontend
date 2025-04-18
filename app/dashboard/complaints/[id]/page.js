"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const params = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      if (params?.id) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/v1/complaint/${params.id}`
          );
          if (!response.ok) throw new Error("Failed to fetch complaint");
          const data = await response.json();
          setComplaint(data.data);
        } catch (error) {
          console.error("Error fetching complaint:", error);
        }
      }
    };

    fetchComplaint();
  }, [params]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar always on side */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-5xl mx-auto w-full">
          <Header />
          {complaint ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mt-6 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {complaint.title}
                </h1>
                <p className="text-sm text-gray-500">
                  Filed on {formatDate(complaint.createdAt)}
                </p>
              </div>

              {complaint.image && (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={complaint.image}
                    alt="Complaint Visual"
                    className="w-full h-auto object-cover max-h-[400px]"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h2 className="font-medium text-gray-700">Description</h2>
                  <p className="text-gray-600">{complaint.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h2 className="font-medium text-gray-700">Location</h2>
                    <p className="text-gray-600">{complaint.location}</p>
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-700">Category</h2>
                    <p className="text-gray-600">{complaint.category}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <h2 className="font-medium text-gray-700">Status:</h2>
                    <span
                      className={`inline-block px-3 py-2 rounded-md text-sm font-medium ${
                        complaint?.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : complaint?.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : complaint?.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : complaint?.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : complaint?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>

                {complaint.rejectionReason && (
                  <div>
                    <h2 className="font-medium text-red-700">
                      Rejection Reason
                    </h2>
                    <p className="text-gray-600">{complaint.rejectionReason}</p>
                  </div>
                )}

                {complaint.remarks.length > 0 && (
                  <div className="mb-4  p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Remarks:</h4>
                    <ul className="list-disc pl-6 text-gray-900 space-y-1 ">
                      {complaint.remarks.map((remark, index) => (
                        <li
                          key={index}
                          className="text-gray-700 py-1 rounded-md pl-2"
                        >
                          {remark}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              Loading complaint details...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
