import React, { useState, useEffect } from 'react';
import { Button, Grid, Container, Typography, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import styled from 'styled-components';

const vehicles = [
  { name: 'Sedan', basePrice: 10, imageUrl: '/limo.png' },
  { name: 'SUV', basePrice: 15, imageUrl: '/suv.png' },
  { name: 'Van', basePrice: 20, imageUrl: '/mihivan.jpg' },
];

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

const calculateDistance = (pickupCoords, dropCoords) => {
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

const VehicleSelection = ({ formData, handleFormDataChange, handleNext }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(formData.selectedVehicle || null);
  const distance = formData.pickupCoords && formData.dropCoords ? calculateDistance(formData.pickupCoords, formData.dropCoords) : 0;

  useEffect(() => {
    if (selectedVehicle) {
      handleFormDataChange({ selectedVehicle, vehiclePrice: calculatePrice(selectedVehicle.basePrice) });
    }
  }, [selectedVehicle]);

  const calculatePrice = (basePrice) => {
    const pricePerKm = 1; // This is a sample rate. Adjust as needed.
    return basePrice + distance * pricePerKm;
  };

  const handleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSubmit = (e) => {
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
                component="img"
                image={vehicle.imageUrl}
                alt={vehicle.name}
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
