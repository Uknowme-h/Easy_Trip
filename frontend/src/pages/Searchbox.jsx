import React, { useState } from 'react';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full flex justify-center mb-8 px-4 mt-8">
      <div className="w-[900px]">
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex"
        >
          <input 
            type="text" 
            placeholder="Where do you want to go?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button 
            type="submit" 
            className="bg-green-600 text-white px-7 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;