
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
import Slider from "react-slick"; // Import react-slick

interface ArrowProps {
  onClick?: () => void;
}
const NextArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 flex justify-center items-center  bg-opacity-50 rounded-l-full cursor-pointer z-10"
    >
      <Image src="/fast-forward.png" alt="Next Arrow" width={20} height={20} />
    </div>
  );
};

const PrevArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-7 h-7 flex justify-center items-center  bg-opacity-50 rounded-r-full cursor-pointer z-10"
    >
      <Image src="/fast-forward.png" alt="Previous Arrow" width={20} height={20} className="rotate-180" />
    </div>
  );
};


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
    if (session && newReview.trim() !== "" && country.trim() !== "") {
      const review = {
        user: {
          email: session.user.email || "Unknown Email",
          name: (session.user as any).name || "Anonymous",
          photo: (session.user as any).image || "/default-user.jpg",
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
   // Slick Slider settings for mobile view
   const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
  <div className="w-full md:w-1/2 px-5 md:px-0">
  {/* Heading */}
  <p className="text-black text-2xl md:text-4xl mb-4 md:mb-6 font-semibold text-center md:text-left">
    ABOUT US
  </p>

  {/* Description */}
  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
    Since <strong>2020</strong>, AHANSA Car Services has been a trusted provider of  
    <strong> economy-to-luxury </strong> car transportation services in <strong>Ella, Sri Lanka</strong>.  
    Whether you’re a tourist or a local, we ensure a smooth and reliable travel experience.
  </p>

  {/* Services */}
  <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
    We specialize in <strong>luxury executive cars, KDH vans, and Toyota Prius vehicles</strong>,  
    offering safe, comfortable, and efficient rides for all passengers.
  </p>

  {/* Bullet Points */}
  <div className="mt-5 space-y-3">
    <div className="flex items-center space-x-2">
      <span className="text-green-500 text-lg">✅</span>  
      <p className="text-sm md:text-base text-gray-700">
        <strong>Tourists:</strong> Hassle-free travel between destinations.
      </p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-green-500 text-lg">✅</span>  
      <p className="text-sm md:text-base text-gray-700">
        <strong>Business Professionals:</strong> Executive transport services.
      </p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-green-500 text-lg">✅</span>  
      <p className="text-sm md:text-base text-gray-700">
        <strong>Families & Groups:</strong> Spacious and comfortable vans.
      </p>
    </div>
  </div>

  {/* Coverage Area */}
  <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed">
    <strong>Coverage Area:</strong> Based in Ella, we also serve Badulla, Bandarawela,  
    and other cities across Sri Lanka.
  </p>

  {/* Booking Info */}
  <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed">
    <strong>Booking & Pricing:</strong> We offer affordable rates with easy booking options.  
    Call us at <a href="tel:+94702610614" className="text-blue-600 font-medium hover:underline">+94742291771</a>  
    or book online. Our team is available 24/7.
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

        {/* Desktop Grid View */}
        <div className="hidden md:grid max-w-6xl mt-5 grid-cols-1 md:grid-cols-3 gap-6">
          {topReviews.length > 0 ? (
            topReviews.map((review, index) => (
              <div
                key={index}
                className="bg-blue-100 shadow-lg rounded-lg flex flex-col items-center relative overflow-hidden w-full md:w-[250px] lg:w-[350px] min-h-[250px] p-6"
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

        {/* Mobile Slider View */}
        <div className="block md:hidden w-full max-w-sm">
          <Slider {...sliderSettings}>
            {topReviews.length > 0 ? (
              topReviews.map((review, index) => (
                <div key={index} className="bg-blue-100 shadow-lg rounded-lg flex flex-col items-center p-6">
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
          </Slider>
        </div>

        {visibleReviews < reviews.length && (
          <button
            className="bg-custom-blue text-white mt-5 py-2 px-6 rounded hover:bg-white hover:text-blue-600"
            onClick={() => setVisibleReviews(visibleReviews + 10)}
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
