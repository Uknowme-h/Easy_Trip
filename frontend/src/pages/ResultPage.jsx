import React from "react";
import { useLocation } from "react-router-dom";
import SearchBox from "./Searchbox";

const ResultPage = () => {
  const location = useLocation();
  const { results, allGuesthouses } = location.state || {};

  const guesthousesToShow = results ?? allGuesthouses ?? [];

  return (
    <div className="min-h-screen bg-gray-100 pt-24 w-full">
      <div className="px-4 max-w-[1200px] mx-auto">
        <SearchBox />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {guesthousesToShow.length > 0
              ? "Search Results"
              : "No Guesthouses Found"}
          </h1>
          <button
            onClick={() => window.history.back()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
          >
            Go Back
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guesthousesToShow.length > 0 ? (
            guesthousesToShow.map((house, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300"
              >
                <img
                  src={house.image}
                  alt={house.guesthouse}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {house.guesthouse}
                  </h2>
                  <p className="text-gray-500">{house.location}</p>
                  <p className="text-yellow-600 font-bold mt-2">
                    ${house.price_per_night} / night
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full text-lg">
              Sorry, we couldn't find any guesthouses matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
