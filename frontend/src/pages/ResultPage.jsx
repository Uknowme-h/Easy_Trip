import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBox from "./Searchbox";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import toast from "react-hot-toast";

const ResultPage = () => {
  const location = useLocation();
  const { results, allGuesthouses } = location.state || {};
  const { user, isAuthenticated } = useAuthStore();

  const [guesthousesToShow, setGuesthousesToShow] = useState([]);
  const [allGuesthousesState, setAllGuesthousesState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuesthouse, setSelectedGuesthouse] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Fetch all guesthouses on mount if not provided via location.state
  useEffect(() => {
    const fetchGuesthouses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/guesthouses");
        setAllGuesthousesState(res.data || []);
        setGuesthousesToShow(res.data || []);
      } catch (error) {
        toast.error("Failed to load guesthouses.");
      }
    };

    if (allGuesthouses) {
      setAllGuesthousesState(allGuesthouses);
      setGuesthousesToShow(allGuesthouses);
    } else {
      fetchGuesthouses();
    }
  }, [allGuesthouses]);

  // Show search results if present, else show all guesthouses
  useEffect(() => {
    if (results) {
      setGuesthousesToShow(results);
    } else if (allGuesthouses) {
      setGuesthousesToShow(allGuesthouses);
    }
  }, [results, allGuesthouses]);

  const openModal = (guesthouse) => {
    setSelectedGuesthouse(guesthouse);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGuesthouse(null);
    setCheckInDate("");
    setCheckOutDate("");
    setIsModalOpen(false);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate || !selectedGuesthouse) return;

    try {
      if (!isAuthenticated) {
        toast.error("Please log in to book a guesthouse.");
        return;
      }
      const res = await axios.post(
        "http://localhost:5000/api/booking/create-checkout-session",
        {
          guesthouseId: selectedGuesthouse._id,
          userId: user?._id,
          checkInDate,
          checkOutDate,
          guests: 1,
        }
      );
      window.location.href = res.data.url;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 w-full">
      <div className="px-4 max-w-[1200px] mx-auto">
        <SearchBox />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {guesthousesToShow?.length > 0
              ? "Search Results"
              : "No Guesthouses Found"}
          </h1>
          <button
            onClick={() => window.history.back()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
          >
            Go Back
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guesthousesToShow.length > 0 ? (
            guesthousesToShow.map((house, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
              >
                <img
                  src={house?.images}
                  alt={house?.guesthouse}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {house?.name}
                  </h2>
                  <p className="text-gray-500">{house?.location}</p>
                  <p className="text-gray-500">{house?.description}</p>
                  <div className="mt-2">
                    {house?.amenities?.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <p className="text-yellow-600 font-bold mt-2">
                    ${house?.pricePerNight} / night
                  </p>
                  <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
                    onClick={() => openModal(house)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full text-lg">
              Sorry, we couldn't find any guesthouses matching your search.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Book {selectedGuesthouse?.name}
            </h2>
            <form onSubmit={handleConfirmBooking}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
