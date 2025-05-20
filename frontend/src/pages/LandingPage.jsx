import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBox from "./Searchbox";
import { useEffect } from "react";
import { useguesthouseStore } from "../store/guesthouseStore";
import { useUserStore } from "../store/userStore";

// Updated Travel Card Component with Images
const TravelCard = ({ location, country, price, nights, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <a href={`/destination/${location.toLowerCase().replace(/\s+/g, "-")}`}>
        <img
          src={image}
          alt={`${location}, ${country}`}
          className="w-full h-40 object-cover hover:opacity-90 transition-opacity"
        />
      </a>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">
          {location}, {country}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          From ${price} · {nights} nights
        </p>
        <button
          className="bg-[#555555] hover:bg-yellow-400 hover:text-[#333333] text-white px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() =>
            console.log(`View details clicked for ${location}, ${country}`)
          }
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// Travel Agent Card Component
const AgentCard = ({ name, role, image, email }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-center mb-3">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-800 text-center">{name}</h3>
      <p className="text-sm text-gray-600 mb-3 text-center">{role}</p>
      <div className="flex justify-center space-x-2">
        <button
          className="bg-[#555555] hover:bg-yellow-400 hover:text-[#333333] text-white px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => window.open(`mailto:${email}`)}
        >
          Contact
        </button>
        {/* <button
          className="bg-transparent hover:bg-yellow-400 hover:text-[#333333] border border-[#555555] text-[#555555] px-3 py-1 text-sm rounded transition-colors duration-200"
          onClick={() => console.log(`View profile clicked for ${name}`)}
        >
          View Profile
        </button> */}
      </div>
    </div>
  );
};

