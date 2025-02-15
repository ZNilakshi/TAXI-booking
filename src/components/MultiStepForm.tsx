import React, { useState, useCallback, useEffect } from "react";
import { Step, Stepper, StepLabel, Button } from "@mui/material";
import styled from "styled-components";
import RideDetails from "./RideDetails";
import VehicleSelection from "./VehicleSelection";
import ContactDetails from "./ContactDetails";
import BookingSummary from "./BookingSummary";
import dayjs, { Dayjs } from "dayjs";

type Vehicle = {
  name: string;
  basePrice: number;
  imageUrl: string;
};

type FormData = {
  pickupLocation: string | null;
  pickupCoords: [number, number] | null;
  dropLocation: string | null;
  dropCoords: [number, number] | null;
  dateTime: Dayjs | null;
  selectedVehicle: Vehicle | null;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  bookingId: string;
  email: string;
};

const steps = [
  "Ride Details",
  "Vehicle Selection",
  "Contact Details",
  "Booking Summary",
];

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
`;

const StepperContainer = styled.div`
 margin-top: 80px; /* Adjust this based on your navbar height */
  display: flex;
  justify-content: center;
  padding-bottom: 20px; /* Space below stepper */

  @media (min-width: 768px) {
    flex-direction: column; /* Keep vertical stepper for desktop */
    align-items: center;
    height: 100vh;
    position: sticky;
    top: 0;
  }
`;

const StepLabelCustom = styled(StepLabel)`
  .MuiStepLabel-label {
    text-transform: capitalize;
    
    font-size: 1rem; /* Default (desktop) size */
    
    @media (max-width: 580px) { 
      font-size: 0.4rem; /* Smaller font on mobile */
    }
  }

  .MuiSvgIcon-root {
    font-size: 1.8rem; /* Default (desktop) size */
    
    @media (max-width: 600px) {
      font-size: 1.2rem; /* Smaller icon size on mobile */
    }
  }
`;


const StepperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: column; /* Vertical on desktop */
  }
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

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    pickupLocation: null,
    pickupCoords: null,
    dropLocation: null,
    dropCoords: null,
    dateTime: null,
    selectedVehicle: null,
    firstName: "",
    lastName: "",
    mobileNumber: "",
    bookingId: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Use useCallback to memoize the handler and debounce state updates to avoid repeated renders
  const handleFormDataChange = useCallback(
    (newData: Partial<FormData>) => {
      setFormData((prevData) => {
        const updatedData = { ...prevData, ...newData };
        // Ensure the state only updates if something has actually changed
        if (JSON.stringify(prevData) !== JSON.stringify(updatedData)) {
          return updatedData;
        }
        return prevData;
      });
    },
    [setFormData]
  );

  // Generate booking ID once when the form is submitted
  useEffect(() => {
    if (!formData.bookingId && isSubmitted) {
      const bookingId = generateBookingId();
      setFormData((prevData) => ({ ...prevData, bookingId }));
    }
  }, [formData.bookingId, isSubmitted]);

  const generateBookingId = () => {
    const now = new Date();
    const datePart = now.toISOString().replace(/[-:.TZ]/g, "");
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `BOOK-${datePart}-${randomPart}`;
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <RideDetails
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <VehicleSelection
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <ContactDetails
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      
      case 3:
        return (
          <BookingSummary
            formData={{
              ...formData,
              dateTime: formData.dateTime
                ? formData.dateTime.format("YYYY-MM-DD HH:mm")
                : undefined,
              selectedVehicle: formData.selectedVehicle
                ? { name: formData.selectedVehicle.name }
                : undefined,
            }}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  

  const saveFormData = () => {
    if (!formData.bookingId) {
      const bookingId = generateBookingId();
      const formDataWithId = { ...formData, bookingId };
      setFormData(formDataWithId);

      fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithId),
      })
        .then((response) => response.json())
        .then(() => {
          setIsSubmitted(true);
          
        })
        .catch(() => {
          alert("Failed to save booking.");
        });
    }
  };
;
  

  return (
    <Container>
      <StepperContainer>
  <StepperWrapper>
    <Stepper
      activeStep={activeStep}
      orientation="vertical" // Default (for desktop)
      sx={{
        '@media (max-width: 767px)': {
          flexDirection: "row", // Make it horizontal on mobile
          width: "100%",
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={label} completed={index < activeStep}>
          <StepLabelCustom
            onClick={() => {
              if (index <= activeStep) {
                setActiveStep(index);
              }
            }}
            style={{ cursor: index <= activeStep ? "pointer" : "default" }}
          >
            {label.toLowerCase()} {/* Lowercase step labels for mobile */}
          </StepLabelCustom>
        </Step>
      ))}
    </Stepper>
  </StepperWrapper>
</StepperContainer>

      <FormContainer>
        {steps.map((label, index) => (
          <StepContent
            key={label}
            style={{ display: activeStep === index ? "block" : "none" }}
          >
            {getStepContent(index)}
          </StepContent>
        ))}

        {activeStep === steps.length - 1 && (
          <div>
            {!isSubmitted ? (
              <Button variant="contained" color="primary" onClick={saveFormData}>
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
function onPrevious(): void {
  throw new Error("Function not implemented.");
}

