import React, { useEffect, useRef, useState } from 'react';
import { TextField, Grid, Container, Typography, Autocomplete, Button } from '@mui/material';
import styled from 'styled-components';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';

interface FormData {
  pickupLocation: string | null;
  dropLocation: string | null;
  dateTime: Dayjs | null;
  pickupCoords: [number, number] | null;
  dropCoords: [number, number] | null;
}

type RideDetailsProps = {
  formData: FormData;
  handleFormDataChange: (newData: Partial<FormData>) => void;
  handleNext: () => void;
};

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
  height: 100%;
  min-height: 400px;
  margin-top: 20px;
`;

const DistanceContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const RideDetails: React.FC<RideDetailsProps> = ({ formData, handleFormDataChange, handleNext }) => {
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<string[]>([]);
  const [distance, setDistance] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const pickupMarker = useRef<mapboxgl.Marker | null>(null);
  const dropMarker = useRef<mapboxgl.Marker | null>(null);
  const routeLayerId = 'route';

  useEffect(() => {
    const selectedLocation = JSON.parse(localStorage.getItem("selectedLocation") || 'null');
    if (selectedLocation) {
      handleFormDataChange({
        ...formData,
        pickupLocation: selectedLocation.name,
        pickupCoords: selectedLocation.coords,
      });
      localStorage.removeItem("selectedLocation");
    }
  }, [formData, handleFormDataChange]);

  const fetchSuggestions = async (query: string, setSuggestions: (suggestions: string[]) => void) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`, {
      params: {
        access_token: accessToken,
        autocomplete: true,
        limit: 5,
        country: 'LK',
      },
    });
    setSuggestions(response.data.features.map((feature: any) => feature.place_name));
  };

  const calculateDistance = (pickupCoords: [number, number], dropCoords: [number, number]) => {
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

  const drawRoute = async (map: mapboxgl.Map, pickupCoords: [number, number], dropCoords: [number, number]) => {
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
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [80.1070, 7.0873],
      zoom: 6,
    });

    return () => mapInstance.current?.remove();
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

  const handlePlaceSelect = async (place: string | null, isPickup: boolean) => {
    if (!place) return;
    
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`, {
      params: {
        access_token: accessToken,
        limit: 1,
      },
    });

    const feature = response.data.features[0];
    const coordinates: [number, number] = feature.center;
    const country = feature.context.find((c: any) => c.id.startsWith('country')).text;
     
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Ride Details
          </Typography>
          <StyledForm>
            <Autocomplete
              options={pickupSuggestions}
              value={formData.pickupLocation}
              onInputChange={(event, value) => fetchSuggestions(value, setPickupSuggestions)}
              onChange={(event, newValue) => handlePlaceSelect(newValue, true)}
              renderInput={(params) => <StyledTextField {...params} label="Pickup Location" variant="outlined" />}
            />
            <Autocomplete
              options={dropSuggestions}
              value={formData.dropLocation}
              onInputChange={(event, value) => fetchSuggestions(value, setDropSuggestions)}
              onChange={(event, newValue) => handlePlaceSelect(newValue, false)}
              renderInput={(params) => <StyledTextField {...params} label="Drop Location" variant="outlined" />}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Select Date and Time"
                value={formData.dateTime}
                onChange={(newValue) => handleFormDataChange({ ...formData, dateTime: newValue })}
              />
            </LocalizationProvider>
            {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
            <DistanceContainer>
              {distance && <Typography variant="h6">Distance: {distance} km</Typography>}
            </DistanceContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              style={{ marginTop: '20px' }}
            >
              Next
            </Button>
          </StyledForm>
        </Grid>

        <Grid item xs={12} md={6}>
          <MapContainer ref={mapRef} />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default RideDetails;
