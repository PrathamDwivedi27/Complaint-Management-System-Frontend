"use client"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState, useEffect } from "react";

export function OfficerHeader() {

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchUserData = async () => {
        
        const token = localStorage.getItem('token');
        console.log("Token:", token);
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }
  
        try {
          const res = await fetch('http://localhost:5000/api/v1/get-officer-by-token', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const data = await res.json();
          console.log("Fetched user data:", data.user);
  
          if (data.success) {
            setUserData(data.user);
            console.log("User data:", data.user);
            
          } else {
            setError('Failed to fetch user data');
          }
          // console.log("User data state is:", userData);
        } catch (err) {
          setError('An error occurred while fetching user data');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, []);

    useEffect(() => {
      if (userData) {
        console.log("Updated userData state is:", userData); // ✅ This will log when state is updated
      }
    }, [userData]);
    


    return (
      <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">Officer Dashboard</h1>
        </div>
        <div className="ml-170 flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          {userData && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
                {userData.name?.[0]}
              </div>
              <div className="hidden md:block">
                <div className="font-medium">{userData.name}</div>
                <div className="text-xs text-muted-foreground">{userData.category}</div>
              </div>
            </div>
          )}
        </div>
      </header>
    );
    
}
