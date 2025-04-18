"use client"
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/StatCards";
import ComplaintFilters from "@/components/dashboard/ComplaintFilters";
import ComplaintFormDialog from "@/components/dashboard/ComplaintFormDialog";
import ComplaintList from "@/components/dashboard/ComplaintList.jsx";
import { useState, useEffect } from "react";

export default function Dashboard() {

  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        console.log("Fetching complaints...");
        console.log("Status:", status);
        console.log("Category:", category);
        console.log("Location:", location);
        const queryParams = new URLSearchParams();
  
        if (status) queryParams.append("status", status);
        if (category) queryParams.append("category", category);
        if (location) queryParams.append("location", location);

        console.log("Query Params:", queryParams.toString());
  
        const queryString = queryParams.toString();
        const url = `http://localhost:5000/api/v1/filtered-complaints${queryString ? `?${queryString}` : ""}`;

        console.log("URL:", url);
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Response:", response);
  
        const data = await response.json();
        console.log(data.data);
        console.log("setting complaints with filterd data");
        setComplaints(data.data);
        console.log("the filetered complaints are", complaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
  
    fetchComplaints();
  }, [status, category, location]);
  
  useEffect(() => {},[complaints]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <Header />
          <StatsCards />
          <ComplaintFilters setCategory={setCategory} setStatus={setStatus} setLocation={setLocation}  />
          <ComplaintFormDialog />
          <ComplaintList complaints={complaints} />
        </div>
      </main>
    </div>
  );
}
