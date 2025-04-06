import React from "react";
import { Edit, Trash2, MoreVertical } from "lucide-react";

const GuesthousePage = ({ users }) => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Travelers</h2>
      <div className="flex justify-between items-center mb-4">
        <p>
          Showing{" "}
          {users.filter((user) => user.role === "guesthouse owner").length}{" "}
          Guesthouse owner
        </p>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">
          Add new Guesthouse owner
        </button>
      </div>
      <div>
        {users
          .filter((user) => user.role === "guesthouse owner")
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
                <Edit className="cursor-pointer" />
                <Trash2 className="cursor-pointer" />
                <MoreVertical className="cursor-pointer" />
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 bg-gray-200 rounded-md">Previous</button>
        <button className="px-4 py-2 bg-gray-200 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default GuesthousePage;
