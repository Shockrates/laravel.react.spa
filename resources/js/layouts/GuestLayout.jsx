import React from 'react';
import { Link,Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function GuestLayout() {

  const { user } = useAuth();
  // (user) ? console.log(user) : console.log("No user");
  // if user is logged in, redirect to profile page
  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
    
      <Outlet />
      
    </>
  )
}
