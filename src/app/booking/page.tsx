// src/app/booking/page.tsx
"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MultiStepForm from '../../components/MultiStepForm';
import Navbar from '../../components/Navbar';
import AuthModal from '../../components/AuthModal'; // Import your AuthModal component

const Booking = () => {
  const { data: session, status } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setShowAuthModal(true);
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      {status === 'authenticated' ? (
        <MultiStepForm />
      ) : (
        showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default Booking;
