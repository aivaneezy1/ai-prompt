"use client";
import React, { useState, useEffect } from "react";
import Profile from "../Components/Profile";
import AlertEdit from "../utils/AlertEdit";
import { useRouter, useSearchParams } from "next/navigation";
import HandleProfileData from "../Components/Profile";

const Profilepage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const queryParams = useSearchParams();
  useEffect(() => {
    
    const edited = queryParams.get("edited");

    if (edited) {
      setShowAlert(true);
      // Optionally, remove the query parameter after displaying the alert
      router.replace("/profile", undefined, { shallow: true });
    }

      const timeout = setTimeout(() => {
      setShowAlert(false);  
      
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="mt-10 ml-5">
      {showAlert && <AlertEdit />}
      <h2 className="head_text text-left text-secondary">My Profile</h2>
      <h2 className="text-gray-500 text-left mt-5">View your own post.</h2>
      <HandleProfileData/>
    </div>
  );
};

export default Profilepage;