// Guesthouse Card Component
const GuesthouseCard = ({ name, location, price, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <a href={`/guesthouse/${name.toLowerCase().replace(/\s+/g, "-")}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover hover:opacity-90 transition-opacity"
        />
      </a>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{location}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-yellow-600">${price}/night</span>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, title, review }) => {
  return (
    <div className="bg-[#333333] text-white p-6 rounded-lg">
      <p className="text-sm text-gray-300 mb-2">{name}</p>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{review}</p>
    </div>
  );
};

// Feature Item Component
const FeatureItem = ({ title, description }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

function LandingPage() {
  const navigate = useNavigate();

  const { fetchGuesthouses, guesthouses } = useguesthouseStore();
  const { fetchUsers, users } = useUserStore();

  useEffect(() => {
    fetchGuesthouses();
    fetchUsers();
  }, [fetchGuesthouses, fetchUsers]);

  console.log(guesthouses);
  const agents = users.filter((user) => user.role === "travel agent");

  // Updated Destinations data with images
  const destinations = [
    {
      location: "Pokhara",
      country: "Nepal",
      price: "899",
      nights: "7",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      location: "Kathmandu",
      country: "Nepal",
      price: "799",
      nights: "5",
      image:
        "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      location: "Chitwan",
      country: "Nepal",
      price: "699",
      nights: "4",
      image:
        "https://cdn.kimkim.com/files/a/content_articles/featured_photos/539be48117e7eb2f74ba27da8f2f5add48787a19/medium-3045f129d612b5f415832b5958809be3.jpg",
    },
    {
      location: "Lumbini",
      country: "Nepal",
      price: "599",
      nights: "3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSZ-sTZ0TbKEcityxP1Z0tpOxzYqgwi7G4RQ&s",
    },
    {
      location: "Nagarkot",
      country: "Nepal",
      price: "499",
      nights: "2",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/87/5f/c3/caption.jpg?w=300&h=300&s=1",
    },
  ];

  // Features data
  const features = [
    {
      title: "Best Price Guarantee",
      description:
        "Find a lower price? We'll match it and give you an extra 10% off.",
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our travel experts are available around the clock to assist you.",
    },
    {
      title: "Flexible Booking Options",
      description: "Change or cancel your reservations with no hidden fees.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Prajen Shrestha",
      title: "Amazing Experience",
      review:
        "I've used many travel sites but EasyTrip offers the best combination of deals and user experiences.",
    },
    {
      name: "Aaishma Manandhar",
      title: "Excellent Service",
      review:
        "The customer support is exceptional. They helped me plan my entire trip to Pokhara with great recommendations.",
    },
    {
      name: "Rajesh Hamal",
      title: "Smooth Booking Process",
      review:
        "The booking process was seamless and I got great deals on both accommodation and transportation.",
    },
  ];

  // Travel agents data
  // const agents = [
  //   {
  //     name: "Lakpa Sherpa",
  //     role: "Trekking Expert",
  //     image: "https://randomuser.me/api/portraits/men/51.jpg",
  //   },
  //   {
  //     name: "Ramesh Poudel",
  //     role: "Trekking Expert",
  //     image: "https://randomuser.me/api/portraits/men/52.jpg",
  //   },
  //   {
  //     name: "Lesang Rai",
  //     role: "Trekking Expert",
  //     image: "https://randomuser.me/api/portraits/men/53.jpg",
  //   },
  //   {
  //     name: "Bishow Thapa",
  //     role: "Trekking Expert",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1665203644093-b3b8ebfa4cb3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwaGlraW5nfGVufDB8fDB8fHww",
  //   },
  //   {
  //     name: "Pemba Thapa",
  //     role: "Trekking Expert",
  //     image: "https://randomuser.me/api/portraits/men/55.jpg",
  //   },
  // ];

  // Guesthouses data
  // const guesthouses = [
  //   {
  //     name: "Mountain View Lodge",
  //     location: "Pokhara, Nepal",
  //     price: "30",
  //     image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   },
  //   {
  //     name: "Himalayan Horizon Lodge",
  //     location: "Nagarkot, Nepal",
  //     price: "40",
  //     image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   },
  //   {
  //     name: "Everest Base Guesthouse",
  //     location: "Lukla, Nepal",
  //     price: "55",
  //     image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   },
  //   {
  //     name: "Peaceful Stupa Retreat",
  //     location: "Lumbini, Nepal",
  //     price: "35",
  //     image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   },
  //   {
  //     name: "Thamel Travelers Inn",
  //     location: "Kathmandu, Nepal",
  //     price: "30",
  //     image: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //   }
  // ];

  return (
    <div
      className="font-sans min-h-screen w-full bg-gray-100 overflow-x-hidden"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase tracking-wider text-yellow-400">
            Explore with us
          </h1>
          <p className="text-lg md:text-xl mb-10 uppercase tracking-wide">
            Effortless travel and endless adventures
          </p>
          <p className="text-sm text-yellow-400">by EASYTRIP</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-20">
        {/* Why Choose EasyTrip Section - MOVED ABOVE DESTINATIONS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why Choose EasyTrip
          </h2>

          {/* First Feature Box with Image - CHANGED FROM BLUE TO WHITE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8">
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg h-[350px] border-l-4 border-yellow-400">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                EASYTRIP MAKES IT POSSIBLE
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-base text-gray-800">
                    Fast & Secure Booking
                  </h4>
                  <p className="text-sm">
                    Book with confidence using our secure payment system and
                    instant confirmation.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-base text-gray-800">
                    Exclusive Member Discounts
                  </h4>
                  <p className="text-sm">
                    Sign up today and unlock special savings on hotels, flights,
                    and more.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-base text-gray-800">
                    Eco-Friendly Travel
                  </h4>
                  <p className="text-sm">
                    Book with confidence knowing we partner with sustainable and
                    responsible travel providers.
                  </p>
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

          {/* Second Feature Box with Image - CHANGED FROM BLUE TO WHITE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="h-[350px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury villa"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg border-r-4 border-yellow-400">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                EASYTRIP MAKES IT POSSIBLE
              </h3>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index}>
                    <h4 className="font-bold text-base text-gray-800">
                      {feature.title}
                    </h4>
                    <p className="text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section - NOW AFTER WHY CHOOSE SECTION */}
        {/* <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Explore trending locations loved by our travelers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinations.map((dest, index) => (
              <TravelCard
                key={index}
                location={dest.location}
                country={dest.country}
                price={dest.price}
                nights={dest.nights}
                image={dest.image}
              />
            ))}
          </div>
          <div className="text-right mt-2">
            <button
              className="text-blue-600 hover:text-yellow-400 text-sm transition-colors duration-200"
              onClick={() => console.log("View all destinations clicked")}
            >
              View All »
            </button>
          </div>
        </section> */}

        {/* Travel Agents Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Our Travel Agents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {agents.map((agent, index) => (
              <AgentCard
                key={index}
                name={agent.name}
                role={agent.role}
                image={
                  agent.profileImage ||
                  "https://thumbs.dreamstime.com/b/travel-agent-design-vector-illustration-47489074.jpg"
                }
                email={agent.email}
              />
            ))}
          </div>
          <div className="text-right mt-2">
            {/* <button
              className="text-blue-600 hover:text-yellow-400 text-sm transition-colors duration-200"
              onClick={() => console.log("View all agents clicked")}
            >
              View All »
            </button> */}
          </div>
        </section>

        {/* Guesthouses Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Our Popular Guesthouses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {guesthouses.map((guesthouse, index) => (
              <GuesthouseCard
                key={index}
                name={guesthouse.name}
                location={guesthouse.location}
                price={guesthouse?.pricePerNight}
                image={guesthouse?.images[0]}
              />
            ))}
          </div>
          <div className="text-right mt-2">
            <button
              className="text-blue-600 hover:text-yellow-400 text-sm transition-colors duration-200"
              onClick={() => navigate("/results")}
            >
              View All »
            </button>
          </div>
        </section>

        {/* Testimonials Section  */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            What our Travelers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="bg-yellow-400 h-2"></div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {testimonial.name}
                  </p>
                  <h3 className="text-lg font-bold mb-3 text-gray-800">
                    {testimonial.title}
                  </h3>
                  <p className="text-sm text-gray-700">{testimonial.review}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 relative overflow-hidden rounded-lg shadow-xl text-center">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Mountain valley"
            className="absolute w-full h-full object-cover"
          />

          {/* Dark overlay with low opacity */}
          <div className="absolute inset-0 bg-black opacity-60"></div>

          {/* Content */}
          <div className="relative z-10 p-10 text-white">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase">
              Ready to start your journey?
            </h2>
            <p className="text-base mb-8">
              Join thousands of satisfied travelers who book with EasyTrip
              everyday
            </p>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-8 py-3 rounded-full transition-colors duration-200 text-base shadow-md"
              onClick={() => navigate("/signup")}
            >
              Sign Up Now
            </button>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#333333] text-white p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-6 px-35">
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">
                EasyTrip
              </h3>
              <p className="text-sm text-gray-300">
                Making travel planning simple and accessible for everyone in
                Nepal.
              </p>
            </div>

            <div>
              <h3 className="text-base text-yellow-400 font-bold mb-2">
                Quick Links
              </h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-yellow-400 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-yellow-400 transition-colors duration-200"
                  >
                    Guesthouses
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-yellow-400 transition-colors duration-200"
                  >
                    Bus Tickets
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm hover:text-yellow-400 transition-colors duration-200"
                  >
                    Travel Guides
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base text-yellow-400 font-bold mb-2">
                Contact Us
              </h3>
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
              <h3 className="text-base text-yellow-400 font-bold mb-2">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                    alt="Instagram"
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png"
                    alt="Twitter"
                    className="w-5 h-5"
                  />
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
