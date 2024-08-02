"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Profile } from "./Profile";
import { handleCopy } from "../utils/HandleCopy";

const getData = async (id) => {
  try {
    const response = await fetch(`/api/post/profile/${id}`);
    if (!response.ok) {
      console.error("Failed to retrieved data");
      return [];
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in fetching data", err);
    return [];
  }
};

const UserProfile = () => {
   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [postDelete, setPostDelete] = useState(false);
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const queryParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      const id = queryParams.get("id");
      try {
        const result = await getData(id);
        setData(result);
        console.log("res", result)
        setLoading(false);
      } catch (err) {
        console.error("Error in fetching data", err);
      }
    };

    fetchData();
  }, [session?.user.id]);
  
  {/*POST DELETION */}
  useEffect(() => {
    if (postDelete) {
      const alertTimeout = setTimeout(() => {
        setPostDelete(false);
      }, 2000);

      return () => clearTimeout(alertTimeout);
    }
  }, [postDelete]);


 const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/post/delete/${id}`, { method: "DELETE" });
      if (response.ok) {
        setData(data.filter(post => post._id !== id));
        setPostDelete(true);
      } else {
        console.error("Failed to delete the post");
      }
    } catch (err) {
      console.error("Error deleting post", err);
    } 
  };
   return (
    <Profile
      data={data}
      loading={loading}
      timeoutReached={timeoutReached}
      copied={copied}
      setCopied={setCopied}
      handleCopy={handleCopy}
      handleDelete={handleDelete}
      postDelete={postDelete}
      session={session}
    />
  );
};

export default UserProfile;
