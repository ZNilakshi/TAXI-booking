"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

interface Booking {
  _id: string;
  pickupLocation: string;
  dropLocation: string;
  dateTime: string;
  // Add other relevant fields as necessary
}


export default function UserProfile() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch booking data for the logged-in user
  useEffect(() => {
    if (!session?.user?.email) return; // Ensure the session and email are available

    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?email=${session.user.email}`); // Pass email as query param
        const data = await response.json();

        if (response.ok) {
          setBookings(data);
        } else {
          console.error("Failed to fetch bookings:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session?.user?.email]);

  return (
    <div className="flex flex-col items-center p-10 bg-gray-100 min-h-screen">
   
      <Navbar/>
     
      <div className="flex w-full max-w-5xl mt-10 bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Left Sidebar with Tabs */}
        <div className="w-1/4 bg-gray-50 p-6 border-r border-gray-200">
          
          

          {/* Tabs for navigation */}
          <ul className="space-y-3">
            <li>
              <button
                className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                  activeTab === "profile"
                    ? "bg-custom-blue text-white rounded-md shadow"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-3 font-medium transition-colors ${
                  activeTab === "bookingHistory"
                    ? "bg-custom-blue text-white rounded-md shadow"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-md"
                }`}
                onClick={() => setActiveTab("bookingHistory")}
              >
                Booking History
              </button>
            </li>
          </ul>
        </div>

        {/* Right Content Area */}
        <div className="w-3/4 p-8 bg-gray-50">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-2">
                Profile Information
              </h3>
              <div className="mt-4 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">Name</p>
                  <p className="text-gray-700">{session?.user?.name || "User Name"}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">Email</p>
                  <p className="text-gray-700">{session?.user?.email || "user@example.com"}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookingHistory" && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-2">
                Booking History
              </h3>
              {loading ? (
                <p className="text-gray-500">Loading booking history...</p>
              ) : bookings.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <li
                      key={booking._id}
                      className="flex justify-between items-center py-4 bg-white px-6 rounded-lg shadow mb-4"
                    >
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {booking.pickupLocation || "N/A"} to {booking.dropLocation || "N/A"}
                        </p>
                        <div className="text-sm text-gray-600">
                          {new Date(booking.dateTime).toLocaleString()}
                        </div>
                      </div>
                    
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No bookings found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
