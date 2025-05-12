import { User, Bus, Edit, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import useBusOperatorStore from "../store/busopStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useBusStore from "../store/busStore";
import useBusBookingStore from "../store/busbookingStore";

const AddBusServiceModal = ({ isOpen, onClose, onSave, busData }) => {
  const { createBus, updateBus, fetchBusesByOperator } = useBusStore();

  const [formData, setFormData] = useState({
    busName: "",
    busNumber: "",
    totalSeats: "",
    pricePerSeat: "",
    routeSource: "",
    routeDestination: "",
    routeStops: "",
    routeDistance: "",
    departureTime: "",
    arrivalTime: "",
  });

  useEffect(() => {
    if (busData) {
      setFormData({
        busName: busData.name || "",
        busNumber: busData.busNumber || "",
        totalSeats: busData.totalSeats || "",
        pricePerSeat: busData.pricePerSeat || "",
        routeSource: busData.route?.source || "",
        routeDestination: busData.route?.destination || "",
        routeStops: busData.route?.stops?.join(", ") || "",
        routeDistance: busData.route?.distance || "",
        departureTime: busData.departureTime
          ? new Date(busData.departureTime).toISOString().slice(0, 16)
          : "",
        arrivalTime: busData.arrivalTime
          ? new Date(busData.arrivalTime).toISOString().slice(0, 16)
          : "",
      });
    } else {
      setFormData({
        busName: "",
        busNumber: "",
        totalSeats: "",
        pricePerSeat: "",
        routeSource: "",
        routeDestination: "",
        routeStops: "",
        routeDistance: "",
        departureTime: "",
        arrivalTime: "",
      });
    }
  }, [busData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      route: {
        source: formData.routeSource,
        destination: formData.routeDestination,
        stops: formData.routeStops.split(",").map((stop) => stop.trim()),
        distance: parseFloat(formData.routeDistance),
      },
      departureTime: new Date(formData.departureTime),
      arrivalTime: new Date(formData.arrivalTime),
    };

    try {
      if (busData?._id) {
        await updateBus(busData._id, formattedData);
        toast.success("Bus service updated successfully");
      } else {
        await createBus(formattedData);
        toast.success("Bus service added successfully");
      }
      onSave(formattedData);
      onClose();
    } catch (error) {
      toast.error("Failed to save bus service");
      console.error("Error saving bus service:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-2xl bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">
          {busData ? "Edit Bus Service" : "Add Bus Service"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Bus Name</label>
              <input
                type="text"
                name="busName"
                value={formData.busName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Bus Number
              </label>
              <input
                type="text"
                name="busNumber"
                value={formData.busNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Total Seats
              </label>
              <input
                type="number"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Price Per Seat
              </label>
              <input
                type="number"
                name="pricePerSeat"
                value={formData.pricePerSeat}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Route Source
              </label>
              <input
                type="text"
                name="routeSource"
                value={formData.routeSource}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Route Destination
              </label>
              <input
                type="text"
                name="routeDestination"
                value={formData.routeDestination}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Route Stops (comma-separated)
              </label>
              <input
                type="text"
                name="routeStops"
                value={formData.routeStops}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Route Distance
              </label>
              <input
                type="number"
                name="routeDistance"
                value={formData.routeDistance}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Departure Time
              </label>
              <input
                type="datetime-local"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Arrival Time
              </label>
              <input
                type="datetime-local"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AllBookingsModal = ({ isOpen, onClose, operatorId }) => {
  const { fetchBookingsByOperator, bookings } = useBusBookingStore();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        await fetchBookingsByOperator(operatorId);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    if (isOpen) {
      fetchBookings();
    }
  }, [fetchBookingsByOperator, operatorId, isOpen]);

  console.log(bookings);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-2xl bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">All Bookings</h2>
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left border border-gray-200">
                  Booking ID
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  User
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Bus
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Seats
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Total Amount
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Booking Time
                </th>
                <th className="px-4 py-2 text-left border border-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings?.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="px-4 py-2 border border-gray-200">
                      {booking._id}
                    </td>
                    <td className="px-4 py-2 border overflow-hidden truncate max-w-xs border-gray-200">
                      {booking?.user || "N/A"}
                    </td>
                    <td className="px-4 py-2 border truncate max-w-xs overflow-hidden border-gray-200">
                      {booking?.bus || "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {booking.seatNumbers.join(", ")}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      ${booking.totalAmount}
                    </td>
                    <td className="px-4 py-2 border border-gray-200">
                      {new Date(booking.bookingTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border border-gray-200 capitalize">
                      {booking.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const EditProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  const [formData, setFormData] = useState(profileData);

  useEffect(() => {
    setFormData(profileData);
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-2xl bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              License Number
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BusOperatorProfile = () => {
  const { user } = useAuthStore();
  const { fetchBusesByOperator, buses, deleteBus } = useBusStore();
  const { fetchBusOperatorById, updateBusOperator, busOperator } =
    useBusOperatorStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);

  const fetchoperator = async () => {
    try {
      await fetchBusOperatorById(user?._id);
    } catch (error) {
      console.error("Error fetching bus operator:", error);
    }
  };

  useEffect(() => {
    fetchoperator();
  }, [user._id]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        await fetchBusesByOperator();
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };
    fetchBuses();
  }, [fetchBusesByOperator]);

  const handleSaveBus = async (busData) => {
    try {
      console.log("Bus Data Saved:", busData);
      await fetchBusesByOperator(); // Refresh the bus list
    } catch (error) {
      console.error("Error saving bus data:", error);
    }
  };
  const handleSave = async (updatedData) => {
    try {
      await updateBusOperator(busOperator?._id, updatedData);
      toast.success("Profile updated successfully");
      fetchoperator(); // Refresh the profile data
    } catch (error) {
      console.error("Error updating bus operator:", error);
      toast.error("Failed to update profile");
    }
  };

  const profileData = {
    companyName: busOperator?.companyName || "",
    licenseNumber: busOperator?.licenseNumber || "",
    email: busOperator?.user?.email || "",
    phone: busOperator?.contactNumber || "",
    address: busOperator?.address || "",
    operatingSince: "2015",
    profileImage:
      busOperator?.user?.profileImage ||
      "https://thacoauto.vn/storage/xe-bus-giuong-nam-thaco-resize.jpg",
    rating: 4.8,
    totalReviews: 120,
    routes: [
      { from: "Kathmandu", to: "Pokhara", price: 1200 },
      { from: "Kathmandu", to: "Chitwan", price: 800 },
      { from: "Pokhara", to: "Lumbini", price: 1000 },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen w-full mt-16 overflow-x-scroll bg-white">
      <div className="w-full px-4 py-8 flex-1">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 w-full max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src={profileData.profileImage}
                alt="Company Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">
                {profileData.companyName}
              </h1>
              <p className="text-gray-600 mt-1">
                Operating since {profileData.operatingSince}
              </p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {profileData.rating} ({profileData.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column - Quick Actions */}

        {/* Main Content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Company Information
                </h2>
                <button
                  className="flex items-center text-[#333333] hover:text-yellow-400 transition-colors duration-300"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Registration Number
                    </p>
                    <p className="text-gray-800 font-medium">
                      <Bus className="w-4 h-4 mr-2 text-gray-500" />

                      {profileData.licenseNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-gray-800 font-medium flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {profileData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="text-gray-800 font-medium flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      {profileData.phone}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-gray-800 font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {profileData.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Operating Since
                    </p>
                    <p className="text-gray-800 font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {profileData.operatingSince}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Quick Actions
              </h2>
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
                onClick={() => {
                  setIsAddBusModalOpen(true);
                  setSelectedBus(null); // Clear selected bus for adding new
                }}
              >
                Add New Bus Service
              </button>

              <button
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                onClick={() => {
                  setIsBookingsModalOpen(true);
                  console.log("View all bookings");
                }}
              >
                View All Bookings
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Support</h2>
              <p className="text-gray-600 mb-4">Need help? Our support team is available 24/7</p>
              <button className="w-full flex items-center justify-center px-4 py-2 bg-[#333333] hover:bg-yellow-400 hover:text-[#333333] text-white font-medium rounded transition-colors duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-8 flex-1">
        {/* Buses List */}
        <div className="w-full px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Buses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <div
                key={bus?._id}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {bus?.busName}
                </h3>
                <p className="text-gray-600 mb-1">
                  Bus Number: {bus?.busNumber}
                </p>
                <p className="text-gray-600 mb-1">
                  Total Seats: {bus?.totalSeats}
                </p>
                <p className="text-gray-600 mb-1">
                  Price Per Seat: ${bus?.pricePerSeat}
                </p>
                <p className="text-gray-600 mb-1">
                  Route: {bus?.route?.source} → {bus?.route?.destination}
                </p>
                <p className="text-gray-600 mb-1">
                  Stops: {bus?.route?.stops?.join(", ") || "None"}
                </p>
                <p className="text-gray-600 mb-1">
                  Distance: {bus?.route?.distance} km
                </p>
                <p className="text-gray-600 mb-1">
                  Departure: {new Date(bus?.departureTime).toLocaleString()}
                </p>
                <p className="text-gray-600 mb-1">
                  Arrival: {new Date(bus?.arrivalTime).toLocaleString()}
                </p>
                <div className="flex justify-between w-full mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      setIsAddBusModalOpen(true);
                      setSelectedBus(bus); // Set the selected bus for editing
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    onClick={async () => {
                      try {
                        await deleteBus(bus?._id);
                        toast.success("Bus deleted successfully");
                        fetchBusesByOperator(); // Refresh the bus list
                      } catch (error) {
                        toast.error("Failed to delete bus");
                        console.error("Error deleting bus:", error);
                      }

                      console.log("Delete bus:", bus);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Bookings Modal */}
      <AllBookingsModal
        isOpen={isBookingsModalOpen} // Replace with your state to control modal visibility
        onClose={() => {
          setIsBookingsModalOpen(false);
          console.log("Close all bookings modal");
        }}
        operatorId={busOperator?._id}
      />

      {/* Add/Edit Bus Service Modal */}
      <AddBusServiceModal
        isOpen={isAddBusModalOpen}
        onClose={() => {
          setIsAddBusModalOpen(false);
          setSelectedBus(null); // Clear the selected bus after closing
        }}
        onSave={handleSaveBus}
        busData={selectedBus} // Pass the selected bus data for editing
      />
      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onSave={handleSave}
      />
    </div>
  );
};

export default BusOperatorProfile;
