import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, Container, Typography, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';

// Define types for form data and coordinates
interface FormData {
  pickupCoords: [number, number] | null;
  dropCoords: [number, number] | null;
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
  { name: 'Mini Van', basePrice: 110, imageUrl: '/suzuki.png' },
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
  width: 100%;
  height: 170px; 

  @media (max-width: 600px) {
    height: 150px; // Smaller height on small screens
  }

  @media (min-width: 1200px) {
    height: 250px; // Larger height on bigger screens
  }
`;

// Function to calculate distance using Mapbox Directions API
const fetchDistance = async (pickupCoords: [number, number], dropCoords: [number, number]) => {
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const waypoints = `${pickupCoords.join(',')};${dropCoords.join(',')}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: accessToken,
        geometries: 'geojson',
      },
    });
    return (response.data.routes[0].distance / 1000).toFixed(2); // Convert meters to kilometers
  } catch (error) {
    console.error("Error fetching route distance:", error);
    return '0';
  }
};

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ formData, handleFormDataChange, handleNext }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(formData.selectedVehicle || null);
  const [distance, setDistance] = useState<string>('0');

  useEffect(() => {
    if (formData.pickupCoords && formData.dropCoords) {
      fetchDistance(formData.pickupCoords, formData.dropCoords).then(setDistance);
    }
  }, [formData.pickupCoords, formData.dropCoords]);

  const calculatePrice = useCallback((basePrice: number) => {
    return parseFloat(distance) * basePrice;
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
      <Typography variant="h6" color="textSecondary">Estimated Distance: {distance} km</Typography>
      <Grid container spacing={3}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.name}>
            <Card>
              <VehicleImage image={vehicle.imageUrl} />
              <CardContent>
                <Typography variant="h5">{vehicle.name}</Typography>
                <Typography variant="body2" color="textSecondary">Base Price: RS{vehicle.basePrice}</Typography>
                <Typography variant="body2" color="textSecondary">
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
        onClick={handleSubmit} 
        style={{ marginTop: '20px' }} 
        disabled={!selectedVehicle}
      >
        Next
      </Button>
    </FormContainer>
  );
};

export default VehicleSelection;
