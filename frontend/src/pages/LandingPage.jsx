import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="font-sans min-h-screen w-full bg-gray-50">
      <Navbar />
      <div className="p-20 ">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to EasyTrip
        </h1>
        <p className="text-xl text-gray-600">Enjoy exploring this page.</p>
      </div>
    </div>
  );
}

export default LandingPage;
