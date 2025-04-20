import { useState } from 'react';

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for bookings
  const bookings = [
    { id: 1, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 2, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 3, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 4, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 5, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 6, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 7, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 8, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 9, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
    { id: 10, guest: 'Bhawana Thapa', email: 'vawana@gmail.com', checkIn: 'April 22, 2025', checkOut: 'April 29, 2025', location: 'North ABC', status: 'Confirmed' },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Searching for:", e.target.value);
    // In a real app, you would filter bookings based on search query
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-500">EasyTrip</div>
        <div className="flex items-center text-sm text-gray-300">
          <div className="mr-2 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
          <div>
            <div className="text-gray-300">Agent</div>
            <div className="text-gray-400 text-xs">agent@easytrip.com</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Bookings</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or destination"
              className="pl-10 p-2 w-full bg-gray-200 border border-gray-300 rounded"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="overflow-hidden rounded-lg">
          {/* Table Header */}
          <div className="bg-gray-200 grid grid-cols-5 p-3 text-gray-800 font-medium">
            <div className="px-2">Guest</div>
            <div className="px-2">Check In</div>
            <div className="px-2">Check Out</div>
            <div className="px-2">Check Out</div>
            <div className="px-2">Status</div>
          </div>
          
          {/* Table Body */}
          <div>
            {bookings.map((booking) => (
              <div key={booking.id} className="grid grid-cols-5 p-3 bg-gray-200 border-t border-gray-300">
                <div className="px-2 flex items-center">
                  <div className="mr-2 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-xs">👤</span>
                  </div>
                  <div>
                    <div className="text-gray-800">{booking.guest}</div>
                    <div className="text-gray-500 text-sm">{booking.email}</div>
                  </div>
                </div>
                <div className="px-2 flex items-center">{booking.checkIn}</div>
                <div className="px-2 flex items-center">{booking.checkOut}</div>
                <div className="px-2 flex items-center">{booking.location}</div>
                <div className="px-2 flex items-center">
                  <span className="text-green-600">{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Back Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}