"use client";
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import LogoutConfirmation from '../components/LogoutConfirmation';
import Image from 'next/image';
import { Menu } from 'lucide-react';

interface User {
  id: string;
  role?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function Navbar() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openLogoutConfirm = () => setIsLogoutConfirmOpen(true);
  const closeLogoutConfirm = () => setIsLogoutConfirmOpen(false);
  const handleLogout = () => {
    signOut();
    closeLogoutConfirm();
  };

  const getProfileLink = () => {
    if (session?.user?.role === 'admin') {
      return '/profile/admin';
    }
    return '/profile/user';
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center py-2 bg-black bg-opacity-50 fixed top-0 z-10 px-4">
        <Image 
          src="/9798.png" 
          alt="Logo" 
          className="h-12 cursor-pointer" 
          width={48} 
          height={48} 
          onClick={() => window.location.href = '/'} 
        />

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu size={32} color="white" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-white cursor-pointer hover:underline">Home</a>
                <a href="/booking" className="text-white cursor-pointer hover:underline">Booking</a>
          <a href="/contact" className="text-white cursor-pointer hover:underline">Contact</a>
          <a href="/services" className="text-white cursor-pointer hover:underline">Services</a>

          {session?.user ? (
            <div className="relative">
              <Image
                src={session.user.image || '/default-profile.jpg'}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <a href={getProfileLink()} className="block px-4 py-2 text-black hover:bg-gray-200">Profile</a>
                  <span className="block px-4 py-2 text-black cursor-pointer hover:bg-gray-200" onClick={openLogoutConfirm}>Logout</span>
                </div>
              )}
            </div>
          ) : (
            <button className="text-white cursor-pointer hover:underline" onClick={openModal}>Login</button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
{isMobileMenuOpen && (
  <div 
    className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center space-y-4 py-4 z-20" 
    onClick={() => setIsMobileMenuOpen(false)} // Closes menu when clicking outside
  >
    <a href="/" className="text-white cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
       <a href="/booking" className="text-white cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Booking</a>
    <a href="/contact" className="text-white cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
    <a href="/services" className="text-white cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
    
    {session?.user ? (
      <>
        <a href={getProfileLink()} className="text-white cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Profile</a>
        <span className="text-white cursor-pointer hover:underline" onClick={() => { openLogoutConfirm(); setIsMobileMenuOpen(false); }}>Logout</span>
      </>
    ) : (
      <button className="text-white cursor-pointer hover:underline" onClick={() => { openModal(); setIsMobileMenuOpen(false); }}>Login</button>
    )}
  </div>
)}


      {/* Modals */}
      {isModalOpen && <AuthModal closeModal={closeModal} />}
      {isLogoutConfirmOpen && <LogoutConfirmation onConfirm={handleLogout} onCancel={closeLogoutConfirm} />}
    </>
  );
}
