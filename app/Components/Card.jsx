"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Search from "./Search";
import { handleCopy } from "../utils/HandleCopy";
import Link from "next/link";
const getData = async () => {
  try {
    const response = await fetch("/api/post");
    if (!response.ok) {
      console.error("Failed to retrieve data");
      return [];
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};





const HandleCardData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [copied, setCopied] = useState("");
  const {data:session} = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Handle loading state even if error occurs
      }
    };

    fetchData();

    const timeout = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <Card
      data={data}
      loading={loading}
      timeoutReached={timeoutReached}
      copied={copied}
      setCopied={setCopied}
      handleCopy={handleCopy}
      session={session}
    />
  );
};



const Card = (props) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full place-items-center">
      {props.loading ? (
        <div className="grid place-items-center w-full h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {props.timeoutReached && props.data.length === 0 && (
            <div className="grid place-items-center w-full h-full">
              <p className="text-center text-gray-500">No data found</p>
            </div>
          )}

          {props.data.length > 0 &&
            props.data.map((post) => (
              <div
                className="flex flex-col p-6 bg-white rounded-lg shadow-lg max-w-sm w-full"
                key={post._id}
              >
                <div className="flex md:flex-row items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={post.image}
                        objectFit="cover"
                        className="rounded-xl"
                        alt="Image Alt Text"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="items-center">
                   
                      <Link  href={ post.postOwnerId === props.session?.user.id ? `/profile` : `/profile/${post.postOwner}?user=${post.postOwner}&id=${post.postOwnerId}`}><h2 className="font-semibold">{post.postOwner}</h2></Link>

                      <Link  href={ post.postOwnerId === props.session?.user.id ? `/profile` : `/profile/${post.postOwner}?user=${post.postOwner}&id=${post.postOwnerId}`}><h2 className="text-gray-500">{post.email}</h2></Link>
                    </div>
                  </div>

                  <div className="">
                    {props.copied !== post.body ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                        onClick={() => props.handleCopy(post.body, props.setCopied)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>
                    ) : (
                      <Image
                        src="https://project-prompt-bucket.s3.eu-north-1.amazonaws.com/checkmark.png"
                        alt="check-mark"
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col mt-2 text-left">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {post.body}
                  </h2>
                  <p className="text-blue-600">
                    {post.tag}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};


export default HandleCardData
