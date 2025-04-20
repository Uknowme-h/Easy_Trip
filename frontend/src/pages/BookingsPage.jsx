import React, { useState } from 'react';

const BookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const bookings = [
    { id: 1, destination: 'Everest Base Camp', date: 'April 22, 2025', travelers: 8, price: '$12.00', status: 'Confirmed' },
    { id: 2, destination: 'Annapurna Circuit', date: 'May 15, 2025', travelers: 6, price: '$15.00', status: 'Pending' },
    { id: 3, destination: 'Langtang Valley', date: 'June 10, 2025', travelers: 4, price: '$10.00', status: 'Confirmed' }
  ];

  const filteredBookings = bookings.filter(booking => 
    booking.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Bookings</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by destination"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{booking.destination}</h3>
                  <p className="text-gray-600">Date: {booking.date}</p>
                  <p className="text-gray-600">Travelers: {booking.travelers}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{booking.price}</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                  <button className="mt-2 ml-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No bookings found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage; 