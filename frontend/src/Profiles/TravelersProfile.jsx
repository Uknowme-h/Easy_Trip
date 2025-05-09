import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const TravelersProfile = () => {
  const [bookings, setBookings] = useState([]);
  const { user, uploadFile } = useAuthStore();
  const { updateUser } = useUserStore();
  const userId = user?._id;

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadFile(userId, file);
        const imageUrl = response?.data;
        await updateUser(user._id, { profileImage: imageUrl });
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/booking/user/${userId}`
        );
        setBookings(response.data);
        console.log("Bookings:", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userId]);

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

        {/* Edit Profile Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-md p-2"
              defaultValue={user?.name || ""}
            />

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md p-2"
              defaultValue={user?.email || ""}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 md:col-span-2"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Travel History */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">My Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.length > 0 ? (
            bookings.map((trip, index) => {
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
                      <h3 className="text-md font-semibold">
                        {trip?.guesthouse.location}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formattedCheckInDate} - {formattedCheckOutDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Duration:{" "}
                      {Math.ceil(
                        (new Date(trip?.checkOutDate) -
                          new Date(trip?.checkInDate)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-yellow-500 font-bold"></span>
                      <button className="text-blue-600 text-sm hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelersProfile;
