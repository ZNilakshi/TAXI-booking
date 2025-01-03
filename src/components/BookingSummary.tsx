import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import styled from 'styled-components';
import dayjs from 'dayjs';

interface BookingFormData {
  bookingId?: string;
  pickupLocation?: string | null;
  dropLocation?: string | null;
  dateTime?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  idNumber?: string;
  mobileNumber?: string;
  selectedVehicle?: {
    name: string;
  };
  vehiclePrice?: number;
  paymentMethod?: string;
}


const SummaryContainer = styled(Container)`
  padding: 20px;
  background: #f7f9fc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 800px;
`;

const SummaryHeader = styled(Typography)`
  margin-bottom: 20px;
  color: #003366;
`;

const SummaryItem = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ItemTitle = styled(Typography)`
  font-weight: 600;
  color: #003366;
`;

const ItemContent = styled(Typography)`
  color: #666666;
`;

const formatDateTime = (dateTime: string | undefined): string => {
  return dateTime ? dayjs(dateTime).format('YYYY-MM-DD HH:mm') : 'N/A';
};

const formatPrice = (price: number | undefined): string => {
  return price ? `$${price.toFixed(2)}` : 'N/A';
};

const BookingSummary = ({ formData = {} as BookingFormData }) => {
const formattedDateTime = formData.dateTime ? dayjs(formData.dateTime).format('YYYY-MM-DD HH:mm') : 'N/A';
  
return (
    <SummaryContainer>
      <SummaryHeader variant="h4" gutterBottom>
        Booking Summary
      </SummaryHeader>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SummaryItem>
            <ItemTitle variant="h6">Booking ID</ItemTitle>
            <ItemContent variant="body1">{formData.bookingId || 'N/A'}</ItemContent>
          </SummaryItem>
          <SummaryItem>
            <ItemTitle variant="h6">Ride Details</ItemTitle>
            <ItemContent variant="body1">Pickup Location: {formData.pickupLocation || 'N/A'}</ItemContent>
            <ItemContent variant="body1">Dropoff Location: {formData.dropLocation || 'N/A'}</ItemContent>
            <ItemTitle variant="h6">Pickup Date & Time</ItemTitle>
            <ItemContent variant="body1">{formattedDateTime}</ItemContent>
         
          </SummaryItem>
          <SummaryItem>
            <ItemTitle variant="h6">Contact Details</ItemTitle>
            <ItemContent variant="body1">First Name: {formData.firstName || 'N/A'}</ItemContent>
            <ItemContent variant="body1">Last Name: {formData.lastName || 'N/A'}</ItemContent>
            <ItemContent variant="body1">Title: {formData.title || 'N/A'}</ItemContent>
            <ItemContent variant="body1">Email: {formData.email || 'N/A'}</ItemContent>
            <ItemContent variant="body1">ID Number: {formData.idNumber || 'N/A'}</ItemContent>
            <ItemContent variant="body1">Mobile Number: {formData.mobileNumber || 'N/A'}</ItemContent>
          </SummaryItem>
        </Grid>

        <Grid item xs={12} md={6}>
          <SummaryItem>
            <ItemTitle variant="h6">Vehicle Selection</ItemTitle>
            <ItemContent variant="body1">Vehicle: {formData.selectedVehicle?.name || 'N/A'}</ItemContent>
            <ItemContent variant="body1">Vehicle Price: {formatPrice(formData.vehiclePrice)}</ItemContent>
          </SummaryItem>
          <SummaryItem>
            <ItemTitle variant="h6">Payment Method</ItemTitle>
            <ItemContent variant="body1">Payment Method: {formData.paymentMethod || 'N/A'}</ItemContent>
          </SummaryItem>
        </Grid>
      </Grid>
    </SummaryContainer>
  );
};

export default BookingSummary;
