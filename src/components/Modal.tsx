import React from 'react';
import Image from 'next/image';

interface User {
  name: string;
  email: string;
  photo: string;
}

interface Review {
  user: User;
  text: string;
  country: string;
  createdAt: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, review }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center mb-4">
          <Image 
            src={review.user.photo} 
            alt={review.user.name} 
            width={48} 
            height={48} 
            className="rounded-full mr-4"
          />
          <div>
            <p className="font-semibold">{review.user.name} <span className="text-sm text-gray-500">({review.user.email})</span></p>
            <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-base">{review.text}</p>
        <p className="text-sm text-gray-500 mt-2">{review.country}</p>
      </div>
    </div>
  );
};

export default Modal;
