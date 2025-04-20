import React, { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import toast from "react-hot-toast";

const UpdateTravelerFormModal = ({ isOpen, onClose, onSubmit, traveler }) => {
  const [formData, setFormData] = useState({
    name: traveler?.name || "",
    email: traveler?.email || "",
    password: "",
    role: traveler?.role || "traveler",
    isVerfied: traveler?.isVerfied || false,
  });

  const { updateUser } = useUserStore();

  useEffect(() => {
    setFormData({
      name: traveler?.name || "",
      email: traveler?.email || "",
      password: "",
      role: traveler?.role || "traveler",
      isVerfied: traveler?.isVerfied || false,
    });
  }, [traveler]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass the updated formData to the onSubmit handler
    await updateUser(traveler._id, formData);

    onClose();
    toast.success("updated successfully!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Update Traveler</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Leave blank to keep current password"
              value={formData?.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData?.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="admin">Admin</option>
              <option value="traveler">Traveler</option>
              <option value="bus operator">Bus Operator</option>
              <option value="travel agent">Travel Agent</option>
              <option value="guesthouse owner">Guesthouse Owner</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isVerfied"
              checked={formData?.isVerfied}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">Verified</label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTravelerFormModal;
