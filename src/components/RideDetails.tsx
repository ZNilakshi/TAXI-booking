// src/components/RideDetails.tsx

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const RideDetails = ({ nextStep, handleChange, formData }) => {
  const [pickupLocation, setPickupLocation] = useState({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [dropoffLocation, setDropoffLocation] = useState({ lat: 37.7749, lng: -122.4194 });

  const handleMapClick = (event) => {
    setPickupLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    handleChange('pickupLocation')({ target: { value: event.latLng.lat() + ',' + event.latLng.lng() } });
  };

  return (
    <form>
      <h2>Ride Details</h2>
      <label>
        Pickup Location:
        <input type="text" onChange={handleChange('pickupLocation')} value={formData.pickupLocation || ''} />
      </label>
      <label>
        Dropoff Location:
        <input type="text" onChange={handleChange('dropoffLocation')} value={formData.dropoffLocation || ''} />
      </label>
      <label>
        Date and Time:
        <input type="datetime-local" onChange={handleChange('dateTime')} value={formData.dateTime || ''} />
      </label>
      <LoadScript googleMapsApiKey="AIzaSyAqV8YIW6FOeTectNdAN7Y2wV9_hNECfUs">
        <GoogleMap
          mapContainerStyle={{ width: '400px', height: '300px' }}
          center={pickupLocation}
          zoom={10}
          onClick={handleMapClick}
        >
          <Marker position={pickupLocation} />
        </GoogleMap>
      </LoadScript>
      <button type="button" onClick={nextStep}>Next</button>
    </form>
  );
};

export default RideDetails;
