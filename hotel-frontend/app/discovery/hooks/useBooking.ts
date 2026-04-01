import { useState } from 'react';

export const useBooking = () => {
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    slot: "",
    guests: 1
  });

  const handleFormChange = (key: string, value: any) => {
    setBookingForm(prev => ({ ...prev, [key]: value }));
  };

  const resetBooking = () => {
    setSelectedExp(null);
    setBookingForm({ date: "", slot: "", guests: 1 });
    setIsSubmitting(false);
  };

  const processPayment = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API Delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Transaction Encrypted & Sent:", data);
    return { success: true, txnId: `TXN-${Math.random().toString(36).toUpperCase().slice(2, 10)}` };
  };

  return { 
    selectedExp, setSelectedExp, 
    bookingForm, handleFormChange, 
    resetBooking, processPayment, isSubmitting 
  };
};