
"use client"; 
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal"; // Import the Modal component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Image from 'next/image';
import { FaWhatsapp, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiImou } from "react-icons/si";


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
          email: session.user.email || "Unknown Email",
          name: (session.user as any).name || "Anonymous", // Using 'as any' to bypass type error
          photo: (session.user as any).image || "/default-user.jpg", // Fallback for missing image
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
            onClick={() => (window.location.href = "tel:+94719807100")}
          >
            +94742291771
          </button>
        </div>
        <div className="w-4/5 mt-12 p-10 mx-auto"></div>
        <div className="flex flex-col md:flex-row gap-12 mt-11 p-5 md:p-20 items-center">
  {/* Image Section */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src="/ap.jpg"
      alt="Image 1"
      width={500}
      height={300}
      className="w-full rounded-lg"
    />
  </div>

  {/* About Us Text Section */}
  <div className="w-full md:w-1/2 text-center md:text-left">
    <p className="text-black text-4xl mb-5 font-light">ABOUT US</p>
    <p className="mt-2 text-base font-light text-black">
      Since <strong>2020</strong>, Drivex has been a trusted provider of
      <strong> economy-to-luxury </strong> car transportation services in <strong>Ella, Sri Lanka</strong>.
      Whether you&apos;re a tourist exploring the scenic beauty of Ella or a local resident in need of reliable transport,
      we offer a seamless travel experience tailored to your needs.
    </p>
    
    <p className="mt-4 text-base font-light text-black">
      We specialize in <strong>luxury executive cars, KDH vans, and Toyota Prius vehicles</strong>, ensuring that every ride is comfortable, safe, and efficient.
      Our services cater to a wide range of customers, including:
    </p>

    <div className="mt-2 pl-5 text-base font-light text-black">
  <p>✅ <strong>Tourists</strong> looking for hassle-free travel between key destinations.</p>
  <p>✅ <strong>Business professionals</strong> requiring executive transport.</p>
  <p>✅ <strong>Families and groups</strong> needing spacious and comfortable vans.</p>
</div>

    <p className="mt-4 text-base font-light text-black">
      <strong>Coverage Area:</strong> While we are <strong>based in Ella</strong>, our services extend to <strong>Badulla, Bandarawela, and many other cities</strong> across Sri Lanka.
      Whether you need airport pickups, city-to-city transfers, or personalized chauffeur services, Drivex ensures a smooth and reliable ride.
    </p>

    <p className="mt-4 text-base font-light text-black">
      <strong>Booking & Pricing:</strong> We offer <strong>affordable rates</strong> with flexible booking options.
      You can <strong>call us</strong> at <a href="tel:+94742291771" className="text-blue-500 hover:underline">+94742291771</a> or book a ride online.
      Our team is available <strong>24/7</strong> to assist with your transportation needs.
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
        <div className="max-w-6xl mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          {topReviews.length > 0 ? (
            topReviews.map((review, index) => (
              <div
                key={index}
                className="bg-blue-100 shadow-lg rounded-lg flex flex-col items-center relative overflow-hidden  w-full md:w-[250px] lg:w-[350px] min-h-[250px] p-6"
              >
                <div className="bg-custom-green rounded-t-lg w-full py-4 flex flex-col items-center">
                  <Image
                    src={review.user.photo || '/default-user.jpg'}
                    alt={review.user.name}
                    width={58}
                    height={58}
                    className="h-16 w-16 rounded-full bg-white p-1"
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

      <footer className="w-full bg-opacity-80 text-white flex flex-col items-center justify-center py-5 mt-10">
              <Image src="/9798.png" alt="Footer Logo" width={78} height={78} className="h-12 mb-2" />
              <div className="flex gap-5 mt-2">
                <a href="https://wa.me/94719807100" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-3xl text-green-500" /></a>
                <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer"><FaYoutube className="text-3xl text-red-500" /></a>
                <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-3xl text-blue-600" /></a>
                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-3xl text-pink-500" /></a>
                   </div>
              <p className="text-sm text-black mt-2">&copy; 2024 Drivex. All rights reserved.</p>
            </footer>

    </>
  );

}
