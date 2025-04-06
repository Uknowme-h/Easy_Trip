import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import MainDash from "./MainDash";
import TravelerPage from "./TravelerPage";
import TravelAgent from "./TravelAgent";
import BusOperatorPage from "./BusOperatorPage";
import GuesthousePage from "./GuesthousePage";

const AdminDashboard = () => {
  const { users, fetchUsers } = useUserStore();

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  console.log(users);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <MainDash users={users} />
          </>
        );

      case "agents":
        return (
          <>
            <TravelAgent users={users} />
          </>
        );

      case "operators":
        return (
          <div>
            <BusOperatorPage users={users} />
          </div>
        );

      case "travelers":
        return (
          <>
            {" "}
            <TravelerPage users={users} />;
          </>
        );

      case "guesthouse":
        return (
          <div>
            <GuesthousePage users={users} />
          </div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-green-100 p-4 relative">
        <h1 className="text-2xl font-bold text-green-700 mb-8">EasyTrip</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`block w-full text-left ${
                  activeTab === "dashboard"
                    ? "text-green-700 font-semibold"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("agents")}
                className={`block w-full text-left ${
                  activeTab === "agents"
                    ? "text-green-700 font-semibold"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Travel Agent
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("operators")}
                className={`block w-full text-left ${
                  activeTab === "operators"
                    ? "text-green-700 font-semibold"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Bus Operator
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("travelers")}
                className={`block w-full text-left ${
                  activeTab === "travelers"
                    ? "text-green-700 font-semibold"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Traveler
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("guesthouse")}
                className={`block w-full text-left ${
                  activeTab === "guesthouse"
                    ? "text-green-700 font-semibold"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                Guesthouse Owner
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <button className="p-2 bg-green-700 text-white rounded-full">
            <i className="fas fa-cog"></i>
          </button>
          <button className="p-2 bg-green-700 text-white rounded-full">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Welcome Admin!</h2>
          <div className="flex items-center space-x-4"></div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
