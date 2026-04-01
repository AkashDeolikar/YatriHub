import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HotelDetails from "../features/hotels/pages/HotelDetails";

import HotelList from "../features/hotels/pages/HotelList";
import BookingPage from "../features/booking/pages/BookingPage";
import DiningPage from "../features/dining/pages/DiningPage";
import CabBookingPage from "../features/cab/pages/CabBookingPage";
import PaymentPage from "../features/payments/pages/PaymentPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/cab" element={<CabBookingPage />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
