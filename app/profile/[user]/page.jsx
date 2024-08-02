"use client"
import React, { Suspense } from 'react';
import UserProfile from "@/app/Components/UserProfile";
import { useSearchParams } from "next/navigation";

const Userpage =  () => {
    const queryParams = useSearchParams();
    const user = queryParams.get("user")
  return (
    <div className="mt-10 ml-5">
      <h2 className="head_text text-left text-secondary">{user} Profile</h2>
      <h2 className="text-gray-500 text-left mt-5">View your own post.</h2>
    <Suspense fallback={<div>Loading...</div>}>
    <UserProfile/>
    </Suspense>
    </div>
  );
};

export default Userpage;
