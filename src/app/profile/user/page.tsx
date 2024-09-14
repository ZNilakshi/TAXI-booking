"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
`;

const UserEmail = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
  text-align: center;
`;

const BookingHistoryContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const BookingItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user details...');
        const userResponse = await fetch('/api/users');
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user details: ${userResponse.statusText}`);
        }
        const userData = await userResponse.json();
        // Assuming the response is an array of users, select the relevant user (e.g., the first one)
        setUser(userData[0]);
        console.log('User details fetched successfully:', userData[0]);

        console.log('Fetching booking history...');
        const bookingResponse = await fetch('/api/bookings');
        if (!bookingResponse.ok) {
          throw new Error(`Failed to fetch booking history: ${bookingResponse.statusText}`);
        }
        const bookingData = await bookingResponse.json();
        // Assuming the response is an array of bookings, filter or map the data as needed
        setBookingHistory(bookingData);
        console.log('Booking history fetched successfully:', bookingData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ProfileContainer>
      <h1>Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {user && (
            <ProfileCard>
              <Avatar src={user.profilePicture} alt={`${user.name}'s profile picture`} />
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </ProfileCard>
          )}
          <BookingHistoryContainer>
            <h2>Booking History</h2>
            {bookingHistory.length > 0 ? (
              bookingHistory.map((booking) => (
                <BookingItem key={booking.bookingId}>
                  <div>
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </div>
                  <div>
                    <strong>Pickup Location:</strong> {booking.pickupLocation}
                  </div>
                  <div>
                    <strong>Drop Location:</strong> {booking.dropLocation}
                  </div>
                  <div>
                    <strong>Date & Time:</strong> {new Date(booking.dateTime).toLocaleString()}
                  </div>
                  <div>
                    <strong>Vehicle:</strong> {booking.selectedVehicle}
                  </div>
                  <div>
                    <strong>Payment Method:</strong> {booking.paymentMethod}
                  </div>
                </BookingItem>
              ))
            ) : (
              <p>No bookings found.</p>
            )}
          </BookingHistoryContainer>
        </>
      )}
    </ProfileContainer>
  );
}
