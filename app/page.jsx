"use client"
import Image from "next/image";
import Search from "./Components/Search";
import Card from "./Components/Card";
import HandleCardData from "./Components/Card";
import { useState } from "react";

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div className="flex flex-col max-w-auto justify-center items-center lg:mt-10 gap-10 p-5">
      <div className="text-center">
        <h2 className="head_text font-bold">Discover & Share</h2>
        <br />
        <h2 className="text-4xl text-yellow-500 font-bold">
          AI-POWERED prompts
        </h2>
        <h2 className="text-2xl text-gray-500 mt-2">
          Learning the real power of AI for the modern world to discover
        </h2>
      </div>
      {/*Search bar */}
      <div className="w-full max-w-md">
          <Search setIsSearching={setIsSearching}/>
      </div>
      {/*User's Carcd */}
      <div className="w-full max-w-5xl">
        {isSearching ? <></> : <HandleCardData/>}
      </div>
    </div>
  );
}
