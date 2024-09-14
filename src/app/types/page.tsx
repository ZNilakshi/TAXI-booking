// types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  export interface Booking {
    _id: string;
    bookingId: string;
    pickupLocation: string;
    dropLocation: string;
    dateTime: string;
    selectedVehicle: { name: string };
    firstName: string;
    lastName: string;
    mobileNumber: string;
    paymentMethod: string;
  }
  
  export interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
  }
  