import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import useBookingStore from "../store/bookingStore";
import toast from "react-hot-toast";
import useBusBookingStore from "../store/busbookingStore";
import useBusStore from "../store/busStore";

const TravelersProfile = () => {
  const { user, uploadFile } = useAuthStore();
  const { updateUser } = useUserStore();
  const userId = user?._id;

  const { getUserBookings, userBookings, cancelBooking } = useBookingStore();
  const { fetchBookingsByUserId, bookings: busbookings } = useBusBookingStore();
  const { fetchBusById } = useBusStore();

  const [busDetailsMap, setBusDetailsMap] = useState({});

  // Fetch guesthouse bookings
  useEffect(() => {
    getUserBookings(userId).catch((err) =>
      console.error("Error fetching guesthouse bookings:", err)
    );
  }, [userId]);

  // Fetch bus bookings
  useEffect(() => {
    fetchBookingsByUserId(userId).catch((err) =>
      console.error("Error fetching bus bookings:", err)
    );
  }, [userId]);

  // Fetch bus details for each busBooking
  useEffect(() => {
    const fetchDetails = async () => {
      const map = {};
      for (const booking of busbookings) {
        const busId = booking.bus;
        if (busId && !map[busId]) {
          const response = await fetchBusById(busId);
          if (response) map[busId] = response;
        }
      }
      setBusDetailsMap(map);
    };

    if (busbookings.length > 0) {
      fetchDetails();
    }
  }, [busbookings]);

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadFile(userId, file);
        const imageUrl = response?.data;
        await updateUser(user._id, { profileImage: imageUrl });
        toast.success("Profile image updated successfully");
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    }
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (confirmCancel) {
      try {
        await cancelBooking(bookingId);
        await getUserBookings(userId);
        toast.success("Booking cancelled successfully");
      } catch (error) {
        console.error("Error canceling booking:", error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center">
          <div className="relative">
            <img
              src={user?.profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>
          <h2 className="mt-4 text-lg font-semibold">{user?.name}</h2>
          <p className="text-gray-500">{user?.bio || "Travel Enthusiast"}</p>
          <div className="mt-4 flex space-x-4">
            <div className="text-center">
              <p className="text-lg font-bold">{user?.trips || 0}</p>
              <p className="text-gray-500 text-sm">Trips</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{user?.countries || 0}</p>
              <p className="text-gray-500 text-sm">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{user?.reviews || 0}</p>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-md p-2 block"
              defaultValue={user?.name || ""}
              disabled
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md p-2"
              defaultValue={user?.email || ""}
              disabled
            />
          </form>
        </div>
      </div>

      {/* Guesthouse Bookings */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">My Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBookings.length > 0 ? (
            userBookings.map((trip, index) => {
              const formattedCheckInDate = new Date(
                trip?.checkInDate
              ).toLocaleDateString();
              const formattedCheckOutDate = new Date(
                trip?.checkOutDate
              ).toLocaleDateString();
              return (
                <div
                  key={index}
                  className="bg-white rounded-md shadow-md overflow-hidden"
                >
                  <img
                    src={
                      trip?.guesthouse.images[0] ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={trip?.guesthouse.location}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-md font-semibold">
                        {trip?.guesthouse.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formattedCheckInDate} - {formattedCheckOutDate}
                      </span>
                    </div>
                    <h4 className="text-md font-semibold">
                      Location: {trip?.guesthouse.location}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Duration:{" "}
                      {Math.ceil(
                        (new Date(trip?.checkOutDate) -
                          new Date(trip?.checkInDate)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </p>
                    <p className="text-sm text-gray-500">
                      Total Price: ${trip?.totalPrice}
                    </p>
                    <p className="text-sm text-gray-500">
                      Booking Status:{" "}
                      {trip?.status === "confirmed" ? (
                        <span className="text-green-600">Confirmed</span>
                      ) : trip?.status === "pending" ? (
                        <span className="text-yellow-600">Pending</span>
                      ) : (
                        <span className="text-red-600">Cancelled</span>
                      )}
                    </p>
                    {trip?.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancelBooking(trip?._id)}
                        className="mt-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>

      {/* Bus Bookings with Bus Details */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">My Bus Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {busbookings.length > 0 ? (
            busbookings.map((booking, index) => {
              const bus = busDetailsMap[booking.bus];
              const formattedBookingTime = new Date(
                booking.bookingTime
              ).toLocaleString();

              return (
                <div key={index} className="bg-white rounded-md shadow-md p-4">
                  <h3 className="text-md font-semibold mb-1">
                    Booking ID: {booking._id}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Booking Time: {formattedBookingTime}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Seats: {booking.seatNumbers.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Total Amount: ${booking.totalAmount}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Status:{" "}
                    {booking.status === "confirmed" ? (
                      <span className="text-green-600 font-semibold">
                        Confirmed
                      </span>
                    ) : booking.status === "pending" ? (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Cancelled
                      </span>
                    )}
                  </p>

                  {bus && (
                    <div className="mt-4 text-sm text-gray-700">
                      <p>
                        <strong>Bus Name:</strong> {bus.name}
                      </p>
                      <p>
                        <strong>Bus Number:</strong> {bus.busNumber}
                      </p>
                      <p>
                        <strong>Route:</strong> {bus.route.source} to{" "}
                        {bus.route.destination}
                      </p>
                      <p>
                        <strong>Departure:</strong>{" "}
                        {new Date(bus.departureTime).toLocaleString()}
                      </p>
                      <p>
                        <strong>Arrival:</strong>{" "}
                        {new Date(bus.arrivalTime).toLocaleString()}
                      </p>
                      <p>
                        <strong>Company:</strong> {bus.operator?.companyName}
                      </p>
                      <p>
                        <strong>Contact:</strong> {bus.operator?.contactNumber}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No bus bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelersProfile;
