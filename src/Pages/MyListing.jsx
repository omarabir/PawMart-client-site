import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const categoryOptions = [
  "All Categories",
  "Accessories",
  "Foods",
  "Care Products",
  "Pets",
];

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  const fetchMyListings = async () => {
    try {
      setLoader(true);
      const res = await fetch(
        `http://localhost:3000/my-listings?email=${user?.email}`
      );
      const data = await res.json();
      setMyListings(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load listings");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyListings();
  }, [user]);

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/listings/${editingListing._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingListing),
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Listing updated successfully!");
        setIsModalOpen(false);
        fetchMyListings();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085f6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/listings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        setMyListings((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your listing has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Delete failed.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Listings</h2>

      {loader ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader size={50} />
        </div>
      ) : myListings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm md:text-base border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className=" px-4 py-2">Name</th>
                <th className=" px-4 py-2">Category</th>
                <th className=" px-4 py-2">Price</th>
                <th className=" px-4 py-2">Location</th>
                <th className=" px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myListings.map((listing) => (
                <tr key={listing._id} className="text-center">
                  <td className=" px-4 py-2">{listing.name}</td>
                  <td className=" px-4 py-2">{listing.category}</td>
                  <td className=" px-4 py-2">${listing.price}</td>
                  <td className=" px-4 py-2">{listing.location}</td>
                  <td className=" px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(listing)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && editingListing && (
        <div className=" fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4 text-center">Edit Listing</h3>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={editingListing.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Name"
              />
              <select
                name="category"
                value={editingListing.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="price"
                value={editingListing.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Price"
              />
              <input
                type="text"
                name="location"
                value={editingListing.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Location"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
