import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, MenuItem, FormControl, InputLabel, Select, Grid, Button } from '@mui/material';
import styled from 'styled-components';
import { useSession } from 'next-auth/react';
import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent type

// Define the formData type
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

// Define the props type
interface ContactDetailsProps {
  formData: FormData;
  handleFormDataChange: (updatedData: Partial<FormData>) => void; // handle partial updates
  onNext: () => void;
  onPrevious: () => void;
}

const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 800px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ContactDetails: React.FC<ContactDetailsProps> = ({ formData, handleFormDataChange, onNext, onPrevious }) => {
  const { data: session } = useSession();
  const [errors, setErrors] = useState<Partial<FormData>>({});  // Errors type is also partial since not all fields might have errors

  useEffect(() => {
    if (session && session.user && typeof session.user.name === 'string' && session.user.name.trim() !== '') {
      const nameParts = session.user.name.split(' ');
      const firstName = formData.firstName || nameParts[0] || '';
      const lastName = formData.lastName || nameParts[1] || ''; // Handles cases where there is no last name
      handleFormDataChange({
        firstName,
        lastName,
        email: formData.email || session.user.email || '',
        mobileNumber: formData.mobileNumber || '',
      });
    } else {
      handleFormDataChange({
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || session?.user?.email || '',
        mobileNumber: formData.mobileNumber || '',
      });
    }
  }, [session, formData, handleFormDataChange]);

  // Separate handlers for TextField and Select components
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleFormDataChange({
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    handleFormDataChange({
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};  // Partial form data for errors
    const mobileNumberRegex = /^\+[1-9]\d{1,14}$/; // E.164 international phone number format

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileNumberRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>Contact Details</Typography>
      <StyledForm>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Personal Information</Typography>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Contact Information</Typography>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleNext} style={{ marginTop: '20px' }}>
          Next
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default ContactDetails;