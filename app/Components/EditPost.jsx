"use client";
import React, { useEffect, useState } from "react";
import { useRouter, } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const getData = async (id) => {
  try {
    const response = await fetch(`/api/post/edit/${id}`);
    if (!response.ok) {
      console.error("Failed to retrieve data");
      return {};
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in fetching data", err);
    return {};
  }
};

const EditPost = (props) => {
  const [loading, setLoading] = useState(true);
  const [editBody, setEditBody] = useState("");
  const [editTag, setEditTag] = useState("");

  {/*Getting the Query Paramaters */}
  const queryParams = useSearchParams()
  const postId = queryParams.get("postId");

  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getData(postId);
        setEditBody(res.body);
        setEditTag(res.tag);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, [postId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/edit/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: editBody, tag: editTag }),
      });

      if (res.ok) {
        router.push("/profile?edited=true");
      } else {
        console.error("Failed to edit a post");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-start items-start mt-5">
          <h2>Loading ....</h2>
        </div>
      ) : (
        <form className="w-full  max-w-2xl  mt-6 mr-5" onSubmit={handleEdit}>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            ></label>
            Your AI prompt
            <textarea
              id="body"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-md h-32 "
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700 font-semibold"
            >
              Tag(#product,#AI,#prompts)
            </label>
            <input
              id="tag"
              type="text"
              value={editTag}
              onChange={(e) => setEditTag(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-md"
            />
          </div>

          <div className="flex flex-row gap-5  justify-end">
            <div>
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Edit Post
              </button>
            </div>

            <div>
              <button className=" bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPost;
