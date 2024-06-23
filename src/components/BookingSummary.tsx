// src/components/BookingSummary.js
"use client";
import React from 'react';

const BookingSummary = ({ prevStep, handleSubmit, formData }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Booking Summary</h2>
      <p>Pickup Location: {formData.pickupLocation}</p>
      <p>Dropoff Location: {formData.dropoffLocation}</p>
      <p>Date and Time: {formData.dateTime}</p>
      <p>Vehicle Type: {formData.vehicleType}</p>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Phone: {formData.phone}</p>
      <p>Card Number: {formData.cardNumber}</p>
      <button type="button" onClick={prevStep}>Back</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingSummary;
