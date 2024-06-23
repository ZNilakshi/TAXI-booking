"use client";
import { Provider } from 'react-redux';
import store from '../app/state/store';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from '../components/Navbar';

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex justify-center items-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer z-10">
      &rarr;
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex justify-center items-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer z-10">
      &larr;
    </div>
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1] transition-opacity duration-500" style={{ backgroundImage: "url('/1.jpg')", filter: 'blur(2px)', opacity: bgOpacity }}></div>
      <Navbar />
      <div className="relative w-full py-20 text-center text-white flex flex-col items-center">
        <h1 className="mt-40 text-7xl font-semibold text-custom-blue">ABCD Taxi Service</h1>
        <h2 className="mt-10 text-3xl font-light">SEATTLE'S PREMIUM TRANSPORTATION COMPANY</h2>
        <div className="flex gap-5 mt-10 mb-20 py-4 px-10">
          <button className="bg-custom-blue text-white py-4 px-10 text-lg hover:bg-white hover:text-blue-600" onClick={() => window.location.href = '/book'}>Book a Ride</button>
          <button className="bg-white text-black py-4 px-6 text-lg hover:bg-custom-blue hover:text-white" onClick={() => window.location.href = 'tel:+1234567890'}>+94702610614</button>
        </div>
        <div className="mb-2 max-w-3xl mx-auto mt-20 p-10 text-black bg-opacity-80 rounded-lg">
          <p className="text-4xl font-light">THE BEST SEATTLE AIRPORT TRANSPORTATION COMPANY</p>
          <p className="mt-6 text-lg font-extralight">NW Car Services, A well known and respected transportation provider in Seattle, Washington. With a fleet of over 10 vehicles, NW Car Services provides professional, timely, reliable and unforgettable transportation experience: prompt, dependable, safe, and relaxing. With Seattle Car Service, customers experience first-class style and convenience while riding to and from any occasion.</p>
        </div>
        <div className="max-w-3xl mx-auto mt-1 p-1 text-black bg-opacity-80 rounded-lg">
          <p className="text-4xl font-light">SEATTLE'S SPECIAL TRANSPORTATION SERVICES</p>
        </div>
        <div className="flex gap-12 mt-10">
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/ap.jpg" alt="Image 1" className="w-full rounded-lg" />
            <p className="mt-8 text-lg font-medium text-black">AIRPORT TRANSFERS</p>
            <p className="mt-2 text-base font-light text-black">NWCS providing Affordable, on time and safe ground transportation to and from all major airports and Seaports.</p>
          </div>
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/wed.jpg" alt="Image 2" className="w-full rounded-lg" />
            <p className="mt-8 text-lg font-medium text-black">SPECIAL EVENTS</p>
            <p className="mt-2 text-base font-light text-black">Special events mark important milestones and create cherished memories. Whether it’s a wedding, anniversary, or a corporate gathering.</p>
          </div>
          <div className="flex flex-col items-center text-center max-w-xs">
            <img src="/1.jpg" alt="Image 3" className="w-full rounded-lg" />
            <p className="mt-8 text-lg font-medium text-black">LONG DISTANCE</p>
            <p className="mt-2 text-base font-light text-black">NWCS providing affordable long distance transportation services, To / From Any major cities book yours now.</p>
          </div>
        </div>
        <div className="w-4/5 mt-10 mx-auto">
          <p className="text-4xl font-light text-black mt-10 mb-5">THE BEST LATE MODEL VEHICLES FLEET</p>
          <Slider {...settings}>
            <div className="flex flex-col items-center">
              <img src="/ls.png" alt="Vehicle 1" className="w-[450px] h-[250px] rounded-lg" />
              <p className="mt-2 text-base font-light text-black text-center">Luxury Sedan</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/suv.png" alt="Vehicle 2" className="w-[450px] h-[250px] rounded-lg" />
              <p className="mt-2 text-base font-light text-black text-center">SUV</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/mihivan.png" alt="Vehicle 3" className="w-[450px] h-[250px] rounded-lg" />
              <p className="mt-2 text-base font-light text-black text-center">Mini Van</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/van.png" alt="Vehicle 4" className="w-[450px] h-[250px] rounded-lg" />
              <p className="mt-2 text-base font-light text-black text-center">Van</p>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
