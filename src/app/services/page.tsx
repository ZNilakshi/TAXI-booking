"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image"; // Use next/image for optimized images
import { useRouter } from "next/navigation";  // To programmatically navigate to the booking page

export default function Services() {
  const [bgOpacity, setBgOpacity] = useState(1);
  const router = useRouter(); // Use the router for navigation

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

  const popularLocations = [
    { name: 'Ahangama', link: '/ahangama' },
    { name: 'Anuradapura', link: '/anuradapura' },
    { name: 'Arugambay', link: '/arugambay' },
    { name: 'Balapitiya', link: '/balapitiya' },
    { name: 'Bentota', link: '/bentota' },
    { name: 'Colombo City Tour', link: '/colombo' },
    { name: 'Katunayaka Airport', link: '/colombo-airport' },
    { name: 'Dalhousie', link: '/dalhousie' },
    { name: 'Dambulla', link: '/dambulla' },
    { name: 'Dickwella', link: '/dickwella' },
    { name: 'Diyaluma Falls Tour', link: '/diyaluma-falls' },
    { name: 'Galle', link: '/galle' },
    { name: 'Hikkaduwa', link: '/hikkaduwa' },
    { name: 'Hiriketiya', link: '/hiriketiya' },
    { name: 'Kalpitiya', link: '/kalpitiya' },
    { name: 'Kandy', link: '/kandy' },
    { name: 'Matara', link: '/matara' },
    { name: 'Mirissa', link: '/mirissa' },
    { name: 'Mattala Airport', link: '/mattala-airport' },

  ];

  const handleLocationClick = (location: { name: string; link: string; }) => {
    // Save selected location data in local storage or state management tool
    localStorage.setItem("selectedLocation", JSON.stringify(location));
    router.push('/booking'); // Navigate to the booking page
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1] transition-opacity duration-500"
        style={{ backgroundImage: "url('/6.jpg')", filter: "blur(2px)", opacity: bgOpacity }}
      ></div>
      <Navbar />
      <div className="relative w-full py-20 text-center text-white flex flex-col items-center">
        <h1 className="mt-40 text-7xl font-semibold text-white">Discover  Services</h1>
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
<br></br>
<br></br>
<br></br>
<br></br>
        {/* Popular Locations Section */}
        <section className="w-full max-w-6xl px-5">
          <h2 className="text-3xl font-semibold text-custom-blue mb-8">Explore Our Top Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {popularLocations.map((location, index) => (
              <div key={index} className="bg-custom-blue rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                <button
                  className="block w-full p-6  items-center justify-between text-white font-medium hover:bg-gray-100 hover:text-custom-blue rounded-lg"
                  onClick={() => handleLocationClick(location)}
                >
                  <span>{location.name}</span>
                  <span className="ml-auto">
                    <Image src="/fast-forward.png" alt="Arrow Icon" width={20} height={20} />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>

 <Footer />
 
    </>
  );
}
