// src/app/about/page.tsx
"use client"; 
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal"; // Import the Modal component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Image from 'next/image';

export default function About() {
  const { data: session } = useSession();
  const [bgOpacity, setBgOpacity] = useState(1);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState("");
  const [country, setCountry] = useState("");
  const [expandedReviewIndex, setExpandedReviewIndex] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [selectedReview, setSelectedReview] = useState<any>(null); // State for selected review

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newOpacity = Math.max(1 - scrollY / 300, 0);
    setBgOpacity(newOpacity);
  };

  const handleAddReview = async () => {
    if (session && session.user && newReview.trim() !== "" && country.trim() !== "") {
      const review = {
        user: {
          email: session.user.email,
          name: session.user.name,
          photo: session.user.image,
        },
        text: newReview,
        country,
      };

      try {
        const response = await axios.post("/api/reviews", review);
        setReviews([response.data, ...reviews]);
        setNewReview("");
        setCountry("");
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleExpandReview = (index: number) => {
    setExpandedReviewIndex(expandedReviewIndex === index ? null : index);
  };

  const handleLoadMore = () => {
    setVisibleReviews(visibleReviews + 10);
  };

  const topReviews = reviews.slice(0, visibleReviews);

  const openModal = (review: any) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1] transition-opacity duration-500"
        style={{
          backgroundImage: "url('/6.jpg')",
          filter: "blur(2px)",
          opacity: bgOpacity,
        }}
      ></div>
      <Navbar />
      <div className="relative w-full py-20 text-center text-white flex flex-col items-center">
        <h1 className="mt-40 text-7xl font-semibold text-white">WHO WE ARE</h1>
        <div className="flex gap-5 mt-10 mb-20 py-4 px-10">
          <button
            className="bg-custom-blue text-white py-4 px-10 text-lg hover:bg-white hover:text-blue-600"
            onClick={() => (window.location.href = "/booking")}
          >
            Book a Ride
          </button>
          <button
            className="bg-white text-black py-4 px-6 text-lg hover:bg-custom-blue hover:text-white"
            onClick={() => (window.location.href = "tel:+94702610614")}
          >
            +94702610614
          </button>
        </div>
        <div className="w-4/5 mt-12 p-10 mx-auto"></div>
        <div className="flex gap-12 mt-11 p-20">
          <div className="flex items-center">
            <Image
              src="/ap.jpg"
              alt="Image 1"
              width={500}
              height={300}
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center max-w-xs font-light text-3xl">
            <p className="text-black text-4xl mb-5 font-light">ABOUT US</p>
            <p className="mt-2 text-base font-light text-black">
              Since 2020 AHANSA Car Services has been the Economy to luxury car
              services company in Colombo, Sri Lanka. We are serving Colombo
              area. Our luxury executive cars Suv’s Van service provides
              courteous and prompt transportation throughout Colombo, Negombo,
              Kirbathgoda, Bandaraama, Gampaha, and many more cities in Sri
              Lanka.
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full mt-10 flex flex-col items-center justify-center text-center p-10 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-5">Reviews</h2>
        {session ? (
          <div className="w-full max-w-2xl bg-white p-6 border border-gray-300 rounded shadow-lg mb-6">
            <textarea
              className="w-full p-3 mb-3 border border-gray-300 rounded"
              rows={3}
              placeholder="Add a review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <input
              className="w-full p-3 mb-3 border border-gray-300 rounded"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button
              className="bg-custom-blue text-white py-2 px-4 rounded hover:bg-white hover:text-blue-600"
              onClick={handleAddReview}
            >
              Submit Review
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Please log in to submit a review.</p>
        )}
        <div className="max-w-5xl mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {topReviews.length > 0 ? (
            topReviews.map((review, index) => (
              <div
                key={index}
                className="bg-blue-100 shadow-lg rounded-lg flex flex-col items-center relative overflow-hidden"
              >
                <div className="bg-custom-green rounded-t-lg w-full py-4 flex flex-col items-center">
                  <Image
                    src={review.user.photo || '/default-user.jpg'}
                    alt={review.user.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full bg-white p-1"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-700 italic mb-4">
                    &quot;
                    {review.text.length > 100
                      ? review.text.substring(0, 100) + "&quot;..."
                      : review.text}
                    &quot;
                  </p>
                  {review.text.length > 100 && (
                    <button
                      className="text-blue-500 mt-2"
                      onClick={() => openModal(review)}
                    >
                      Read More
                    </button>
                  )}
                </div>
                <div className="w-full bg-custom-green rounded-b-lg py-2 text-black text-sm flex flex-col items-center">
                  <p className="font-bold">{review.user.name}</p>
                  <p>{review.country}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        {visibleReviews < reviews.length && (
          <button
            className="bg-custom-blue text-white mt-5 py-2 px-6 rounded hover:bg-white hover:text-blue-600"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>

      {/* Modal for review */}
      {modalOpen && selectedReview && (
        <Modal 
          isOpen={modalOpen} 
          onClose={closeModal} 
          review={selectedReview} 
        />
      )}
    </>
  );
}
