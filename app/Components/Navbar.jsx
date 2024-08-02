"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Mobile from "./MobileNavbar";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex gap-5 justify-end mt-5">
      <div className="mr-auto">
        <Link className="flex flex-row gap-2 cursor-pointer" href="/">
          <Image
            className="ml-5"
            src="https://project-prompt-bucket.s3.eu-north-1.amazonaws.com/ai.png"
            alt="logo"
            width={50}
            height={50}
          />
          <h2 className="text-3xl font-semibold hidden sm:block">
            AI-generator
          </h2>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden items-center gap-5">
        {session && status == "authenticated" ? (
          <>
          <Link href="/createpost">
          <button className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary">
            Create Post
          </button>
          </Link>

           <Link href="/profile">
          <button className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary">
            My Profile
          </button>
          </Link>
          </>
        

        ) : (
          <Link href="/register">
            <button className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary">
              Register for free
            </button>
          </Link>
        )}
      </div>

      <div className="sm:flex hidden items-center mr-10">
        {session  && status == "authenticated" ? (
          <Link href="/api/auth/signout?callbackUrl=/">
            <button className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary">
              Sign Out
            </button>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <button className="border rounded-xl bg-gray-500 px-5 py-2 text-white bg-primary">
              Sign in
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <Mobile />
    </div>
  );
};

export default Navbar;
