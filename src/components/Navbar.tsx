"use client";
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import LogoutConfirmation from '../components/LogoutConfirmation';

export default function Navbar() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openLogoutConfirm = () => setIsLogoutConfirmOpen(true);
  const closeLogoutConfirm = () => setIsLogoutConfirmOpen(false);
  const handleLogout = () => {
    signOut();
    closeLogoutConfirm();
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center py-3 bg-black bg-opacity-50 fixed top-0 z-10">
        <img src="/9798.png" alt="Logo" className="h-10 cursor-pointer ml-2" onClick={() => window.location.href = '/'} />
        <div className="flex mr-1">
          <a href="/" className="text-white mx-6 my-1 cursor-pointer hover:underline">Home</a>
          <a href="/about" className="text-white mx-6 my-1 cursor-pointer hover:underline">About</a>
          <a href="/services" className="text-white mx-6 my-1 cursor-pointer hover:underline">Services</a>
          <a href="/booking" className="text-white mx-6 my-1 cursor-pointer hover:underline">Booking</a>
          <a href="/contact" className="text-white mx-6 my-1 cursor-pointer hover:underline">Contact</a>
          {session ? (
            <span className="text-white mx-6 my-1 cursor-pointer hover:underline" onClick={openLogoutConfirm}>{session.user.email}</span>
          ) : (
            <button className="text-white mx-6 my-1 cursor-pointer hover:underline" onClick={openModal}>Login</button>
          )}
        </div>
      </nav>
      {isModalOpen && <AuthModal closeModal={closeModal} />}
      {isLogoutConfirmOpen && (
        <LogoutConfirmation
          onConfirm={handleLogout}
          onCancel={closeLogoutConfirm}
        />
      )}
    </>
  );
}
