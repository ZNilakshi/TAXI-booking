import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Sample Google Icon SVG inline code (replace with your actual Google icon SVG)
const GoogleIcon = (
  <svg
    className="w-6 h-6 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17a4 4 0 11-6 0"
    />
  </svg>
);

const AuthModal = ({ closeModal }) => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        setError("");
        closeModal();
        router.push('/'); // Redirect to home or another page after login
      }
    } else {
      // Register user
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setError("");
        const signInRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (!signInRes?.error) {
          closeModal();
          router.push('/'); // Redirect to home or another page after registration and login
        } else {
          setError("Error logging in after registration");
        }
      } else {
        setError(data.message || "An error occurred during registration");
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-3/5 lg:w-3/5 flex flex-col">
          <div className={`bg-gray-100 py-4 px-8 flex justify-between items-center ${isLogin ? 'border-b border-gray-200' : 'border-b border-gray-700'}`}>
            <div className="flex justify-center w-1/2">
              <button
                className={`text-xl font-semibold mr-4 ${isLogin ? 'text-custom-blue' : 'text-gray-500'} ${isLogin ? 'bg-black text-white' : 'bg-white text-black'} rounded-lg py-2 px-6 hover:bg-gray-200`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>
            <div className="flex justify-center w-1/2">
              <button
                className={`text-xl font-semibold ${!isLogin ? 'text-custom-blue' : 'text-gray-500'} ${!isLogin ? 'bg-black text-white' : 'bg-white text-black'} rounded-lg py-2 px-6 hover:bg-gray-200`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>
            <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex">
            <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1417064302/photo/young-and-cheerful-woman-enjoying-new-car-hugging-steering-wheel-sitting-inside-woman-driving.jpg?s=612x612&w=0&k=20&c=BQH94FpJ61KczxoxQ_y41oLs_Vs4MWmVR8MVy83Do68=')" }}></div>
            <div className="w-full md:w-1/2 p-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className={`text-3xl font-semibold ${isLogin ? 'text-custom-blue' : 'text-white'}`}>{isLogin ? 'Login' : 'Register'}</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-blue"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-blue"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full ${isLogin ? 'bg-custom-blue text-white' : 'bg-white text-black'} py-2 rounded-lg hover:bg-custom-blue-dark transition duration-300`}
                >
                  {isLogin ? 'Sign In' : 'Register'}
                </button>
                {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
              </form>
              {isLogin && (
                <button
                  className="w-full flex items-center justify-center bg-red-600 text-white py-2 rounded-lg mt-4 hover:bg-red-700 transition duration-300"
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  {GoogleIcon} {/* Render the Google icon */}
                  Connect with Google
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AuthModal;
