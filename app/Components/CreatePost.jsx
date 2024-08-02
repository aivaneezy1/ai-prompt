"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreatePost = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          postOwnerId: session?.user.id,
          body: body,
          tag: tag,
          postOwner: session?.user.name,
          email:session?.user.email,
          image: session?.user.image ? session?.user.image : "https://project-prompt-bucket.s3.eu-north-1.amazonaws.com/user.png",

       
        }),
      });
      if (res.ok) {
        router.push("/");
        setSubmitting(false);
      } else {
        console.error("Failed to create a post");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center mt-10 px-4 ">
      <div className="w-full max-w-2xl">
        <h2 className="head_text text-blue-500 text-center">Create Post</h2>
        <p className="text-gray-500 mt-2 text-center">
          Create your own ideas with the AI. Explore new ideas and share them
          with other people.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-6">
        <div className="mb-4">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700"
          >
            Your AI prompt
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-md h-32"
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
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-md"
          />
        </div>

        <div className="flex flex-row gap-5  justify-end">
          <div className="">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {submitting ? "Submitting..." : "Create Post"}
            </button>
          </div>
          <div className="">
            <Link href="/">
              <button className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
