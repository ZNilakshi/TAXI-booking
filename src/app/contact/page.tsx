"use client";
import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp, FaFacebook, FaYoutube, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import Image from "next/image"; // Use next/image for optimized images

import Navbar from '../../components/Navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Contact() {
  const [bgOpacity, setBgOpacity] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', phone: '', email: '', message: '' }); // Clear the form
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1] transition-opacity duration-500" style={{ backgroundImage: "url('/6.jpg')", filter: 'blur(2px)', opacity: bgOpacity }}></div>
      <Navbar />
      <div className="relative w-full py-20 text-center flex flex-col items-center">
        <h1 className="mt-40 text-6xl font-bold text-white">CONTACT US</h1>
        <div className="flex flex-col sm:flex-row gap-5 mt-10 mb-20 py-4 px-10 items-center sm:items-start">
  <button
    className="bg-custom-blue text-white py-4 px-10 text-lg hover:bg-white hover:text-black w-full sm:w-auto"
    onClick={() => window.location.href = '/booking'}
  >
    Book a Ride
  </button>
  <button
    className="bg-white text-black py-4 px-6 text-lg hover:bg-custom-blue hover:text-white w-full sm:w-auto"
    onClick={() => window.location.href = 'tel:+94719807100'}
  >
    +94742291771
  </button>
</div>
        <br></br>
        <div className="flex flex-wrap justify-center gap-10 mt-20 mb-20 w-4/5 mx-auto">
          <div className="flex-1 bg-white shadow-lg p-8 rounded-lg transition-transform hover:scale-105">
            <h2 className="text-3xl font-semibold mb-5 text-custom-blue">Get in Touch</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-3 border border-gray-300 rounded text-gray-800"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded text-gray-800"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded text-gray-800"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="p-3 border border-gray-300 rounded text-gray-800"
              />
              <button type="submit" className="bg-custom-blue text-white py-2 px-4 rounded hover:bg-blue-700">SEND NOW</button>
            </form>
          </div>
          <div className="flex-1 bg-white shadow-lg p-8 rounded-lg transition-transform hover:scale-105">
            <h2 className="text-3xl font-semibold mb-5 text-custom-blue">Talk to Us</h2>
            <div className="mb-4 flex items-center text-gray-800">
              <FaEnvelope className="mr-2" size={20} />
              <span className="font-semibold mr-2">Email:</span>
              <a href="mailto:nwcarservices@icloud.com" className="text-blue-500 hover:underline">ahasnabooking@gmail.com</a>
            </div>
            <div className="mb-4 flex items-center text-gray-800">
              <FaPhone className="mr-2" size={20} />
              <span className="font-semibold mr-2">Phone Number:</span>
              <a href="tel:+94719807100" className="text-blue-500 hover:underline">+94719807100</a>
            </div>
            <div className="mb-4 flex items-center text-gray-800">
              <FaMapMarkerAlt className="mr-2" size={20} />
              <span className="font-semibold mr-2">Headquarter:</span>
              <p className="text-blue-500">Reg No = W/1440, Ella.</p>
            </div>
            <div className="flex flex-col items-center justify-center text-gray-800">
              <h2 className="text-3xl font-semibold mb-5 text-custom-blue text-center">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/abcdtaxiservice" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  <FaFacebook size={30} />
                </a>
                <a href="https://www.youtube.com/abcdtaxiservice" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">
                  <FaYoutube size={30} />
                </a>
                <a href="https://www.instagram.com/abcdtaxiservice" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                  <FaInstagram size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-opacity-80 text-white flex flex-col items-center justify-center py-5 mt-10">
                    <Image src="/9798.png" alt="Footer Logo" width={68} height={68} className="h-12 mb-2" />
                    <div className="flex gap-5 mt-2">
                      <a href="https://wa.me/94719807100" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-3xl text-green-500" /></a>
                      <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer"><FaYoutube className="text-3xl text-red-500" /></a>
                      <a href="https://www.facebook.com/share/18aGuSSiPr/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-3xl text-blue-600" /></a>
                      <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-3xl text-pink-500" /></a>
                         </div>
                    <p className="text-sm text-black mt-2">&copy; 2024 DriveX. All rights reserved.</p>
                  </footer>
    </>
  );
}
