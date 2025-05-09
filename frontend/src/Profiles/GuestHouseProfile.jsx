import React, { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { useguesthouseStore } from "../store/guesthouseStore";
import toast from "react-hot-toast";
import { useUserStore } from "../store/userStore";
import { CameraIcon } from "lucide-react";

const GuestHouseProfile = () => {
  const { user, uploadFile, checkAuth } = useAuthStore();
  const {
    myGuesthouses,
    createGuesthouse,
    fetchMyGuesthouses,
    updateGuesthouse,
    deleteGuesthouse,
  } = useguesthouseStore();

  const { updateUser } = useUserStore();

  const fileInputRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchMyGuesthouses();
  }, [fetchMyGuesthouses]);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const res = await uploadFile(user._id, file);
      const imageUrl = res?.data;
      await updateUser(user._id, { profileImage: imageUrl });
      toast.success("Profile image updated!");
    } catch (err) {
      toast.error("Failed to upload profile image");
    }
  };

  const handleAddProperty = async () => {
    const newGuesthouse = {
      name: newProperty.name,
      location: newProperty.address,
      pricePerNight: newProperty.price,
      images: [newProperty.image],
      description: newProperty.description,
      amenities: ["WiFi", "Parking"],
    };

    await createGuesthouse(newGuesthouse);
    setNewProperty({
      name: "",
      address: "",
      description: "",
      price: "",
      image: "",
    });
    setShowForm(false);
    toast.success("Property created successfully!");
    fetchMyGuesthouses();
  };

  const handleEditProperty = (property) => {
    setEditingProperty({ ...property });
  };

  const handleUpdateProperty = async () => {
    const updatedGuesthouse = {
      ...editingProperty,
      location: editingProperty.location,
      pricePerNight: editingProperty.pricePerNight,
    };

    await updateGuesthouse(editingProperty._id, updatedGuesthouse);
    setEditingProperty(null);
    toast.success("Property updated successfully!");
    fetchMyGuesthouses();
  };

  const handleDeleteProperty = async (propertyId) => {
    await deleteGuesthouse(propertyId);
    setEditingProperty(null);
    toast.success("Property deleted successfully!");
    fetchMyGuesthouses();
  };

  const handleDrop = async (e, forEdit = false) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const res = await uploadFile(user._id, file);
        const imageUrl = res?.data;
        if (forEdit) {
          setEditingProperty((prev) => ({ ...prev, images: [imageUrl] }));
        } else {
          setNewProperty((prev) => ({ ...prev, image: imageUrl }));
        }
        toast.success("Image uploaded via drag and drop!");
      } catch (err) {
        toast.error("Image upload failed");
      }
    }
  };

  return (
    <div className="h-full bg-gray-100 w-full p-6">
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-300">
          <img
            src={user?.profileImage || "https://via.placeholder.com/64"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md"
          >
            <CameraIcon className="w-4 h-4 text-gray-600" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">My Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {myGuesthouses.map((guesthouse) => (
          <div
            key={guesthouse._id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src={guesthouse.images[0] || "https://via.placeholder.com/150"}
              alt={guesthouse.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-lg font-bold">{guesthouse.name}</h4>
              <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-600">
                Active
              </span>
            </div>
            <p className="text-gray-500">{guesthouse.location}</p>
            <p className="text-gray-500">
              Price: ${guesthouse.pricePerNight}/night
            </p>
            <p className="text-gray-500">
              Description: {guesthouse.description}
            </p>
            <p className="text-gray-500">
              Amenities: {guesthouse.amenities.join(", ")}
            </p>
            <button
              onClick={() => handleEditProperty(guesthouse)}
              className="mt-2 text-blue-500 hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {editingProperty && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Edit Property</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProperty();
            }}
            className="space-y-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, true)}
          >
            <input
              type="text"
              value={editingProperty.name}
              onChange={(e) =>
                setEditingProperty({ ...editingProperty, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Property Name"
              required
            />
            <input
              type="text"
              value={editingProperty.location}
              onChange={(e) =>
                setEditingProperty({
                  ...editingProperty,
                  location: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Address"
              required
            />
            <textarea
              value={editingProperty.description}
              onChange={(e) =>
                setEditingProperty({
                  ...editingProperty,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
              placeholder="Description"
              required
            />
            <input
              type="number"
              value={editingProperty.pricePerNight}
              onChange={(e) =>
                setEditingProperty({
                  ...editingProperty,
                  pricePerNight: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Price per Night"
              required
            />
            <input
              type="text"
              value={editingProperty.amenities.join(", ")}
              onChange={(e) =>
                setEditingProperty({
                  ...editingProperty,
                  amenities: e.target.value.split(",").map((a) => a.trim()),
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Amenities (comma-separated)"
            />
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  try {
                    const res = await uploadFile(user._id, file);
                    setEditingProperty({
                      ...editingProperty,
                      images: [res?.data],
                    });
                  } catch (err) {
                    toast.error("Image upload failed");
                  }
                }
              }}
              className="w-full"
              placeholder="Drag and drop an image here or click to upload"
            />
            {editingProperty.images?.[0] && (
              <img
                src={editingProperty.images[0]}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingProperty(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProperty(editingProperty._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        + Add New Property
      </button>

      {showForm && (
        <div
          className="mt-6 bg-white p-6 rounded-lg shadow-md"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
        >
          <h3 className="text-xl font-bold mb-4">Add New Property</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddProperty();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              value={newProperty.name}
              onChange={(e) =>
                setNewProperty({ ...newProperty, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Property Name"
              required
            />
            <input
              type="text"
              value={newProperty.address}
              onChange={(e) =>
                setNewProperty({ ...newProperty, address: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Address"
              required
            />
            <input
              type="text"
              value={newProperty.description}
              onChange={(e) =>
                setNewProperty({ ...newProperty, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Description"
              required
            />
            <input
              type="number"
              value={newProperty.price}
              onChange={(e) =>
                setNewProperty({ ...newProperty, price: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Price per Night"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  try {
                    const res = await uploadFile(user._id, file);
                    setNewProperty({ ...newProperty, image: res?.data });
                  } catch (err) {
                    toast.error("Image upload failed");
                  }
                }
              }}
              className="w-full"
              placeholder="Drag and drop an image here or click to upload"
            />
            {newProperty.image && (
              <img
                src={newProperty.image}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Property
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GuestHouseProfile;
