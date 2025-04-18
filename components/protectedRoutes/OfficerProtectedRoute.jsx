"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const OfficerProtectedRoute = ({ children }) => {

  const [isAuthorized, setIsAuthorized] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const verifyOfficer = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // alert('Not authorized');
        toast.error('Not authorized');
        router.push('/');   
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/v1/get-officer-by-token', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log("response", response);

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        console.log("data", data);

        if (data?.badgeId) {
            // toast.success('Authorized');
          setIsAuthorized(true);
        } else {
        //   alert('Not authorized');
            toast.error('Not authorized');
          router.push('/');
        }
      } catch (error) {
        console.error('Error verifying admin:', error);
        // alert('Not authorized');
        toast.error('Not authorized');
         // router.push('/');
        router.push('/');
      }
    };

    verifyOfficer();
  }, [router]);

  if (isAuthorized === null) {
    return null; 
  }

  return <>{children}</>;
};

export default OfficerProtectedRoute;
