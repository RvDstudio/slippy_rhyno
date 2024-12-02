// Path: src\app\page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function Example() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session) {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, [supabase.auth]);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="bg-[#111D36]  bg-[url('/images/1691055810.png')] bg-center bg-cover">
      <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="pt-60 mb-30 max-w-3xl mx-auto">
          <Image src="/images/Group.png" alt="Logo" width={900} height={600} />
        </div>

        <Link
          href="/dashboard"
          onClick={handleClick}
          className="mt-20 cursor-pointer w-full md:w-auto mb-14 inline-flex items-center justify-center py-2 px-6 text-base text-center text-white rounded-full bg-[#111d36] shadow-xs hover:bg-[#374C69]/90 transition-all duration-500"
        >
          Inloggen
          <svg
            className="ml-2"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div className="absolute bottom-0 inset-x-0 flex justify-center">
          <Image
            src="/images/front_bg.png"
            alt="Dashboard image"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
}
