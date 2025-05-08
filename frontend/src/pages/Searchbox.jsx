import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useguesthouseStore } from "../store/guesthouseStore";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const { guesthouses, fetchGuesthouses } = useguesthouseStore();
  console.log(guesthouses);

  useEffect(() => {
    fetchGuesthouses();
  }, [fetchGuesthouses]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();

    const filtered = query
      ? guesthouses.filter((house) =>
          house?.location.toLowerCase().includes(query)
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
