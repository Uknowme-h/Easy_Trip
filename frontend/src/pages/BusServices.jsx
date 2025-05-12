import { useState, useEffect } from "react";
import useBusStore from "../store/busStore";
import { useNavigate } from "react-router-dom";

const BusServices = () => {
  const { fetchAllBuses, buses } = useBusStore();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [filteredBuses, setFilteredBuses] = useState([]);

  // Fetch all buses on component mount
  useEffect(() => {
    fetchAllBuses();
  }, [fetchAllBuses]);

  console.log("Buses:", buses);

  // Update filtered buses whenever buses or searchParams change
  useEffect(() => {
    const filterBuses = () => {
      const filtered = buses.filter((bus) => {
        const matchesFrom = searchParams.from
          ? bus.route.source
              .toLowerCase()
              .includes(searchParams.from.toLowerCase())
          : true;
        const matchesTo = searchParams.to
          ? bus.route.destination
              .toLowerCase()
              .includes(searchParams.to.toLowerCase())
          : true;
        const matchesDate = searchParams.date
          ? new Date(bus.departureTime).toISOString().split("T")[0] ===
            searchParams.date
          : true;

        return matchesFrom && matchesTo && matchesDate;
      });

      setFilteredBuses(filtered);
    };

    filterBuses();
  }, [buses, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-scroll-x mt-16 w-full">
      <div className="container mx-auto px-4 py-8">
        {/* Search Box */}
        <h1 className="text-3xl font-bold mb-4">Bus Services</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="from"
              placeholder="Departure City"
              value={searchParams.from}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <input
              type="text"
              name="to"
              placeholder="Arrival City"
              value={searchParams.to}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              onClick={() => setSearchParams({ from: "", to: "", date: "" })}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Available Buses */}
        <h2 className="text-2xl font-semibold mb-4">Available Buses</h2>
        <div className="space-y-4">
          {filteredBuses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{bus?.name}</h3>
                <p className="text-gray-600">
                  Bus Number: {bus.busNumber} · {bus.totalSeats} Seats
                </p>
                <p className="text-gray-600">
                  {bus.route.source} → {bus.route.destination}
                </p>
                <p className="text-gray-600">
                  Date: {new Date(bus.departureTime).toLocaleDateString()}
                </p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Departure</p>
                <p>{new Date(bus.departureTime).toLocaleTimeString()}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Arrival</p>
                <p>{new Date(bus.arrivalTime).toLocaleTimeString()}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Price</p>
                <p>${bus.pricePerSeat}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  // Handle booking logic here
                  navigate(`/busbooking?busid=${bus._id}`);
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusServices;
