"use client";
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useSession, signOut } from 'next-auth/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../../components/Navbar';

export default function About() {
  const [bgOpacity, setBgOpacity] = useState(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newOpacity = Math.max(1 - scrollY / 300, 0);
    setBgOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1] transition-opacity duration-500" style={{ backgroundImage: "url('/1.jpg')", filter: 'blur(2px)', opacity: bgOpacity }}></div>
      <Navbar />
      <div className="relative w-full py-20 text-center text-white flex flex-col items-center">
        <h1 className="mt-40 text-7xl font-semibold">SERVICES</h1>
        <div className="flex gap-5 mt-10 mb-20">
          <button className="bg-custom-blue text-white py-4 px-8 text-lg hover:bg-white hover:text-blue-600" onClick={() => window.location.href = '/book'}>Book a Ride</button>
          <button className="bg-custom-blue text-white py-4 px-8 text-lg hover:bg-white hover:text-blue-600" onClick={() => window.location.href = 'tel:+1234567890'}>+94702610614</button>
        </div>
        <div className="w-4/5 mt-10 mx-auto"></div>
      </div>
      <footer className="w-full bg-black bg-opacity-80 text-white flex flex-col items-center justify-center py-5 mt-10">
        <img src="/9798.png" alt="Footer Logo" className="h-12 mb-2" />
        <p className="text-sm">&copy; 2024 ABCD Taxi Service. All rights reserved.</p>
      </footer>
    </>
  );
}
