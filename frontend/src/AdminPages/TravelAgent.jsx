import React, { useState } from "react";
import { Edit, Trash2, MoreVertical } from "lucide-react";
import { useUserStore } from "../store/userStore";
import TravelerFormModal from "../components/TravelerFormModal";
import UpdateTravelerFormModal from "../components/UpdateTravelerFormModal";

const TravelAgent = ({ users }) => {
  const [showModal, setShowModal] = useState(false);
  const [showconfirmation, setShowConfirmation] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [selectedTraveler, setSelectedTraveler] = useState(null);

  const { deleteUser, fetchUsers } = useUserStore();

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Travel Agent</h2>
      <div className="flex justify-between items-center mb-4">
        <p>
          Showing {users.filter((user) => user.role === "travel agent").length}{" "}
          Travel Agent
        </p>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={() => setShowModal(true)}
        >
          Add Travel Agent
        </button>
      </div>

      <div>
        {users
          .filter((user) => user.role === "travel agent")
          .map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-md mb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://cdn-icons-png.freepik.com/256/3814/3814334.png?semt=ais_hybrid"
                  alt="avatar"
                  className="rounded-full"
                  width={50}
                  height={50}
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">ID: {user._id}</p>
                </div>
              </div>
              <p className="text-sm">
                {user.isVerfied ? "Verified" : "Not Verified"}
              </p>

              <div className="flex gap-4 text-gray-500">
                <Edit
                  className="cursor-pointer"
                  onClick={async () => {
                    setShowUpdateModal(true);
                    setSelectedTraveler(user);
                  }}
                />
                <Trash2
                  className="cursor-pointer"
                  onClick={() => {
                    setShowConfirmation(true);
                    setSelectedTraveler(user._id);
                    // Handle delete action here, e.g., call a delete function or show a confirmation modal
                  }}
                />
                <MoreVertical className="cursor-pointer" />
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 bg-gray-200 rounded-md">Previous</button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">Next</button>
      </div>

      {/* Modal Component */}
      <TravelerFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async () => {
          await fetchUsers();
          setShowModal(false);
        }}
        defaultRole="travel agent"
      />

      <UpdateTravelerFormModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={async () => {
          await fetchUsers();
          setShowUpdateModal(false);
        }}
        traveler={selectedTraveler}
      />

      {/* Confirmation Modal for Delete Action */}

      {showconfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p>This action cannot be undone.</p>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  deleteUser(selectedTraveler);
                  console.log("Cancelled delete action: " + selectedTraveler);
                  setSelectedTraveler(null);
                  setShowConfirmation(false);
                }}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => {
                  setShowConfirmation(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelAgent;
