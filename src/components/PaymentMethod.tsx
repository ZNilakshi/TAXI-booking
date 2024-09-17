"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Grid, Card, CardContent, Radio, FormControlLabel } from '@mui/material';
import styled from 'styled-components';

// Define the types for formData and handleFormDataChange
interface FormData {
  paymentMethod: string;
}

interface PaymentMethodProps {
  formData: FormData;
  handleFormDataChange: (data: Partial<FormData>) => void;
}

// Styled Components
const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  max-width: 600px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PaymentCard = styled(Card)<{ selected: boolean }>`
  border: ${({ selected }) => (selected ? '2px solid #0073e6' : '2px solid transparent')};
  box-shadow: ${({ selected }) => (selected ? '0 0 10px rgba(0, 115, 230, 0.5)' : 'none')};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 115, 230, 0.3);
  }
`;

// PaymentMethod Component
const PaymentMethod: React.FC<PaymentMethodProps> = ({ handleFormDataChange, formData }) => {
  const [paymentMethod, setPaymentMethod] = useState(formData?.paymentMethod || 'Card');

  // Update state and call the formData handler when payment method changes
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.value;
    setPaymentMethod(method);
    handleFormDataChange({ paymentMethod: method });
  };

  useEffect(() => {
    setPaymentMethod(formData.paymentMethod);
  }, [formData]);

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>Payment Method</Typography>
      <StyledForm>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <PaymentCard 
              selected={paymentMethod === 'Card'} 
              onClick={() => handlePaymentMethodChange({ target: { value: 'Card' } } as React.ChangeEvent<HTMLInputElement>)}
            >
              <CardContent>
                <FormControlLabel 
                  value="Card" 
                  control={<Radio checked={paymentMethod === 'Card'} />} 
                  label="Card" 
                />
              </CardContent>
            </PaymentCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <PaymentCard 
              selected={paymentMethod === 'Cash'} 
              onClick={() => handlePaymentMethodChange({ target: { value: 'Cash' } } as React.ChangeEvent<HTMLInputElement>)}
            >
              <CardContent>
                <FormControlLabel 
                  value="Cash" 
                  control={<Radio checked={paymentMethod === 'Cash'} />} 
                  label="Cash" 
                />
              </CardContent>
            </PaymentCard>
          </Grid>
        </Grid>
      </StyledForm>
    </FormContainer>
  );
};

export default PaymentMethod;
