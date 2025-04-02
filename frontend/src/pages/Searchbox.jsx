import React, { useState } from 'react';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    
      <div className="w-[100%] max-w-[1200px] px-2 mx-auto ">
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex relative"
        >
          <input 
            type="text" 
            placeholder="Enter the location" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-10 bg-white rounded-full focus:outline-none text-lg "
          />
          
          <button 
            type="submit" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-yellow-400 transition-colors "
          >
            Search
          </button>
        </form>
      </div>

  );
};

export default SearchBox;