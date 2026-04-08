import { useState, useCallback, useMemo } from 'react';

// Define a strict interface for better IDE autocompletion
interface BookingForm {
  date: string;
  slot: string;
  guests: number;
}

export const useBooking = () => {
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    date: "",
    slot: "",
    guests: 1
  });

  // --- Helpers ---

  // Standardize form updates
  const handleFormChange = useCallback((key: keyof BookingForm, value: any) => {
    setError(null); // Clear errors when user types
    setBookingForm(prev => ({ ...prev, [key]: value }));
  }, []);

  // Memoized total calculation (prevents unnecessary re-renders)
  const bookingSummary = useMemo(() => {
    if (!selectedExp) return { base: 0, total: 0 };
    const base = selectedExp.price * bookingForm.guests;
    const tax = base * 0.12; // 12% Regulatory Tax
    return {
      base,
      tax,
      total: base + tax
    };
  }, [selectedExp, bookingForm.guests]);

  // Validation Logic
  const validateForm = () => {
    if (!bookingForm.date) return "Selection of date is required.";
    if (!bookingForm.slot) return "Please select an arrival slot.";
    if (bookingForm.guests < 1) return "Guest count must be at least 1.";
    return null;
  };

  const resetBooking = useCallback(() => {
    setSelectedExp(null);
    setBookingForm({ date: "", slot: "", guests: 1 });
    setIsSubmitting(false);
    setError(null);
  }, []);

  // --- Core Action ---

  const confirmReservation = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return { success: false, error: validationError };
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API Handshake
      await new Promise(resolve => setTimeout(resolve, 1800));

      const payload = {
        experienceId: selectedExp.id,
        ...bookingForm,
        amount: bookingSummary.total,
        currency: "INR",
        timestamp: new Date().toISOString()
      };

      console.log("🔒 Transaction Encrypted:", payload);
      
      return { 
        success: true, 
        txnId: `RES-${Math.random().toString(36).toUpperCase().slice(2, 9)}` 
      };
    } catch (err) {
      setError("System handshake failed. Please retry.");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    selectedExp, 
    setSelectedExp, 
    bookingForm, 
    handleFormChange, 
    resetBooking, 
    confirmReservation, 
    isSubmitting,
    error,
    summary: bookingSummary
  };
};