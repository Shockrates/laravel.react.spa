import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
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
    <div className="container">
        <div className="row my-5">
            <div className="text-3xl font-bold underline">
                <h1> Add React js to laravel 10 with vite</h1>
            </div>
        </div>
    </div>
      <Outlet />
    </>
  )
}
