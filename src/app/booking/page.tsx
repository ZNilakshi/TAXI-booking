"use client";
import React, { useState } from 'react';
import RideDetails from '../../components/RideDetails';
import VehicleSelection from '../../components/VehicleSelection';
import ContactDetails from '../../components/ContactDetails';
import PaymentMethod from '../../components/PaymentMethod';
import BookingSummary from '../../components/BookingSummary';


const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <RideDetails onNext={goToNextStep} />;
      case 2:
        return <VehicleSelection onNext={goToNextStep} onPrevious={goToPreviousStep} />;
      case 3:
        return <ContactDetails onNext={goToNextStep} onPrevious={goToPreviousStep} />;
      case 4:
        return <PaymentMethod onNext={goToNextStep} onPrevious={goToPreviousStep} />;
      case 5:
        return <BookingSummary onPrevious={goToPreviousStep} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: step === currentStep ? '#007bff' : '#ddd',
              color: step === currentStep ? 'white' : 'black',
              margin: '0 10px',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentStep(step)}
          >
            {step}
          </div>
        ))}
      </div>
      <div style={{ width: '80%', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BookingPage;
i want create my booking page nice. there are 4 component to 4steps. so in booking page 4 circles in this circle name 1, 2,3,4 like that. default 1 for step 1. if user fill step 1 can go to step 2 .after fill 2 user can go 3 like that.

RideDetails';
VehicleSelection';
ContactDetails';
PaymentMethod';
BookingSummary';



