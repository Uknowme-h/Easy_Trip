import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [guesthouses, setGuesthouses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const data = [
      {
        guesthouse: "Himalayan Horizon Lodge",
        location: "Nagarkot, Nepal",
        price_per_night: 40.0,
        image: "https://www.newconcept180.com/images/blog/deck-addition.png",
      },
      {
        guesthouse: "Peaceful Stupa Retreat",
        location: "Lumbini, Nepal",
        price_per_night: 35.0,
        image:
          "https://www.phgmag.com/wp-content/uploads/2020/07/PHG0820Art01Roberts01.jpg",
      },
      {
        guesthouse: "Thamel Travelers Inn",
        location: "Kathmandu, Nepal",
        price_per_night: 30.0,
        image: "https://www.newconcept180.com/images/blog/deck-addition.png",
      },
      {
        guesthouse: "Pokhara Lakeview Lodge",
        location: "Pokhara, Nepal",
        price_per_night: 50.0,
        image:
          "https://www.eyrc.com/hubfs/Imported_Blog_Media/modern-guest-house-eyrc-architects-ridge-mountain-exterior-Jan-15-2025-04-26-35-6959-PM.jpg",
      },
      {
        guesthouse: "Everest Base Guesthouse",
        location: "Lukla, Nepal",
        price_per_night: 55.0,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7c/11/39/blaauwheim-guest-house.jpg?w=900&h=500&s=1",
      },
      {
        guesthouse: "Chitwan Jungle Stay",
        location: "Chitwan, Nepal",
        price_per_night: 45.0,
        image:
          "https://www.phgmag.com/wp-content/uploads/2020/07/PHG0820Art01Roberts01.jpg",
      },
      {
        guesthouse: "Boudha Peace Inn",
        location: "Boudhanath, Kathmandu, Nepal",
        price_per_night: 38.0,
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7c/11/39/blaauwheim-guest-house.jpg?w=900&h=500&s=1",
      },
      {
        guesthouse: "Bhaktapur Heritage Home",
        location: "Bhaktapur, Nepal",
        price_per_night: 42.0,
        image: "https://www.newconcept180.com/images/blog/deck-addition.png",
      },
      {
        guesthouse: "Namche Viewpoint Lodge",
        location: "Namche Bazaar, Nepal",
        price_per_night: 60.0,
        image:
          "https://www.thespruce.com/thmb/3Frlwy-FIUGoExByZe44xX5yen0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/DanGordon-b6c4da288da14e29bab5aaf42f5af4b6.jpg",
      },
      {
        guesthouse: "Patan Durbar Guesthouse",
        location: "Patan, Nepal",
        price_per_night: 33.0,
        image:
          "https://www.phgmag.com/wp-content/uploads/2020/07/PHG0820Art01Roberts01.jpg",
      },
      {
        guesthouse: "Bandipur Hilltop Homestay",
        location: "Bandipur, Nepal",
        price_per_night: 37.0,
        image:
          "https://www.thespruce.com/thmb/3Frlwy-FIUGoExByZe44xX5yen0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/DanGordon-b6c4da288da14e29bab5aaf42f5af4b6.jpg",
      },
      {
        guesthouse: "Tansen Town Lodge",
        location: "Tansen, Palpa, Nepal",
        price_per_night: 28.0,
        image: "https://www.newconcept180.com/images/blog/deck-addition.png",
      },
      {
        guesthouse: "Janakpur Dham Resthouse",
        location: "Janakpur, Nepal",
        price_per_night: 30.0,
        image:
          "https://cdn.homedsgn.com/wp-content/uploads/2017/12/Mountain-Guest-House-by-Dom-Arquitectura-decpr.jpg",
      },
      {
        guesthouse: "Dhulikhel Sunrise Inn",
        location: "Dhulikhel, Nepal",
        price_per_night: 40.0,
        image:
          "https://www.phgmag.com/wp-content/uploads/2020/07/PHG0820Art01Roberts01.jpg",
      },
      {
        guesthouse: "Ilam Tea Garden Retreat",
        location: "Ilam, Nepal",
        price_per_night: 36.0,
        image: "https://www.newconcept180.com/images/blog/deck-addition.png",
      },
    ];

    setGuesthouses(data);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();

    const filtered = query
      ? guesthouses.filter((house) =>
          house.location.toLowerCase().includes(query)
        )
      : guesthouses; // If query is empty, return all

    navigate("/results", {
      state: { results: filtered, allGuesthouses: guesthouses },
    });
  };

  return (
    <div className="w-full max-w-[1200px] px-2 mx-auto relative z-50">
      <form onSubmit={handleSearchSubmit} className="flex relative">
        <input
          type="text"
          placeholder="Enter the location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-10 bg-white rounded-full focus:outline-none text-lg"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-yellow-400 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
