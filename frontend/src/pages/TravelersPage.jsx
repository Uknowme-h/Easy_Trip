import React, { useState } from 'react';

const TravelersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const travelers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', upcomingTrips: 2 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 891', upcomingTrips: 1 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 234 567 892', upcomingTrips: 3 }
  ];

  const filteredTravelers = travelers.filter(traveler => 
    traveler.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Travelers</h2>
      
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
            placeholder="Search by name"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTravelers.length > 0 ? (
          filteredTravelers.map(traveler => (
            <div key={traveler.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{traveler.name}</h3>
                  <p className="text-gray-600">Email: {traveler.email}</p>
                  <p className="text-gray-600">Phone: {traveler.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">Upcoming Trips: {traveler.upcomingTrips}</p>
                  <button className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No travelers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelersPage;