import { useState } from 'react';
import { Calendar, Clock, Bus, CheckCircle, PhoneCall, Tag } from 'lucide-react';

const BusTicket = () => {
  const [fromCity, setFromCity] = useState('Kathmandu');
  const [toCity, setToCity] = useState('Pokhara');
  const [date, setDate] = useState('');
  const [priceRange, setPriceRange] = useState(2000);
  
  const busOptions = [
    {
      id: 1,
      name: 'Mountain Express Deluxe',
      route: 'Kathmandu to Pokhara',
      departure: '7:00 AM',
      duration: '6 hrs',
      seats: 28,
      price: 1200,
      type: 'Deluxe'
    },
    {
      id: 2,
      name: 'Tourist Special',
      route: 'Kathmandu to Pokhara',
      departure: '8:30 AM',
      duration: '6.5 hrs',
      seats: 15,
      price: 1500,
      type: 'Tourist Bus'
    },
    {
      id: 3,
      name: 'Super Deluxe Night',
      route: 'Kathmandu to Pokhara',
      departure: '8:00 PM',
      duration: '7 hrs',
      seats: 22,
      price: 1800,
      type: 'Super Deluxe'
    }
  ];

  return (
    <div className="relative w-full font-sans">
      {/* Hero Background Image */}
      <div className="w-full h-72 bg-gray-800 bg-opacity-80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900 opacity-80"></div>
      </div>

      {/* Search Form */}
      <div className="absolute top-20 left-0 right-0 mx-auto w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Search Bus Tickets</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">From</label>
              <select 
                className="w-full border border-gray-300 rounded p-2"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
              >
                <option value="Kathmandu">Kathmandu</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Chitwan">Chitwan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">To</label>
              <select 
                className="w-full border border-gray-300 rounded p-2"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
              >
                <option value="Pokhara">Pokhara</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Chitwan">Chitwan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className="w-full border border-gray-300 rounded p-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <Calendar className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="bg-[#333333] hover:bg-yellow-400 hover:text-[#333333] text-white font-medium py-2 px-6 rounded transition-colors duration-300">
              Search Buses
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-36 pb-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
          {/* Filters Section */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Bus Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="deluxe" className="mr-2" />
                    <label htmlFor="deluxe" className="text-gray-700">Deluxe</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="superDeluxe" className="mr-2" />
                    <label htmlFor="superDeluxe" className="text-gray-700">Super Deluxe</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="tourist" className="mr-2" />
                    <label htmlFor="tourist" className="text-gray-700">Tourist Bus</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Departure Time</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="morning" className="mr-2" />
                    <label htmlFor="morning" className="text-gray-700">Morning (6AM - 12PM)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="afternoon" className="mr-2" />
                    <label htmlFor="afternoon" className="text-gray-700">Afternoon (12PM - 6PM)</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="night" className="mr-2" />
                    <label htmlFor="night" className="text-gray-700">Night (After 6PM)</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>NPR 500</span>
                  <span>NPR 5000</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bus Listings */}
          <div className="col-span-3">
            <div className="space-y-4">
              {busOptions.map(bus => (
                <div key={bus.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <div className="mr-4 text-[#333333]">
                        <Bus size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{bus.name}</h3>
                        <p className="text-gray-600 text-sm">{bus.route}</p>
                        
                        <div className="grid grid-cols-3 gap-8 mt-4">
                          <div>
                            <p className="text-xs text-gray-500">Departure</p>
                            <p className="font-medium">{bus.departure}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="font-medium">{bus.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Available Seats</p>
                            <p className="font-medium">{bus.seats}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-yellow-600">NPR {bus.price.toLocaleString()}</p>
                      <button className="mt-2 bg-[#333333] hover:bg-yellow-400 hover:text-[#333333] text-white font-medium py-1.5 px-4 rounded text-sm transition-colors duration-300">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Why Book With Us */}
        <div className="max-w-6xl mx-auto mt-16 mb-32">
          <h2 className="text-2xl font-bold text-center mb-10">Why Book With Us</h2>
          
          <div className="grid grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Calendar className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="font-medium mb-1">Secure Booking</h3>
              <p className="text-sm text-gray-600">Safe and secure payment options</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <PhoneCall className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="font-medium mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round the clock customer service</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Bus className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="font-medium mb-1">Instant Tickets</h3>
              <p className="text-sm text-gray-600">Get your e-tickets instantly</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Tag className="text-blue-500 w-6 h-6" />
              </div>
              <h3 className="font-medium mb-1">Best Prices</h3>
              <p className="text-sm text-gray-600">Guaranteed best fare</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTicket;