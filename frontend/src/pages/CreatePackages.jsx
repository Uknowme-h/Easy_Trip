import { useState } from 'react';

export default function CreatePackageForm() {
  const [formData, setFormData] = useState({
    packageName: '',
    duration: '',
    startDay: '',
    endDay: '',
    packageDescription: '',
    regions: '',
    bestSeason: '',
    featuredImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    // In a real app, this would handle file uploads
    console.log("Image selected:", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to an API
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-500">EasyTrip</div>
        <div className="flex items-center text-sm text-gray-300">
          <div className="mr-2 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-white text-xs">👤</span>
          </div>
          <div>
            <div className="text-gray-300">Agent</div>
            <div className="text-gray-400 text-xs">agent@easytrip.com</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create new Package</h1>
        
        <hr className="border-gray-300 mb-6" />
        
        <form onSubmit={handleSubmit}>
          {/* Package Details */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-gray-800">Packages Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Packages Name</label>
                <input
                  type="text"
                  name="packageName"
                  placeholder="e.g. Everest Base Camp"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                  value={formData.packageName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g. 14 Days"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Day</label>
                <input
                  type="text"
                  name="startDay"
                  placeholder="e.g. March 1"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                  value={formData.startDay}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Day</label>
                <input
                  type="text"
                  name="endDay"
                  placeholder="e.g. March 15"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                  value={formData.endDay}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Package Description</label>
              <textarea
                name="packageDescription"
                placeholder="Describe the package, highlights and what travelers expect..."
                className="w-full p-2 bg-gray-200 border border-gray-300 rounded h-32"
                value={formData.packageDescription}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          
          {/* Location & Details */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-gray-800">Location & Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regions</label>
                <input
                  type="text"
                  name="regions"
                  placeholder="e.g. Everest Base Camp"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                  value={formData.regions}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="locationDuration"
                  placeholder="e.g. 14 Days"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best Season</label>
                <input
                  type="text"
                  name="bestSeason"
                  placeholder="e.g. March 1"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                  value={formData.bestSeason}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Day</label>
                <input
                  type="text"
                  name="locationEndDay"
                  placeholder="e.g. March 15"
                  className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
          
          {/* Featured Images */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4 text-gray-800">Featured Images</h2>
            
            <div className="border border-gray-300 rounded bg-gray-200 p-4 text-center mb-4">
              <div className="flex justify-end mb-2">
                <button type="button" className="text-purple-500 hover:text-purple-700">✕</button>
              </div>
              
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-gray-300 border border-gray-400 rounded flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Upload a high quality image that showcases the trek.</p>
                <h3 className="font-medium mt-2">Upload Featured Image</h3>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => document.getElementById('fileInput').click()}
              >
                Upload Image
              </button>
              <input 
                id="fileInput" 
                type="file" 
                className="hidden" 
                onChange={handleImageUpload}
                accept="image/*"
              />
              
              <button 
                type="submit" 
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Create Package
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}