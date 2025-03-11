import Image from "next/image";
import { FaWhatsapp, FaYoutube, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-white flex flex-col items-center justify-center py-3 ">
      {/* Logo */}
      <Image src="/9798.png" alt="DriveX Logo" width={68} height={68} className="h-12 mb-2" />
      
      {/* Social Media Links */}
      <div className="flex gap-6 mt-1">
        <a href="https://wa.me/+94742291771" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <FaWhatsapp className="text-3xl text-green-500 hover:opacity-80 transition" />
        </a>
        <a href="https://www.youtube.com/channel/UCt47i7cG8xZRRcAIX6sTQ_Q" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube className="text-3xl text-red-500 hover:opacity-80 transition" />
        </a>
        <a href="https://www.facebook.com/share/18aGuSSiPr/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebook className="text-3xl text-blue-600 hover:opacity-80 transition" />
        </a>
        <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram className="text-3xl text-pink-500 hover:opacity-80 transition" />
        </a>
        <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <FaTiktok className="text-3xl text-black hover:opacity-80 transition" />
        </a>
      </div>
      
      {/* Copyright */}
      <p className="text-sm text-gray-400 mt-3">&copy; {new Date().getFullYear()} DriveX. All rights reserved.</p>
    </footer>
  );
}
