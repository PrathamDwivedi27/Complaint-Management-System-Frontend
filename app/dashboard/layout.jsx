"use client";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
