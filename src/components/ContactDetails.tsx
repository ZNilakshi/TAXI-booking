import React from 'react';

const ContactDetails = ({ onNext, onPrevious }) => {
  const handleNext = () => {
    // Add form validation logic here if needed
    onNext();
  };

  return (
    <div>
      <h2>Contact Details</h2>
      <form>
        {/* Add your form fields here */}
        <button type="button" onClick={onPrevious}>Previous</button>
        <button type="button" onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default ContactDetails;
