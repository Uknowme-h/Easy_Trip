import { useAuthStore } from "../store/authStore";

const MainDash = ({ users }) => {
  const { user } = useAuthStore();
  return (
    <main className="flex-1 bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Welcome Admin!</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.name}</span>
          <span className="text-gray-600">{user?.email}</span>
        </div>
      </header>

      <section>
        <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <div className="text-2xl mb-2">
              <i className="fas fa-bus"></i>
            </div>
            <h4 className="font-semibold">Bus Operators</h4>
            <p className="text-gray-600">
              {users.filter((user) => user.role === "bus operator").length}{" "}
              active operators
            </p>
            <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded">
              View
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <div className="text-2xl mb-2">
              <i className="fas fa-user-tie"></i>
            </div>
            <h4 className="font-semibold">Travel Agents</h4>
            <p className="text-gray-600">
              {users.filter((user) => user.role === "travel agent").length}{" "}
              verified agents
            </p>
            <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded">
              View
            </button>
          </div>
          {/* Card 3 */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <div className="text-2xl mb-2">
              <i className="fas fa-users"></i>
            </div>
            <h4 className="font-semibold">Travelers</h4>
            <p className="text-gray-600">
              {users.filter((user) => user.role === "traveler").length}{" "}
              registered users
            </p>
            <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded">
              View
            </button>
          </div>
          {/* Card 4 */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <div className="text-2xl mb-2">
              <i className="fas fa-users"></i>
            </div>
            <h4 className="font-semibold">GuestHouse Owners</h4>
            <p className="text-gray-600">
              {users.filter((user) => user.role === "guesthouse owner").length}{" "}
              registered users
            </p>
            <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded">
              View
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainDash;
