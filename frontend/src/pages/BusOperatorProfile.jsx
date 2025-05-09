import { User, Bus, Edit, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import Navbar from './Navbar';

const BusOperatorProfile = () => {
  const profileData = {
    companyName: 'Mountain Express Pvt. Ltd.',
    registrationNumber: '12345-NPL-2025',
    email: 'info@mountainexpress.com',
    phone: '+977-1-4567890',
    address: 'Kalanki, Kathmandu, Nepal',
    operatingSince: '2015',
    profileImage: 'https://thacoauto.vn/storage/xe-bus-giuong-nam-thaco-resize.jpg',
    rating: 4.8,
    totalReviews: 120,
    routes: [
      { from: 'Kathmandu', to: 'Pokhara', price: 1200 },
      { from: 'Kathmandu', to: 'Chitwan', price: 800 },
      { from: 'Pokhara', to: 'Lumbini', price: 1000 }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Navbar />
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
              <h1 className="text-3xl font-bold text-gray-800">{profileData.companyName}</h1>
              <p className="text-gray-600 mt-1">Operating since {profileData.operatingSince}</p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-gray-600 ml-2">{profileData.rating} ({profileData.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Company Information</h2>
                <button className="flex items-center text-[#333333] hover:text-yellow-400 transition-colors duration-300">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Registration Number</p>
                    <p className="text-gray-800 font-medium">{profileData.registrationNumber}</p>
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
                    <p className="text-sm text-gray-500 mb-1">Operating Since</p>
                    <p className="text-gray-800 font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {profileData.operatingSince}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Routes */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Routes</h2>
              <div className="space-y-4">
                {profileData.routes.map((route, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{route.from} → {route.to}</p>
                      <p className="text-sm text-gray-600">Daily departures</p>
                    </div>
                    <span className="text-yellow-600 font-bold">NPR {route.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bus Profile */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bus Profile</h2>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img
                  src="https://thacoauto.vn/storage/xe-bus-giuong-nam-thaco-resize.jpg"
                  alt="Deluxe Bus"
                  className="w-full md:w-64 h-40 object-cover rounded-lg shadow"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Deluxe Express</h3>
                  <p className="text-gray-600 mb-1">Type: AC Deluxe</p>
                  <p className="text-gray-600 mb-1">Seat Capacity: 35</p>
                  <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                    <li>Free WiFi</li>
                    <li>Reclining Seats</li>
                    <li>Onboard Snacks</li>
                    <li>Charging Ports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-[#333333] hover:bg-yellow-400 hover:text-[#333333] text-white font-medium rounded transition-colors duration-300">
                  <Bus className="w-5 h-5 mr-2" />
                  Manage Buses
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-[#333333] hover:bg-yellow-400 hover:text-[#333333] text-white font-medium rounded transition-colors duration-300">
                  <User className="w-5 h-5 mr-2" />
                  View Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusOperatorProfile;