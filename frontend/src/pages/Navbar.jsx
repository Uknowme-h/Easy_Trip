import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // Import authentication store
import { User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [navHeight, setNavHeight] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const { isAuthenticated, user, logout } = useAuthStore();
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
          <div className="space-x-4">
            <button
              className="px-4 py-2 text-white hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/guesthouse")}
            >
              GuestHouses
            </button>
            <button
              className="px-4 py-2 text-white rounded hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/guesthouses")}
            >
              Bus Tickets
            </button>
            <button
              className="px-4 py-2 text-white rounded hover:text-yellow-400 transition-colors"
              onClick={() => navigate("/login")}
            >
              Travel Guides
            </button>
            {isAuthenticated ? (
              <>
                <button
                  className="px-4 py-1 text-white border border-yellow-600 rounded hover:bg-yellow-600 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
                >
                  <User className="text-white text-2xl cursor-pointer inline" />
                  <span className="ml-2">{user?.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
                    <button
                      className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                      onClick={async () => {
                        await logout(); // Call logout function from auth store
                        setDropdownOpen(false); // Close dropdown
                        navigate("/login"); // Redirect to login after logout
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer div that takes exactly as much space as the navbar */}
      <div style={{ height: `${navHeight}px` }} />
    </>
  );
};

export default Navbar;
