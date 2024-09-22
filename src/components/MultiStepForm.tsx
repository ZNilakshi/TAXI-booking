"use client";
import React, { useState, useEffect } from 'react';
import { Step, Stepper, StepLabel, Button } from '@mui/material';
import styled from 'styled-components';
import RideDetails from './RideDetails';
import VehicleSelection from './VehicleSelection';
import ContactDetails from './ContactDetails';
import PaymentMethod from './PaymentMethod';
import BookingSummary from './BookingSummary';

const steps = ['Ride Details', 'Vehicle Selection', 'Contact Details', 'Payment Method', 'Booking Summary'];

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const StepperContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;

const FormContainer = styled.div`
  flex: 3;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: calc(100vh - 40px);
`;

const StepContent = styled.div`
  margin-bottom: 20px;
`;

const StepLabelCustom = styled(StepLabel)`
  .MuiStepLabel-label {
    font-size: 1.25rem;
  }
  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    pickupCoords: null,
    dropLocation: '',
    dropCoords: null,
    dateTime: undefined,
    selectedVehicle: undefined, // Use undefined
    firstName: '',
    lastName: '',
    title: '',
    idNumber: '',
    mobileNumber: '',
    paymentMethod: '',
    bookingId: '',
    email: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };
  

  const generateBookingId = () => {
    const now = new Date();
    const datePart = now.toISOString().replace(/[-:.TZ]/g, '');
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `BOOK-${datePart}-${randomPart}`;
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <RideDetails formData={formData} handleFormDataChange={handleFormDataChange} />;
      case 1:
        return <VehicleSelection formData={formData} handleFormDataChange={handleFormDataChange} handleNext={undefined} />;
      case 2:
        return <ContactDetails formData={formData} handleFormDataChange={handleFormDataChange} onNext={function (): void {
          throw new Error('Function not implemented.');
        } } onPrevious={function (): void {
          throw new Error('Function not implemented.');
        } } />;
      case 3:
        return <PaymentMethod formData={formData} handleFormDataChange={handleFormDataChange} />;
      case 4:
        return <BookingSummary formData={formData} />;
      default:
        return 'Unknown step';
    }
  };
  


  const saveFormData = () => {
    const bookingId = formData.bookingId || generateBookingId();
    setFormData((prevData) => ({ ...prevData, bookingId }));

    const formDataWithId = { ...formData, bookingId };
    console.log('FormData with Booking ID:', formDataWithId);

    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataWithId),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to save booking.');
      });
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0:
        return formData.pickupLocation && formData.dropLocation && formData.dateTime;
      case 1:
        return formData.selectedVehicle;
      case 2:
        return formData.firstName && formData.lastName && formData.mobileNumber;
      case 3:
        return formData.paymentMethod;
      default:
        return true; // Summary step always considered complete
    }
  };
  

  const handleNext = () => {
    if (isStepComplete(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      alert('Please complete all required fields.');
    }
  };

  return (
    <Container>
      <StepperContainer>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabelCustom>{label}</StepLabelCustom>
            </Step>
          ))}
        </Stepper>
      </StepperContainer>
      <FormContainer>
        {getStepContent(activeStep)}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
          </Button>
        ) : (
          !isSubmitted && (
            <Button variant="contained" color="primary" onClick={saveFormData}>
              Submit
            </Button>
          )
        )}
        {isSubmitted && <div>Booking successful. Confirmation message will be sent to your email.</div>}
      </FormContainer>
    </Container>
  );
};

export default MultiStepForm;
