import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";

// Travel Card Component
const TravelCard = ({ location, country, price, nights }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="font-bold">{location}, {country}</h3>
        <p className="text-sm mb-2">From ${price} · {nights} nights</p>
        <button 
          className="bg-[#333333] hover:bg-black text-white px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => console.log(`View details clicked for ${location}, ${country}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Travel Agent Card Component
const AgentCard = ({ name, role }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
          <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      <h3 className="font-bold text-center">{name}</h3>
      <p className="text-sm mb-3 text-center">{role}</p>
      <div className="flex justify-center space-x-2">
        <button 
          className="bg-[#333333] hover:bg-black text-white px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => console.log(`Contact clicked for ${name}`)}
        >
          Contact
        </button>
        <button 
          className="bg-transparent hover:bg-gray-100 border border-[#333333] text-[#333333] px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => console.log(`View profile clicked for ${name}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

// Guesthouse Card Component
const GuesthouseCard = ({ name, location, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        alt={name} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-sm mb-3">{location}</p>
        <div className="flex justify-between items-center">
          <button 
            className="bg-[#333333] hover:bg-black text-white px-3 py-1 text-sm rounded transition-colors duration-200"
            onClick={() => console.log(`Book Now clicked for ${name}`)}
          >
            Book Now
          </button>
          <span className="text-sm">${price}/night</span>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, title, review }) => {
  return (
    <div className="bg-[#333333] text-white p-6 rounded-lg">
      <p className="text-sm mb-2">{name}</p>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm">{review}</p>
    </div>
  );
};

// Feature Item Component
const FeatureItem = ({ title, description }) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

function LandingPage() {
  const navigate = useNavigate();
  
  // Destinations data
  const destinations = [
    { location: 'Lakeside', country: 'Pokhara', price: '899', nights: '7' },
    { location: 'Lakeside', country: 'Pokhara', price: '899', nights: '7' },
    { location: 'Lakeside', country: 'Pokhara', price: '899', nights: '7' },
    { location: 'Lakeside', country: 'Pokhara', price: '899', nights: '7' },
    { location: 'Lakeside', country: 'Pokhara', price: '899', nights: '7' }
  ];

  // Features data
  const features = [
    {
      title: 'Best Price Guarantee',
      description: 'Find a lower price? We\'ll match it and give you an extra 10% off.'
    },
    {
      title: '24/7 Customer Support',
      description: 'Our travel experts are available around the clock to assist you.'
    },
    {
      title: 'Flexible Booking Options',
      description: 'Change or cancel your reservations with no hidden fees.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Prajen Shrestha',
      title: 'Amazing, Experience',
      review: 'I\'ve used many travel site but the EasyTrip offers the best combination of deals and user experiences.'
    },
    {
      name: 'Prajen Shrestha',
      title: 'Amazing, Experience',
      review: 'I\'ve used many travel site but the EasyTrip offers the best combination of deals and user experiences.'
    },
    {
      name: 'Prajen Shrestha',
      title: 'Amazing, Experience',
      review: 'I\'ve used many travel site but the EasyTrip offers the best combination of deals and user experiences.'
    }
  ];

  // Travel agents data
  const agents = [
    { name: 'Lakpa Sherpa', role: 'Trekking Expert' },
    { name: 'Lakpa Sherpa', role: 'Trekking Expert' },
    { name: 'Lakpa Sherpa', role: 'Trekking Expert' },
    { name: 'Lakpa Sherpa', role: 'Trekking Expert' },
    { name: 'Lakpa Sherpa', role: 'Trekking Expert' }
  ];

  // Guesthouses data
  const guesthouses = [
    { name: 'Mountain view Lodge', location: 'Pokhara, Nepal', price: '30' },
    { name: 'Mountain view Lodge', location: 'Pokhara, Nepal', price: '30' },
    { name: 'Mountain view Lodge', location: 'Pokhara, Nepal', price: '30' },
    { name: 'Mountain view Lodge', location: 'Pokhara, Nepal', price: '30' },
    { name: 'Mountain view Lodge', location: 'Pokhara, Nepal', price: '30' }
  ];

  return (
    <div className="font-sans min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <Navbar />
      
    {/* Hero Image with Search Box */}
      <div className="relative w-full h-[600px] overflow-hidden">
     {/* Search box positioned above the hero image content */}
       <div className="absolute top-1/9 left-0 right-0 z-10 flex justify-center">
          <div className="w-full max-w-md">
           <SearchBox />
          </div>
        </div>
        <img 
          src="https://wallpaperaccess.com/full/1812893.jpg" 
          alt="Mountain landscape" 
          className="absolute w-full h-full object-cover"
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase tracking-wider text-yellow-400">Explore with us</h1>
          <p className="text-lg md:text-xl mb-10 uppercase tracking-wide">Effortless travel and endless adventures</p>
          <p className="text-sm text-yellow-400">by EASYTRIP</p>
          
        
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20">
        {/* Destinations Section */}
        <section className="mb-16">
          <h2 className="text-xl font-medium text-center mb-8">Explore trending locations loved by our travelers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinations.map((dest, index) => (
              <TravelCard 
                key={index}
                location={dest.location}
                country={dest.country}
                price={dest.price}
                nights={dest.nights}
              />
            ))}
          </div>
          <div className="text-right mt-2">
            <button 
              className="text-blue-600 hover:text-gray-800 text-sm"
              onClick={() => console.log("View all destinations clicked")}
            >
              View All »
            </button>
          </div>
        </section>

        {/* Travel Agents Section */}
        <section className="mb-16">
          <h2 className="text-xl font-medium text-center mb-8">Our Travel Agents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {agents.map((agent, index) => (
              <AgentCard 
                key={index}
                name={agent.name}
                role={agent.role}
              />
            ))}
          </div>
          <div className="text-right mt-2">
            <button 
              className="text-blue-600 hover:text-gray-800 text-sm"
              onClick={() => console.log("View all agents clicked")}
            >
              View All »
            </button>
          </div>
        </section>

        {/* Guesthouses Section */}
        <section className="mb-16">
          <h2 className="text-xl font-medium text-center mb-8">Our Popular Guesthouses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {guesthouses.map((guesthouse, index) => (
              <GuesthouseCard 
                key={index}
                name={guesthouse.name}
                location={guesthouse.location}
                price={guesthouse.price}
              />
            ))}
          </div>
          <div className="text-right mt-2">
            <button 
              className="text-blue-600 hover:text-gray-800 text-sm"
              onClick={() => console.log("View all guesthouses clicked")}
            >
              View All »
            </button>
          </div>
        </section>

        {/* Why Choose EasyTrip Section */}
        <section className="mb-16">
          <h2 className="text-xl font-medium text-center mb-8">Why Choose EasyTrip</h2>
          
          {/* First Feature Box with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8">
            <div className="bg-[#333333] text-white p-8 rounded-lg h-[350px]">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">EASYTRIP MAKES IT POSSIBLE</h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold">Fast & Secure Booking</h4>
                  <p className="text-sm">Book with confidence using our secure payment system and instant confirmation.</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Exclusive Member Discounts</h4>
                  <p className="text-sm">Sign up today and unlock special savings on hotels, flights, and more.</p>
                </div>
                
                <div>
                  <h4 className="font-bold">Eco-Friendly Travel</h4>
                  <p className="text-sm">Book with confidence knowing we partner with sustainable and responsible travel providers.</p>
                </div>
              </div>
            </div>
            
            <div className="h-[350px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury accommodation" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Second Feature Box with Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="h-[350px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury villa" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            <div className="bg-[#333333] text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">EASYTRIP MAKES IT POSSIBLE</h3>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index}>
                    <h4 className="font-bold">{feature.title}</h4>
                    <p className="text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-xl font-medium text-center mb-8">What our Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 border border-blue-200 rounded-lg overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                title={testimonial.title}
                review={testimonial.review}
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 bg-[#333333] text-white p-8 rounded-lg text-center">
          <h2 className="text-xl text-yellow-400 font-bold mb-4 uppercase">Ready to start your journey?</h2>
          <p className="mb-6">Join thousands of satisfied travelers who book with easy trip everyday</p>
          <button 
            className="bg-yellow-400 hover:bg-yellow-500 text-[#333333] font-bold px-6 py-2 rounded-full transition-colors duration-200"
            onClick={() => navigate("/signup")}
          >
            SignUp Now
          </button>
        </section>
      </div>

      {/* Footer Section */}
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
                <li className="text-sm flex items-center">
                  <span className="mr-2">📞</span> +977 1234567890
                </li>
                <li className="text-sm flex items-center">
                  <span className="mr-2">✉️</span> info@easytrip.com
                </li>
                <li className="text-sm flex items-center">
                  <span className="mr-2">📍</span> Pokhara, Nepal
                </li>
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
}

export default LandingPage;