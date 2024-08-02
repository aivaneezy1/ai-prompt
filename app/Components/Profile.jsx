"use client"
import  React, { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AlertDelete from "../utils/AlertDelete";
import Link from "next/link";
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



const HandleProfileData = () =>{
   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [postDelete, setPostDelete] = useState(false);
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(session.user.id);
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetching data", err);
      }
    };

    if (session?.user.id){
      fetchData();
    }

    const timeout = setTimeout(() => {
      setTimeoutReached(true);
      
    }, 3000);

    return () => clearTimeout(timeout);
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

     
}

export const Profile = (props) => {
  return(
    <div className="flex md:flex-row flex-col items-center flex-wrap justify-center gap-5 mt-10">
 

    <div className="">
    {props.postDelete && <AlertDelete/>}
    </div>
    {props.loading ? (
        <div className="grid place-items-center w-full h-full  ">
          <p >Loading...</p>
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
                      <h2 className="font-bold">{post.postOwner}</h2>
                      <h2 className="text-gray-500">{post.email}</h2>
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
                  <p className="text-blue-600" onClick={() => ""}>
                    {post.tag}
                  </p>
                </div>
                <div className="flex justify-end items-center gap-5">
              
               {post.postOwnerId != props.session?.user.id ? <></> : (
                 <div>
                <button 
                className="border rounded-xl bg-red-500 px-5 py-2 text-white "
                onClick={() => props.handleDelete(post._id)}
                >Delete</button>
                </div>

               )}
                   {post.postOwnerId != props.session?.user.id ? <></> : (
                    <div>
                   <Link href={`/editpost?postId=${post._id}`}> <button className="border rounded-xl  px-5 py-2 text-white bg-blue-500">Edit</button></Link>
                  
                   </div>
                   )}
                </div>
              </div>
            ))}
      </>
    )}
    </div>


  )
};

export default  HandleProfileData
