"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Navbar";
import Image from "next/image"; // Use next/image for optimized images
import { FaWhatsapp, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiImou } from "react-icons/si";

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
      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 flex justify-center items-center bg-black bg-opacity-50 rounded-l-full cursor-pointer z-10"
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
      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-14 h-14 flex justify-center items-center bg-black bg-opacity-50 rounded-r-full cursor-pointer z-10"
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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

const VehicleSlider = ({ vehicleImages }: { vehicleImages: string[] }) => {
  const vehicleSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
    <Slider {...vehicleSettings}>
      {vehicleImages.map((src, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="relative w-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 border-4 border-black-500">
            <Image src={src} alt={`Vehicle ${index + 1}`} width={450} height={250} className="w-[450px] h-[250px] rounded-lg" />
            <p className="mt-2 text-base font-light text-black text-center">{['Mini Car', 'Sedan Car', 'Minivan', 'Van 10 Seats', 'Van 14 Seats'][index]}</p>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-lg font-medium">Seats: {[3, 3, 5, 10,14][index]}</p>
              <p className="text-base font-light">Conditions:  Air conditioning</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default function Home() {
  const [bgOpacity, setBgOpacity] = useState(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newOpacity = Math.max(1 - scrollY / 300, 0);
    setBgOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const vehicleImages = ["/Alto.png", "/prius.png", "/suzuki.png", "/kdh.png", "/kdhh.png"];

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1] transition-opacity duration-500"
        style={{ backgroundImage: "url('/6.jpg')", filter: "blur(2px)", opacity: bgOpacity }}
      ></div>
      <Navbar />
      <div className="relative w-full py-20 text-center text-white flex flex-col items-center">
        <h1 className="mt-40 text-7xl font-semibold text-blue">Ceylon Ahasna Traval & Tour</h1>
        <h2 className="mt-10 text-3xl font-light">SEATTLE&#39;S PREMIUM TRANSPORTATION COMPANY</h2>
        <div className="flex gap-5 mt-10 mb-20 py-4 px-10">
          <button
            className="bg-custom-blue text-white py-4 px-10 text-lg hover:bg-white hover:text-black"
            onClick={() => window.location.href = '/booking'}
          >
            Book a Ride
          </button>
          <button
            className="bg-white text-black py-4 px-6 text-lg hover:bg-custom-blue hover:text-white"
            onClick={() => window.location.href = 'tel:+94719807100'}
          >
            +94719807100
          </button>
        </div>
        <div className="max-w-3xl mx-auto mt-1 p-1 text-black bg-opacity-80 rounded-lg">
          <p className="text-4xl font-light">SEATTLE&#39;S SPECIAL TRANSPORTATION SERVICES</p>
        </div>
        <div className="w-11/12 mt-10 mx-auto">
          <ServiceSlider slides={serviceSlides} />
        </div>
        <div className="w-11/12 mt-20 mx-auto">
          <p className="text-4xl font-light text-black mt-10 mb-5">THE BEST LATE MODEL VEHICLES FLEET</p>
          <VehicleSlider vehicleImages={vehicleImages} />
        </div>
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
      <footer className="w-full bg-opacity-80 text-white flex flex-col items-center justify-center py-5 mt-10">
        <Image src="/9798.png" alt="Footer Logo" width={68} height={68} className="h-12 mb-2" />
        <div className="flex gap-5 mt-2">
          <a href="https://wa.me/94719807100" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="text-3xl text-green-500" /></a>
          <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer"><FaYoutube className="text-3xl text-red-500" /></a>
          <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-3xl text-blue-600" /></a>
          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-3xl text-pink-500" /></a>
             </div>
        <p className="text-sm text-black mt-2">&copy; 2024 Ceylon Ahasna Travel & Tour. All rights reserved.</p>
      </footer>
    </>
  );
}
