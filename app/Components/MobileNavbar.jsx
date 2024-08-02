"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Mobile = () => {
   const [menuOpen, setMenuOpen] = useState(false);
  const {data: session, status} = useSession();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="lg:hidden sm:hidden mr-5 flex items-center">
      <button onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-20 right-0  bg-white shadow-md flex flex-col items-end p-5 sm:hidden">
          {session  && status == "authenticated" ? (
            <>

               <Link href="/profile" >
                <button onClick={toggleMenu}className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary mb-2">
                  My Profile
                </button >
              </Link>

              <Link href="/createpost">
                <button onClick={toggleMenu} className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary mb-2">
                  Create Post
                </button>
              </Link>

              <Link href="/api/auth/signout?callbackUrl=/">
                <button onClick={toggleMenu} className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary">
                  Sign Out
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register">
                <button onClick={toggleMenu} className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary mb-2">
                  Register for free
                </button>
              </Link>
              <Link href="/api/auth/signin">
                <button onClick={toggleMenu} className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary">
                  Sign in
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Mobile;
