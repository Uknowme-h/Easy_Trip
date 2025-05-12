import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useBusBookingStore from "../store/busbookingStore";

const BusBooked = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchStripeSession } = useBusBookingStore();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await fetchStripeSession(sessionId);
        console.log("Stripe Session Response:", res);

        // Map the response to booking details
        const mappedDetails = {
          id: res.id,
          busName: res.metadata.busId, // Assuming busId represents the bus name
          seats: JSON.parse(res.metadata.seatNumbers),
          amount: res.amount_total,
        };

        setBookingDetails(mappedDetails);
      } catch (err) {
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchBookingDetails();
    } else {
      setError("Session ID not found in the URL.");
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full overflow-clip">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Booking Successful!
        </h1>
        {bookingDetails ? (
          <div className="space-y-4">
            <p className="text-gray-700 text-center">
              Thank you for booking with us!
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-800">
                <strong>Booking ID:</strong> {bookingDetails.id}
              </p>
              <p className="text-gray-800">
                <strong>Bus Id:</strong> {bookingDetails.busName}
              </p>
              <p className="text-gray-800">
                <strong>Seats:</strong> {bookingDetails.seats.join(", ")}
              </p>
              <p className="text-gray-800">
                <strong>Total Amount:</strong> $
                {(bookingDetails.amount / 100).toFixed(2)}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-center">
            Unable to retrieve booking details.
          </p>
        )}
      </div>
    </div>
  );
};

export default BusBooked;
