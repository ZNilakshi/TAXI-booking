"use client";// src/components/PaymentMethod.js

import React from 'react';

const PaymentMethod = ({ nextStep, prevStep, handleChange, formData }) => {
  return (
    <form>
      <h2>Payment Method</h2>
      <label>
        Card Number:
        <input type="text" onChange={handleChange('cardNumber')} value={formData.cardNumber || ''} />
      </label>
      <label>
        Expiry Date:
        <input type="month" onChange={handleChange('expiryDate')} value={formData.expiryDate || ''} />
      </label>
      <label>
        CVV:
        <input type="text" onChange={handleChange('cvv')} value={formData.cvv || ''} />
      </label>
      <button type="button" onClick={prevStep}>Back</button>
      <button type="button" onClick={nextStep}>Next</button>
    </form>
  );
};

export default PaymentMethod;
