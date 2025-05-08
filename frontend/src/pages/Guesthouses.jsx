import React, { useState } from 'react';
import Navbar from './Navbar';
import SearchBox from './Searchbox';

const guesthouses = [
  {
    id: 1,
    name: 'Mountain View Guesthouses',
    location: 'Lakeside, Pokhara',
    price: '$30 / night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  },
  {
    id: 2,
    name: 'Himalayan Horizon Lodge',
    location: 'Nagarkot, Nepal',
    price: '$40 / night',
    image: 'https://www.newconcept180.com/images/blog/deck-addition.png',
  },
  {
    id: 3,
    name: 'Everest Base Guesthouse',
    location: 'Lukla, Nepal',
    price: '$55 / night',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7c/11/39/blaauwheim-guest-house.jpg?w=900&h=500&s=1',
  },
];

const destinations = [
  {
    id: 1,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    id: 2,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    id: 3,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    id: 4,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    id: 5,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    id: 6,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    id: 7,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
  {
    id: 8,
    name: 'Pokhara',
    count: 134,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  },
];

const Guesthouses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuesthouses = guesthouses.filter((g) =>
    g.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero/Search Section */}
      <section className="w-full flex justify-center items-center" style={{background: 'linear-gradient(90deg, #d3d3d3 0%, #bdbdbd 100%)'}}>
        <div className="w-full max-w-3xl py-12 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Find your Perfect Guesthouses</h1>
          <p className="text-gray-600 mb-8 text-lg">Discover comfortable stays at amazing prices</p>
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <SearchBox />
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Guesthouses */}
      <section className="max-w-6xl mx-auto w-full px-4 mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recommended Guesthouses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredGuesthouses.map((g) => (
            <div key={g.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img src={g.image} alt={g.name} className="h-48 w-full object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{g.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">{g.location}</p>
                  <p className="text-yellow-600 font-semibold text-base mb-2">{g.price}</p>
                </div>
                <button className="mt-2 bg-[#333333] text-white px-4 py-2 rounded font-medium text-sm hover:bg-yellow-400 hover:text-[#333333] transition-colors">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-6xl mx-auto w-full px-4 mt-14 mb-24">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <div key={d.id} className="relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img src={d.image} alt={d.name} className="h-32 w-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-[#333333] bg-opacity-90 px-3 py-2 flex flex-col">
                <span className="text-white font-semibold text-base">{d.name}</span>
                <span className="text-gray-200 text-xs">{d.count} guesthouses</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section (copied from LandingPage) */}
      <footer className="bg-[#333333] text-white p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-6 px-35">
            <div>
              <h3 className="text-x text-yellow-400 font-bold mb-2">EasyTrip</h3>
              <p className="text-sm">Making travel planning simple and accessible for everyone in Nepal.</p>
            </div>
            <div>
              <h3 className="text-x text-yellow-400 font-bold mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li><a href="#" className="text-sm hover:text-yellow-400 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-sm hover:text-yellow-400 transition-colors duration-200">Guesthouses</a></li>
                <li><a href="#" className="text-sm hover:text-yellow-400 transition-colors duration-200">Bus Tickets</a></li>
                <li><a href="#" className="text-sm hover:text-yellow-400 transition-colors duration-200">Travel Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-x text-yellow-400 font-bold mb-2">Contact Us</h3>
              <ul className="space-y-1">
                <li className="text-sm flex items-center"><span className="mr-2">📞</span> +977 1234567890</li>
                <li className="text-sm flex items-center"><span className="mr-2">✉️</span> info@easytrip.com</li>
                <li className="text-sm flex items-center"><span className="mr-2">📍</span> Pokhara, Nepal</li>
              </ul>
            </div>
            <div>
              <h3 className="text-x text-yellow-400 font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="Facebook" className="w-5 h-5" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-5 h-5" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" alt="Twitter" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white-700 pt-4 text-center text-sm">
            <span>© EasyTrip Nepal · 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Guesthouses;