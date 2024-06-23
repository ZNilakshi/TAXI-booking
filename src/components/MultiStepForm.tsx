// src/components/MultiStepForm.js
"use client";
import React, { useState } from 'react';
import RideDetails from '../components/RideDetails';
import VehicleSelection from '../components/VehicleSelection';
import ContactDetails from  '../components/ContactDetails';
import PaymentMethod from '../components/PaymentMethod';
import BookingSummary from '../components/BookingSummary';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // initial form data structure
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };

  switch (step) {
    case 1:
      return <RideDetails nextStep={nextStep} handleChange={handleChange} formData={formData} />;
    case 2:
      return <VehicleSelection nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    case 3:
      return <ContactDetails nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    case 4:
      return <PaymentMethod nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />;
    case 5:
      return <BookingSummary prevStep={prevStep} handleSubmit={handleSubmit} formData={formData} />;
    default:
      return <RideDetails nextStep={nextStep} handleChange={handleChange} formData={formData} />;
  }
};

export default MultiStepForm;
