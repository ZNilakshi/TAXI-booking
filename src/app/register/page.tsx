"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="w-full min-h-screen flex items-center justify-center bg-yellow-200 "  style={{ backgroundImage: "url('https://cdn.create.vista.com/api/media/small/464163046/stock-photo-cheerful-happy-teen-asian-woman-enjoying-shopping-she-carrying-shopping')" }}>
        <div className="w-11/12 md:w-4/5 lg:w-3/6 xl:w-3/6  bg-white rounded shadow-lg overflow-hidden flex">
          <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.create.vista.com/api/media/small/464163046/stock-photo-cheerful-happy-teen-asian-woman-enjoying-shopping-she-carrying-shopping')" }}>
            {/* You can place the image path here */}
          </div>
          <div className=" text-2xl w-1/2 p-8 bg-yellow-100">
            <h1 className="text-4xl text-center font-semibold mb-8 text-yellow-700">Register</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-yellow-400"
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-yellow-400"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-300 text-white py-2 rounded hover:bg-yellow-600"
              >
                Register
              </button>
              <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
            </form>
            <div className="text-center text-gray-500 mt-4">- OR -</div>
            <Link
              className="block text-center text-yellow-600 hover:underline mt-2"
              href="/login"
            >
              Login with an existing account
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;
