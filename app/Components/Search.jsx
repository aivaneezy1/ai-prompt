"use client"
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import Card from "./Card"; // Make sure to import the Card component
import Image from "next/image";
import { handleCopy } from "../utils/HandleCopy";
import Link from "next/link";

const Search = ({setIsSearching}) => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [query] = useDebounce(text, 1000);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [copied, setCopied] = useState("");


  useEffect(() => {
    if (!query) {
      setTimeoutReached(false); // removing the "not found " when query is empty
      setIsSearching(false); // No query, so not searching
      setResults([]);
      router.push(`/`);
      return; // Exit early if query is empty
    }

    const fetchResults = async () => {
      try {
        // Encode the query to handle special characters like #
        const encodedQuery = encodeURIComponent(query);
        const res = await fetch(`/api/search/?search=${encodedQuery}`);
        const data = await res.json();
        setResults(data);
        setIsSearching(true); // Query exists, so searching
        setLoading(false);
      } catch (err) {
        console.error("Error fetching results:", err);
        setLoading(false);
      }
    };

    fetchResults();

    
    const timeout = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timeout);


  }, [query]);


  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/?search=${query}`);
  };



  return (
    <>
    <div className="flex justify-center w-full">
     <div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="w-80 px-4 py-2 border rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search for a tag or a username"
          value={text}
          onChange={(ev) => setText(ev.target.value)}
        />
        <button type="submit" className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
            
          </svg>
        </button>
      </form>
     </div>
     
    </div>
    
      {/* Render your results here */}
      <div className="flex flex-row flex-wrap  gap-4 mt-10">
        {loading ? (
           <></>
        ): (
          <>
          {timeoutReached && results.length === 0 && (
            <div className="grid place-items-center w-full h-full">
              <p className="text-center text-gray-500">No data found</p>
            </div>
          )}
          
           {results.length > 0 &&
            results.map((post) => (
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
                      <Link href={`/profile/${post.postOwner}`}><h2 className="font-bold">{post.postOwner}</h2></Link>
                      <Link  href={`/profile/${post.postOwner}`}><h2 className="text-gray-500">{post.email}</h2></Link>
                    </div>
                  </div>

                  <div className="">
                    { copied !== post.body ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                        onClick={() =>handleCopy(post.body, setCopied)}
                      
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>
                    ) : (
                      <Image
                        src="/checkmark.png"
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
              </div>
            ))}
          </>
        )}
         

         
          
      </div>
      </>
  );
};

export default Search;
