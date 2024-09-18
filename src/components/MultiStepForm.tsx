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
  position: -webkit-sticky; /* For Safari */
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
  max-height: calc(100vh - 40px); /* Adjust based on the padding */
`;

const StepContent = styled.div`
  margin-bottom: 20px;
`;

const StepLabelCustom = styled(StepLabel)`
  .MuiStepLabel-label {
    font-size: 1.25rem; /* Increase font size */
  }
  .MuiSvgIcon-root {
    font-size: 2rem; /* Increase icon size */
  }
`;

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    pickupCoords: null,
    dropLocation: '',
    dropCoords: null,
    dateTime: null,
    selectedVehicle: null,
    firstName: '',
    lastName: '',
    title: '',
    idNumber: '',
    mobileNumber: '',
    paymentMethod: '',
    bookingId: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormDataChange = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const generateBookingId = () => {
    const now = new Date();
    const datePart = now.toISOString().replace(/[-:.TZ]/g, '');
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `BOOK-${datePart}-${randomPart}`;
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <RideDetails formData={formData} handleFormDataChange={handleFormDataChange} />;
      case 1:
        return <VehicleSelection formData={formData} handleFormDataChange={handleFormDataChange} />;
      case 2:
        return <ContactDetails formData={formData} handleFormDataChange={handleFormDataChange} />;
      case 3:
        return <PaymentMethod formData={formData} handleFormDataChange={handleFormDataChange} />;
      case 4:
        return <BookingSummary formData={formData} />;
      default:
        return 'Unknown step';
    }
  };

  const saveFormData = () => {
    if (!formData.bookingId) {
      const bookingId = generateBookingId();
      setFormData((prevData) => ({ ...prevData, bookingId }));

      setTimeout(() => {
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
      }, 0);
    }
  };

  useEffect(() => {
    const isStepComplete = () => {
      switch (activeStep) {
        case 0:
          return formData.pickupLocation && formData.dropLocation && formData.dateTime;
        case 1:
          return formData.selectedVehicle;
        case 2:
          return formData.firstName && formData.lastName && formData.mobileNumber;
        case 3:
          return formData.paymentMethod;
        case 4:
          return true; // No specific completion check needed for the summary
        default:
          return false;
      }
    };
    if (isStepComplete()) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else if (activeStep === steps.length - 2) {
        // If we're on the second-to-last step, generate the booking ID before moving to the summary
        if (!formData.bookingId) {
          const bookingId = generateBookingId();
          setFormData((prevData) => ({ ...prevData, bookingId }));
        }
      }
    }
  }, [formData, activeStep]);
  return (
    <Container>
      <StepperContainer>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabelCustom>{label}</StepLabelCustom>
            </Step>
          ))}
        </Stepper>
      </StepperContainer>
      <FormContainer>
        {steps.map((label, index) => (
          <StepContent key={label} style={{ display: activeStep >= index ? 'block' : 'none' }}>
            {getStepContent(index)}
          </StepContent>
        ))}
        {activeStep === steps.length - 1 && (
          <div>
            {!isSubmitted ? (
              <Button
                variant="contained"
                color="primary"
                onClick={saveFormData}
              >
                Submit
              </Button>
            ) : (
              <div>Booking successful. Confirmation message will be sent to your email.</div>
            )}
          </div>
        )}
      </FormContainer>
    </Container>
  );
};

export default MultiStepForm;