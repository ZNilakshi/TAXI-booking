"use client";
import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Radio, FormControlLabel } from '@mui/material';
import styled from 'styled-components';

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

const PaymentCard = styled(Card)`
  border: ${({ selected }) => (selected ? '2px solid #0073e6' : '2px solid transparent')};
  box-shadow: ${({ selected }) => (selected ? '0 0 10px rgba(0, 115, 230, 0.5)' : 'none')};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 115, 230, 0.3);
  }
`;

const PaymentMethod = ({ handleFormDataChange, formData = {} }) => {
  const [paymentMethod, setPaymentMethod] = useState(formData.paymentMethod || 'Card');

  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    setPaymentMethod(method);
    handleFormDataChange({ paymentMethod: method });
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>Payment Method</Typography>
      <StyledForm>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <PaymentCard 
              selected={paymentMethod === 'Card'} 
              onClick={() => handlePaymentMethodChange({ target: { value: 'Card' } })}
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
              onClick={() => handlePaymentMethodChange({ target: { value: 'Cash' } })}
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
