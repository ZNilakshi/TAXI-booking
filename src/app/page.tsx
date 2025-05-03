"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Image from "next/image";
import axios from "axios";
import Services from "../components/Services";

interface ArrowProps {
  onClick?: () => void;
}

interface Slide {
  image: string;
  title: string;
  description: string;
}

const NextArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 flex justify-center items-center bg-opacity-50 rounded-l-full cursor-pointer z-10"
    >
      <Image src="/fast-forward.png" alt="Next Arrow" width={24} height={24} />
    </div>
  );
};

const PrevArrow = (props: ArrowProps) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-14 h-14 flex justify-center items-center bg-opacity-50 rounded-r-full cursor-pointer z-10"
    >
      <Image src="/fast-forward.png" alt="Previous Arrow" width={24} height={24} className="rotate-180" />
    </div>
  );
};

const ServiceSlider = ({ slides }: { slides: Slide[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="flex flex-col items-center text-center max-w-xs">
          <Image src={slide.image} alt={`Slide ${index}`} width={300} height={200} className="w-full rounded-lg" />
          <p className="mt-8 text-lg font-medium text-black">{slide.title}</p>
          <p className="mt-2 text-base font-light text-black">{slide.description}</p>
        </div>
      ))}
    </Slider>
  );
};

const GallerySlider = ({ galleryImages }: { galleryImages: {src: string, caption: string}[] }) => {
  const gallerySettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...gallerySettings}>
      {galleryImages.map((item, index) => (
        <div key={index} className="flex flex-col items-center px-2">
          <div className="relative w-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <Image 
              src={item.src} 
              alt={`Gallery ${index + 1}`} 
              width={400} 
              height={300} 
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-lg font-medium text-center">{item.caption}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default function Home() {
  const router = useRouter();
  const [bgOpacity, setBgOpacity] = useState(1);
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState("");
  const [country, setCountry] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

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

  const openModal = (review: any) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipeToSlide: true,
  };

  const topReviews = reviews.slice(0, visibleReviews);
  const handleLoadMore = () => setVisibleReviews(visibleReviews + 10);

  const serviceSlides = [
    {
      image: "/ap.jpg",
      title: "AIRPORT TRANSFERS",
      description: "Affordable, on-time, and safe ground transportation to and from all major airports and seaports.",
    },
    {
      image: "/wed.jpg",
      title: "SPECIAL EVENTS",
      description: "Mark important milestones with our reliable and luxurious transport service.",
    },
    {
      image: "/1.jpg",
      title: "LONG DISTANCE",
      description: "Affordable long-distance transportation services to/from major cities.",
    },
    {
      image: "/2.jpg",
      title: "FIXED TRANSFERS",
      description: "Fixed rate transfers with professional service.",
    },
  ];

  const galleryImages = [
    {
      src: "/gallery1.jpeg",
      caption: "Happy Chinese guests enjoying their trip to Nuwara Eliya"
    },
    {
      src: "/gallery2.jpg",
      caption: "Happy indian guests enjoying their trip"
    },
    {
      src: "/gallery3.jpg",
      caption: "Family vacation transportation"
    },
    {
      src: "/gallery4.jpg",
      caption: "Family vacation transportation"
    },
    {
      src: "/gallery5.jpg",
      caption: "Scenic tour along the Pacific Coast"
    },
    {
      src: "/gallery6.jpg",
      caption: "Family vacation transportation"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="relative w-full text-center text-white flex flex-col items-center">
        <div className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm -z-10"
            style={{ backgroundImage: "url('/6.jpg')" }}
          ></div>
          
          <h1 className="mt-40 text-7xl font-semibold text-blue">Drivex</h1>
          <h2 className="mt-10 text-3xl font-light">SEATTLE&#39;S PREMIUM TRANSPORTATION COMPANY</h2>
          <div className="flex flex-col sm:flex-row gap-5 mt-10 mb-20 py-4 px-10 items-center sm:items-start">
            <button
              className="bg-custom-blue text-white py-4 px-10 text-lg hover:bg-white hover:text-black w-full sm:w-auto"
              onClick={() => window.location.href = '/booking'}
            >
              Book a Ride
            </button>
            <button
              className="bg-white text-black py-4 px-12 text-lg hover:bg-custom-blue hover:text-white w-full sm:w-auto"
              onClick={() => window.location.href = 'tel:+94742291771'}
            >
              Call Us
            </button>
          </div>
        </div>
        <Services />
        <div className="max-w-3xl mx-auto mt-5 p-1 text-black rounded-lg">
          <p className="text-4xl font-light">SEATTLE&#39;S SPECIAL TRANSPORTATION SERVICES</p>
        </div>
        
        <div className="w-11/12 mt-10 p-5 bg-opacity-80 mx-auto">
          <ServiceSlider slides={serviceSlides} />
        </div>

        <div className="w-11/12 mt-2 mx-auto">
          <p className="text-4xl font-light text-black mt-10 mb-5">OUR HAPPY CLIENTS & MEMORABLE TRIPS</p>
          <GallerySlider galleryImages={galleryImages} />
        </div>

        {/* Reviews Section */}
        <div className="relative w-full flex flex-col items-center justify-center text-center p-10 bg-gray-100">

          <p className="text-4xl font-light text-black mt-10 mb-5"> REVIEWS</p>
   
          {session ? (
            <div className="w-full max-w-2xl bg-white text-black p-6 border border-gray-300 rounded shadow-lg mb-6">
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
                className="bg-custom-blue text-white py-2 px-4 rounded hover:bg-white hover:text-custom-blue"
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
                      {review.text.length > 200
                        ? review.text.substring(0, 200) + "..."
                        : review.text}
                      &quot;
                    </p>
                    {review.text.length > 200 && (
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
                <p></p>
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

        <div
          className="relative w-full h-96 mt-10 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/donload.jpg')" }}
        >
          <p className="text-2xl font-light text-white">Experience the difference with our premium service.</p>
          <button
            className="mt-5 bg-custom-blue text-white py-4 px-8 text-lg hover:bg-white hover:text-black"
            onClick={() => window.location.href = '/contact'}
          >
            CONTACT US
          </button>
        </div>
      </div>

      {/* Modal for review */}
      {modalOpen && selectedReview && (
        <Modal 
          isOpen={modalOpen} 
          onClose={closeModal} 
          review={selectedReview} 
        />
      )}

      <Footer />
    </>
  );
}