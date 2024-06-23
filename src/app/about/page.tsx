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
        <h1 className="mt-40 text-7xl font-semibold text-white">WHO WE ARE</h1>
        <div className="flex gap-5 mt-10 mb-10">
          <button className=" bg-custom-blue text-white py-4 px-8 text-lg hover:bg-white hover:text-blue-600" onClick={() => window.location.href = '/book'}>Book a Ride</button>
          <button className="bg-custom-blue text-white py-4 px-8 text-lg hover:bg-white hover:text-blue-600" onClick={() => window.location.href = 'tel:+1234567890'}>+94702610614</button>
        </div>
        <div className="w-4/5 mt-12 p-10 mx-auto"></div>
        <div className="flex gap-12 mt-11 p-20 ">
          <div className="flex items-center">
            <img src="/ap.jpg" alt="Image 1" className="w-full rounded-lg" style={{ maxWidth: '500px' }} />
          </div>
          <div className="flex flex-col justify-center max-w-xs font-light text-3xl">
            <p className="text-lg text-black text-4xl font-light">ABOUT US</p>
            <p className="mt-2 text-base font-light text-black">
              Since 2020 NW Car Services has been the Economy to luxury car services company in Seattle, Washington.We are serving Seattle metropolitan area.
              Our luxury executive cars Suv’s Van service provides courteous and prompt transportation throughout Seattle, Shoreline, Edmonds, Seatac, Tacoma, Bellevue, Kirkland, Sammamish, Issaquah, Redmond, Shoreline, Bothell, Everett, Lynnwood, Kent, Auburn, Puyallup, Olympia, and many more cities in WA.
            </p>
          </div>
        </div>
        <div className="relative w-full h-96 mt-10 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/download.jfif')" }}>
          <p className="text-2xl font-light">Experience the difference with our premium service.</p>
          <button className="mt-5 bg-custom-blue text-white py-4 px-8 text-lg hover:bg-white hover:text-blue-600" onClick={() => window.location.href = '/contact'}>CONTACT US</button>
        </div>
      </div>
      <footer className="w-full bg-black bg-opacity-80 text-white flex flex-col items-center justify-center py-5 mt-10">
        <img src="/9798.png" alt="Footer Logo" className="h-12 mb-2" />
        <p className="text-sm">&copy; 2024 ABCD Taxi Service. All rights reserved.</p>
      </footer>
    </>
  );
}
