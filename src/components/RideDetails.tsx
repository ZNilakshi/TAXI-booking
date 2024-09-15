import React, { useEffect, useRef, useState } from 'react';
import { TextField, Grid, Container, Typography, Autocomplete } from '@mui/material';
import styled from 'styled-components';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';

const FormContainer = styled(Container)`
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px !important;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 20px;
`;

const DistanceContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const RideDetails = ({ formData, handleFormDataChange }) => {
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [distance, setDistance] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const pickupMarker = useRef(null);
  const dropMarker = useRef(null);
  const routeLayerId = 'route';
  useEffect(() => {
    // Check for a selected location from local storage on mount
    const selectedLocation = JSON.parse(localStorage.getItem("selectedLocation"));
    if (selectedLocation) {
      handleFormDataChange({
        ...formData,
        pickupLocation: selectedLocation.name,
        pickupCoords: selectedLocation.coords,
      });
      localStorage.removeItem("selectedLocation"); // Clear it after setting
    }
  }, []);

  const fetchSuggestions = async (query, setSuggestions) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`, {
      params: {
        access_token: accessToken,
        autocomplete: true,
        limit: 5,
        country: 'LK', // Restrict to Sri Lanka
      },
    });
    setSuggestions(response.data.features.map((feature) => feature.place_name));
  };

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
    setDistance(distance.toFixed(2));
  };

  const drawRoute = async (map, pickupCoords, dropCoords) => {
    if (map.getLayer(routeLayerId)) {
      map.removeLayer(routeLayerId);
      map.removeSource(routeLayerId);
    }

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const waypoints = `${pickupCoords.join(',')};${dropCoords.join(',')}`;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${waypoints}`;

    const response = await axios.get(url, {
      params: {
        access_token: accessToken,
        geometries: 'geojson'
      }
    });

    const route = response.data.routes[0].geometry;

    map.addSource(routeLayerId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: route,
      },
    });

    map.addLayer({
      id: routeLayerId,
      type: 'line',
      source: routeLayerId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#FF0000',
        'line-width': 4,
      },
    });
  };

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('Mapbox access token is not set');
      return;
    }
    mapboxgl.accessToken = accessToken;
    mapInstance.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [80.1070, 7.0873],
      zoom: 6,
    });

    return () => mapInstance.current.remove();
  }, []);

  useEffect(() => {
    if (mapInstance.current && formData.pickupCoords) {
      if (pickupMarker.current) {
        pickupMarker.current.setLngLat(formData.pickupCoords);
      } else {
        pickupMarker.current = new mapboxgl.Marker({ color: 'green' })
          .setLngLat(formData.pickupCoords)
          .addTo(mapInstance.current);
      }
    }
  }, [formData.pickupCoords]);

  useEffect(() => {
    if (mapInstance.current && formData.dropCoords) {
      if (dropMarker.current) {
        dropMarker.current.setLngLat(formData.dropCoords);
      } else {
        dropMarker.current = new mapboxgl.Marker({ color: 'red' })
          .setLngLat(formData.dropCoords)
          .addTo(mapInstance.current);
      }
    }
  }, [formData.dropCoords]);

  useEffect(() => {
    if (mapInstance.current && formData.pickupCoords && formData.dropCoords) {
      drawRoute(mapInstance.current, formData.pickupCoords, formData.dropCoords);
      calculateDistance(formData.pickupCoords, formData.dropCoords);
    }
  }, [formData.pickupCoords, formData.dropCoords]);

  const handlePlaceSelect = async (place, isPickup) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`, {
      params: {
        access_token: accessToken,
        limit: 1,
      },
    });
    const feature = response.data.features[0];
    const coordinates = feature.center;
    const country = feature.context.find(c => c.id.startsWith('country')).text;
    
    if (country !== 'Sri Lanka') {
      setErrorMessage('Please add a location in Sri Lanka.');
      return;
    }

    setErrorMessage('');
    
    if (isPickup) {
      handleFormDataChange({ ...formData, pickupLocation: place, pickupCoords: coordinates });
    } else {
      handleFormDataChange({ ...formData, dropLocation: place, dropCoords: coordinates });
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>
        Ride Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StyledForm>
            <Autocomplete
              options={pickupSuggestions}
              value={formData.pickupLocation}
              onChange={(event, newValue) => handlePlaceSelect(newValue, true)}
              onInputChange={(event, newInputValue) => {
                fetchSuggestions(newInputValue, setPickupSuggestions);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Pickup Location"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
            <Autocomplete
              options={dropSuggestions}
              value={formData.dropLocation}
              onChange={(event, newValue) => handlePlaceSelect(newValue, false)}
              onInputChange={(event, newInputValue) => {
                fetchSuggestions(newInputValue, setDropSuggestions);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Drop Location"
                  variant="outlined"
                  fullWidth
                  required
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date & Time"
                value={formData.dateTime}
                onChange={(newValue) => handleFormDataChange({ ...formData, dateTime: newValue })}
                renderInput={(params) => <StyledTextField {...params} variant="outlined" fullWidth required />}
              />
            </LocalizationProvider>
          </StyledForm>
          {distance && (
            <DistanceContainer>
              <Typography variant="h6">Distance: {distance} km</Typography>
            </DistanceContainer>
          )}
          {errorMessage && (
            <Typography variant="body1" color="error">{errorMessage}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <MapContainer ref={mapRef} />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default RideDetails;