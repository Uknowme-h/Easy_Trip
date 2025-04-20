import { useState } from 'react';
import BookingsPage from './BookingsPage';
import TravelersPage from './TravelersPage';
import CreatePackagesPage from './CreatePackagesPage';

const TravelAgentDashBoard = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const upcomingDepartures = [
    { id: 1, destination: 'Everest Base Camp', date: 'April 22, 2025', travelers: 8, price: '$12.00' },
    { id: 2, destination: 'Everest Base Camp', date: 'April 23, 2025', travelers: 8, price: '$12.00' },
    { id: 3, destination: 'Everest Base Camp', date: 'April 24, 2025', travelers: 8, price: '$12.00' }
  ];

  const availableGuides = [
    { id: 1, name: 'Raj Sharma', experience: 'Experienced · 120+ treks' },
    { id: 2, name: 'Rajesh Bhandari', experience: 'Experienced · 120+ treks' },
    { id: 3, name: 'Sadhikshya Nepal', experience: 'Experienced · 120+ treks' }
  ];

  const trekImages = [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    'https://images.unsplash.com/photo-1551632811-561732d1e306',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa',
    'https://images.unsplash.com/photo-1551632811-561732d1e306',
    'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa'
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Bookings':
        return <BookingsPage />;
      case 'Travelers':
        return <TravelersPage />;
      case 'CreatePackage':
        return <CreatePackagesPage />;
      default:
        return (
          <div className="max-w-4xl mx-auto">
            {/* Stats */}
            <div className="flex gap-6 mb-8">
              <div className="bg-gray-100 p-4 rounded shadow-sm flex-1">
                <div className="text-gray-600 font-medium">Total Travelers</div>
                <div className="text-gray-800 text-lg font-semibold">18</div>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow-sm flex-1">
                <div className="text-gray-600 font-medium">Total Bookings</div>
                <div className="text-gray-800 text-lg font-semibold">18</div>
              </div>
            </div>

            {/* Upcoming Departures */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Upcoming Departures</h2>
              <div className="mb-2">
                {upcomingDepartures.map(departure => (
                  <div key={departure.id} className="flex bg-gray-100 rounded mb-2 text-gray-800 transition-all duration-300 transform hover:scale-102 hover:bg-gray-200 hover:shadow-sm">
                    <div className="p-2 w-48">{departure.destination}</div>
                    <div className="p-2 w-32">{departure.date}</div>
                    <div className="p-2 w-24">{departure.travelers} Travelers</div>
                    <div className="p-2 w-20">{departure.price}</div>
                    <div className="flex ml-auto">
                      <button className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-gray-800 text-white px-4 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 hover:shadow-md">
                View All Departures
              </button>
            </div>

            {/* Available Guides */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Available Guides</h2>
              <div className="mb-2">
                {availableGuides.map(guide => (
                  <div key={guide.id} className="flex bg-gray-100 rounded mb-2 text-gray-800 transition-all duration-300 transform hover:scale-102 hover:bg-gray-200 hover:shadow-sm">
                    <div className="p-2 flex items-center">
                      <div className="bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">👤</div>
                      <span>{guide.name}</span>
                    </div>
                    <div className="p-2 ml-4 flex-grow">{guide.experience}</div>
                    <div className="flex ml-auto">
                      <button className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-gray-800 text-white px-4 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 hover:shadow-md">
                View All Guides
              </button>
            </div>

            {/* Trek Availability */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Trek Availability</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="w-40 h-32 bg-gray-100 rounded overflow-hidden flex-shrink-0 shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                    <img 
                      src={trekImages[item - 1]} 
                      alt="Mountain trek" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
              <button 
                onClick={() => setActiveTab('CreatePackage')}
                className="bg-gray-800 text-white px-4 py-1 rounded text-sm transition-all duration-300 transform hover:scale-105 hover:bg-gray-700 hover:shadow-md"
              >
                Create Packages
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-yellow-500">EasyTrip</div>
        <div className="flex space-x-6">
          <div className="text-gray-200">GuestHouses</div>
          <div className="text-gray-200">Bus Tickets</div>
          <div className="text-gray-200">Travel Guides</div>
        </div>
        <div className="flex space-x-2">
          <button className="border border-gray-800 text-gray-800 px-4 py-1 rounded hover:bg-gray-100 transition-colors duration-300">Login</button>
          <button className="bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700 transition-colors duration-300">Signup</button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 max-w-4xl mx-auto">
          {['Home', 'Travelers', 'Bookings'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 text-center transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab ? 'text-yellow-500 border-b-2 border-yellow-500 font-medium' : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default TravelAgentDashBoard;