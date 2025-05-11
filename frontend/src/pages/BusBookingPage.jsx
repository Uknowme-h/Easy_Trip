import { useEffect, useState } from "react";
import {
  Clock,
  Calendar,
  Clock3,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Cast,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import useBusStore from "../store/busStore";
import useBusBookingStore from "../store/busbookingStore";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export default function BusSeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useAuthStore();

  // Get the busId from the URL params
  const [searchParams] = useSearchParams();
  const busId = searchParams.get("busid");

  const { fetchBusById, bus } = useBusStore();
  const {
    createBooking,
    fetchBookingsByBusId,
    bookings,
    createStripeCheckoutSession,
  } = useBusBookingStore();

  // Fetch bus details by ID
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        await fetchBusById(busId);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };
    const fetchBookingDetails = async () => {
      try {
        await fetchBookingsByBusId(busId);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
    fetchBusDetails();
  }, [busId, fetchBusById, fetchBookingsByBusId]);

  console.log("bookings", bookings);

  const seatPrice = bus?.pricePerSeat * 136 || 1200; // Use pricePerSeat from bus data
  const serviceFee = 50;

  // Define the exact seat layout from the image
  const getSeatLayout = () => {
    const seatLayout = [
      "A1",
      "B1",
      null,
      null,
      "C1",
      "D1",
      "A2",
      "B2",
      null,
      null,
      "C2",
      "D2",
      "A3",
      "B3",
      null,
      null,
      "C3",
      "D3",
      "A4",
      "B4",
      null,
      null,
      "C4",
      "D4",
      "A5",
      "B5",
      null,
      null,
      "C5",
      "D5",
      "A6",
      "B6",
      null,
      null,
      "C6",
      "D6",
      "A7",
      "B7",
      null,
      null,
      "C7",
      "D7",
      "A8",
      "B8",
      null,
      null,
      "C8",
      "D8",
      "A9",
      "B9",
      "E1",
      "F1",
      "C9",
      "D9",
    ];

    const bookedSeats = bookings.flatMap(
      (booking) => booking.seatNumbers || []
    );

    return seatLayout.map((seatId) => {
      if (!seatId) return { id: null, status: "empty" };

      let status = "available";
      if (bookedSeats.includes(seatId)) {
        status = "booked";
      } else if (selectedSeats.includes(seatId)) {
        status = "selected";
      }

      return {
        id: seatId,
        status,
      };
    });
  };

  const seats = getSeatLayout();
  const totalAmount = selectedSeats.length * seatPrice + serviceFee;

  const getSeatStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-400";
      case "booked":
        return "bg-red-500";
      case "selected":
        return "bg-yellow-400";
      default:
        return "bg-gray-200";
    }
  };

  const handleContinueToPayment = async () => {
    console.log("Proceeding to payment with details:", {
      fullName,
      phoneNumber,
      email,
      selectedSeats,
      totalAmount,
    });

    const bookingdata = {
      busId,
      userId: user._id,
      seatNumbers: selectedSeats,
      amount: totalAmount,
    };

    if (!fullName || !phoneNumber || !email) {
      toast.error("Please fill in all passenger information fields");
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    try {
      const url = await createStripeCheckoutSession(bookingdata);
      if (!url) {
        toast.error("Failed to create checkout session");
        return;
      }
      window.location.href = url;
      console.log("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Error creating booking");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-yellow-500 font-bold text-xl">EasyTrip</div>
          <nav className="flex space-x-8">
            <button className="hover:text-yellow-500">Guest Houses</button>
            <button className="hover:text-yellow-500">Bus Tickets</button>
            <button className="hover:text-yellow-500">Travel Guides</button>
            <button className="flex items-center space-x-1 bg-yellow-500 text-gray-800 px-3 py-1 rounded-full">
              <span>Bus Operator</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 divide-x">
          {/* L- Seat Selection */}
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Book Now!!</h1>

            <div className="mb-6">
              <h2 className="text-lg font-bold">{bus?.name || "Bus Name"}</h2>
              <p className="text-gray-600">
                {bus?.route?.source} to {bus?.route?.destination}
              </p>

              <div className="mt-4">
                <div className="text-xl font-bold">
                  NPR {seatPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Per seat</div>
              </div>

              <div className="flex space-x-8 mt-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-600" />
                  <span>
                    {new Date(bus?.departureTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                  <span>
                    {new Date(bus?.departureTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock3 className="w-5 h-5 mr-2 text-gray-600" />
                  <span>7 hours</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-3">Select seats</h3>
              <div className="flex space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-400 mr-2"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 mr-2"></div>
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
                  <span className="text-sm">Selected</span>
                </div>
              </div>

              {/* Seat Grid */}
              <div className="grid grid-cols-6 gap-2">
                {seats.map((seat, index) =>
                  seat.id ? (
                    <div
                      key={seat.id || index}
                      onClick={() => {
                        if (seat.status !== "booked") {
                          const seatId = seat.id;
                          setSelectedSeats((prev) =>
                            prev.includes(seatId)
                              ? prev.filter((id) => id !== seatId)
                              : [...prev, seatId]
                          );
                        }
                      }}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-medium ${getSeatStatusColor(
                        seat.status
                      )} rounded ${
                        seat.status !== "booked"
                          ? "cursor-pointer hover:opacity-80"
                          : "cursor-not-allowed"
                      }`}
                    >
                      {seat.id}
                    </div>
                  ) : (
                    <div key={`empty-${index}`} className="w-8 h-8"></div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6">Booking Summary</h2>

            <div className="mb-6">
              <p className="mb-2">Booked seats:</p>
              <div className="flex space-x-2">
                {selectedSeats.map((seat) => (
                  <div
                    key={seat}
                    className="w-8 h-8 flex items-center justify-center bg-yellow-400 rounded text-xs font-medium"
                  >
                    {seat}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-b py-4 space-y-3">
              <div className="flex justify-between">
                <span>Seat price ({selectedSeats.length}):</span>
                <span className="font-medium">
                  NPR {(selectedSeats.length * seatPrice).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee:</span>
                <span className="font-medium">
                  NPR {serviceFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>NPR {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold mb-4">Passenger Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-200"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-200"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleContinueToPayment}
                  className="w-full bg-[#333333] hover:bg-yellow-400 hover:text-[#333333] text-white py-3 rounded font-medium transition-colors duration-300"
                >
                  Continue To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 px-4">
          <div>
            <div className="text-yellow-500 font-bold text-lg mb-3">
              EasyTrip
            </div>
            <p className="text-gray-400 text-sm">
              Making travel planning simple and accessible for everyone in
              Nepal.
            </p>
          </div>

          <div>
            <h4 className="text-yellow-500 font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Guesthouses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Bus Tickets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Travel Guides
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-yellow-500 font-medium mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+977 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@easytrip.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Pokhara, Nepal</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-yellow-500 font-medium mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-yellow-500">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-yellow-500">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          <div className="flex items-center justify-center">
            <span>© EasyTrip Nepal 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
