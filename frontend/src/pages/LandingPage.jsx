import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

// Travel Card Component
const TravelCard = ({ location, country, price, nights }) => {
  return (
    <div className="bg-[#e2eec9] p-4 rounded-lg">
      <h3 className="font-bold">{location}, {country}</h3>
      <p className="text-sm mb-2">From ${price} · {nights} nights</p>
      <button 
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded transition-colors duration-200"
        onClick={() => console.log(`View details clicked for ${location}, ${country}`)}
      >
        View Details
      </button>
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

// Testimonial Card Component
const TestimonialCard = ({ name, title, review }) => {
  return (
    <div className="bg-[#e2eec9] p-4 rounded-lg">
      <p className="text-sm mb-2">{name}</p>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm">{review}</p>
    </div>
  );
};

// Travel Agent Card Component
const AgentCard = ({ name, role, imgUrl }) => {
  return (
    <div className="bg-[#e2eec9] p-4 rounded-lg text-center">
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
          <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm mb-3">{role}</p>
      <div className="flex justify-center space-x-2">
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => console.log(`Contact clicked for ${name}, ${role}`)}
        >
          Contact
        </button>
        <button 
          className="bg-transparent hover:bg-green-100 border border-green-600 text-green-600 px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => console.log(`View profile clicked for ${name}, ${role}`)}
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
    <div className="bg-[#e2eec9] p-4 rounded-lg">
      <h3 className="font-bold mb-1 mt-30">{name}</h3>
      <p className="text-sm mb-3">{location}</p>
      <div className="flex justify-between items-center">
        <button 
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => console.log(`Book Now clicked for ${name} in ${location}`)}
        >
          Book Now
        </button>
        <span className="text-sm">${price}/night</span>
      </div>
    </div>
  );
};

function LandingPage() {
  const navigate = useNavigate();
  
  // Destinations data
  const destinations = [
    { location: 'Lakeside', country: 'Pokhara', price: '899', nights: '7' },
    { location: 'Paris', country: 'France', price: '1,099', nights: '5' },
    { location: 'Tokyo', country: 'Japan', price: '1,289', nights: '6' },
    { location: 'New York', country: 'USA', price: '1,199', nights: '4' }
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
      review: 'I\'ve used many travel site but the EasyTrip offers the best combination of deals and experience.'
    },
    {
      name: 'Prajen Shrestha',
      title: 'Amazing, Experience',
      review: 'I\'ve used many travel site but the EasyTrip offers the best combination of deals and experience.'
    },
    {
      name: 'Prajen Shrestha',
      title: 'Amazing, Experience',
      review: 'I\'ve used many travel site but the EasyTrip offers the best combination of deals and experience.'
    }
  ];

  // Travel agents data
  const agents = [
    { name: 'Lakpa Sherpa', role: 'Trekking Expert' },
    { name: 'Nema Rai', role: 'Adventure Guide' },
    { name: 'Santosh Basnet', role: 'Cultural Expert' },
    { name: 'Bijay Tamang', role: 'Mountain Guide' }
  ];

  // Guesthouses data
  const guesthouses = [
    { name: 'Mountain view Lodge', location: 'Pokhara, Nepal', price: '30' },
    { name: 'Lakeside Heaven', location: 'Pokhara, Nepal', price: '30' },
    { name: 'Himalayan Rest', location: 'Pokhara, Nepal', price: '30' },
    { name: 'Pokhara Lodge', location: 'Pokhara, Nepal', price: '30' }
  ];

  return (
    <div className="font-sans min-h-screen w-full bg-gray-50 overflow-x-hidden"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0cmF2ZWx8ZW58MHx8MHx8fDA%3D')", // Ensure the correct path
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "scroll",
      //minHeight: "100vh",
      height: "25vh",
      // width: "100%"

    }}
    
    >
      <Navbar />
      
      {/* Welcome Section */}
      <div className="p-6 md:p-12 lg:p-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to EasyTrip
        </h1>
        <p className="text-xl text-gray-600 mb-6">Enjoy exploring this page.</p>
        <button onClick={() => {
          console.log("clicked!");
        }}></button>

        <div className="max-w-6xl mx-auto">
          {/* Destinations Section */}
          <h2 className="text-2xl font-bold text-center mt-120">Explore trending locations loved by our travelers</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-30 mt-14">
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
          
          {/* Features Section */}
          <div className="bg-[#e2eec9] p-6 rounded-lg mt-13 mb-12">
            <h2 className="text-center font-bold text-2xl mb-10">Why Choose EasyTrip</h2>
            
            <div className="max-w-lg mx-auto">
              {features.map((feature, index) => (
                <FeatureItem 
                  key={index}
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <h2 className="text-2xl font-bold text-center my-8 mt-28">What our Travelers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                title={testimonial.title}
                review={testimonial.review}
              />
            ))}
          </div>

          {/* Travel Agents Section */}
          <h2 className="text-2xl font-bold text-center my-8 mt-28">Our Travel Agents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {agents.map((agent, index) => (
              <AgentCard 
                key={index}
                name={agent.name}
                role={agent.role}
              />
            ))}
          </div>

          {/* Guesthouses Section */}
          <h2 className="text-2xl font-bold text-center my-8 mt-28">Our Popular Guesthouses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {guesthouses.map((guesthouse, index) => (
              <GuesthouseCard 
                key={index}
                name={guesthouse.name}
                location={guesthouse.location}
                price={guesthouse.price}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-[#e2eec9] p-8 rounded-lg text-center mb-12 mt-28">
            <h2 className="text-2xl font-bold mb-4">Ready to start your journey?</h2>
            <p className="mb-6">Join thousands of satisfied travelers who book with easy trip everyday</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            onClick={() => navigate("/signup")}>SignUp Now</button>
             
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-green-800 text-white p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EasyTrip</h3>
            <p className="text-sm">Making travel planning simple and accessible for everyone in Nepal.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-green-500 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-green-500 transition-colors duration-200">Guesthouses</a></li>
              <li><a href="#" className="text-sm hover:text-green-500 transition-colors duration-200">Bus Tickets</a></li>
              <li><a href="#" className="text-sm hover:text-green-500 transition-colors duration-200">Travel Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
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
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl">Facebook</a>
              <a href="#" className="text-2xl">Insta</a>
              <a href="#" className="text-2xl">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-sm">
          &copy; 2025 EasyTrip. All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;