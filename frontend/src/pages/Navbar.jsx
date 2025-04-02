import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [navHeight, setNavHeight] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navRef = React.useRef(null);

  // Calculate navbar height on mount and window resize
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    // Set initial height
    updateNavHeight();

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateNavHeight);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavHeight);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 bg-[#333333] z-10 transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div
            className="text-xl font-bold text-yellow-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            EasyTrip
          </div>
          <div className="space-x-4 ">
            <button
              className="px-4 py-2 text-white  hover:text-yellow-400 transition-colors "
              onClick={() => navigate("/login")}
            >
              GuestHouses
            </button>
            <button
              className="px-4 py-2 text-white  rounded hover:text-yellow-400 transition-colors "
              onClick={() => navigate("/login")}
            >
              Bus Tickets
            </button>
            <button
              className="px-4 py-2 text-white  rounded hover:text-yellow-400 transition-colors "
              onClick={() => navigate("/login")}
            >
              Travel Guides
            </button>
            <button
              className="px-4 py-1 text-white border border-yellow-600 rounded hover:bg-yellow-600 transition-colors"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-1 text-black bg-yellow-400 rounded hover:bg-yellow-600 transition-colors"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer div that takes exactly as much space as the navbar */}
      <div style={{ height: `${navHeight}px` }} />
    </>
  );
};

export default Navbar;
