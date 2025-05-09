import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [guesthouseData, setGuesthouseData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/booking/session/${sessionId}`
        );
        setSessionData(res.data);
        toast.success("Payment successful!");
      } catch (error) {
        console.error("Failed to fetch session:", error);
      }
    };

    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  useEffect(() => {
    const fetchGuesthouse = async () => {
      if (sessionData?.metadata?.guesthouseId) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/guesthouses/${sessionData.metadata.guesthouseId}`
          );
          setGuesthouseData(res.data);
        } catch (err) {
          console.error("Failed to fetch guesthouse:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGuesthouse();
  }, [sessionData]);

  if (loading)
    return (
      <div className="pt-20 text-center text-gray-500">
        Loading booking details...
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-green-50 pt-24 px-4 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-3xl">
        {guesthouseData?.images?.length > 0 && (
          <img
            src={guesthouseData.images[0]}
            alt={guesthouseData.name}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            🎉 Booking Confirmed!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your payment. Below are your booking details:
          </p>

          <div className="bg-gray-50 p-4 rounded-md shadow-inner mb-4 space-y-2">
            <p>
              <strong>Guesthouse:</strong> {guesthouseData?.name}
            </p>
            <p>
              <strong>Check-in:</strong> {sessionData?.metadata?.checkInDate}
            </p>
            <p>
              <strong>Check-out:</strong> {sessionData?.metadata?.checkOutDate}
            </p>
            <p>
              <strong>Total Paid:</strong> ${sessionData.amount_total / 100}
            </p>
          </div>

          {guesthouseData?.description && (
            <div className="text-gray-700 text-sm mb-4">
              <h2 className="font-semibold mb-1">About the Guesthouse</h2>
              <p>{guesthouseData.description}</p>
            </div>
          )}

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-full transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
