import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, Container, Typography, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import styled from 'styled-components';

// Define types for form data and coordinates
interface FormData {
  pickupCoords: [number, number];
  dropCoords: [number, number];
  selectedVehicle?: Vehicle;
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
  { name: 'Sedan', basePrice: 10, imageUrl: '/limo.png' },
  { name: 'SUV', basePrice: 15, imageUrl: '/suv.png' },
  { name: 'Van', basePrice: 20, imageUrl: '/mihivan.jpg' },
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
    const pricePerKm = 1; // Sample rate
    return basePrice + parseFloat(distance) * pricePerKm;
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
                  Base Price: ${vehicle.basePrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Price: ${calculatePrice(vehicle.basePrice).toFixed(2)}
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
    </FormContainer>
  );
};

export default VehicleSelection;
