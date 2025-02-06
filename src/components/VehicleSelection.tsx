import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, Container, Typography, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import styled from 'styled-components';

// Define types for form data and coordinates
interface FormData {
  pickupCoords: [number, number] | null; // Allow null
  dropCoords: [number, number] | null;   // Allow null
  selectedVehicle: Vehicle | null;
  vehiclePrice?: number;
}

interface Vehicle {
  name: string;
  basePrice: number;
  imageUrl: string;
}

interface VehicleSelectionProps {
  formData: FormData;
  handleFormDataChange: (data: Partial<FormData>) => void;
  handleNext: () => void;
}

// Vehicle data
const vehicles: Vehicle[] = [
  { name: 'Mini Car', basePrice: 85, imageUrl: '/Alto.png' },
  { name: 'Sedan', basePrice: 100, imageUrl: '/prius.png' },
  { name: 'Mini Van', basePrice: 110, imageUrl: '/suzuki.png'},
  { name: 'Van 10 Seats', basePrice: 125, imageUrl: '/kdh.png' },
  { name: 'Van 14 Seats', basePrice: 140, imageUrl: '/kdhh.png' },
];

// Styled components
const FormContainer = styled(Container)`
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const VehicleImage = styled(CardMedia)`
  height: 200px;
  object-fit: cover;
`;

// Function to calculate the distance between coordinates
const calculateDistance = (pickupCoords: [number, number], dropCoords: [number, number]): string => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (dropCoords[1] - pickupCoords[1]) * (Math.PI / 180);
  const dLon = (dropCoords[0] - pickupCoords[0]) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(pickupCoords[1] * (Math.PI / 180)) * Math.cos(dropCoords[1] * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2);
};

// Vehicle selection component
const VehicleSelection: React.FC<VehicleSelectionProps> = ({ formData, handleFormDataChange, handleNext }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(formData.selectedVehicle || null);
  const distance = formData.pickupCoords && formData.dropCoords ? calculateDistance(formData.pickupCoords, formData.dropCoords) : '0';

  const calculatePrice = useCallback((basePrice: number) => {
    const distanceValue = parseFloat(distance);
    return distanceValue * basePrice; // Multiply base price by distance
  }, [distance]);

  useEffect(() => {
    if (selectedVehicle) {
      handleFormDataChange({ selectedVehicle, vehiclePrice: calculatePrice(selectedVehicle.basePrice) });
    }
  }, [selectedVehicle, calculatePrice, handleFormDataChange]);

  const handleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVehicle) {
      handleNext();
    } else {
      alert('Please select a vehicle');
    }
  };

  return (
    <FormContainer maxWidth="lg">
      <Typography variant="h4" gutterBottom>Vehicle Selection</Typography>
      <Grid container spacing={3}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.name}>
            <Card>
              <VehicleImage
                image={vehicle.imageUrl}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {vehicle.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Base Price: RS{vehicle.basePrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Price: RS{calculatePrice(vehicle.basePrice).toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant={selectedVehicle === vehicle ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleSelect(vehicle)}
                  fullWidth
                >
                  Select
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
{/* Submit button */}
<Button 
  variant="contained" 
  color="primary" 
  onClick={handleNext} 
  style={{ marginTop: '20px' }} 
  disabled={!selectedVehicle} // Button is disabled if no vehicle is selected
>
  Next
</Button>

    </FormContainer>
  );
};

export default VehicleSelection;
