import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-listings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyListings(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Failed to load your listings", "error");
        setLoader(false);
      });
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
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

      // Delete on server first
      const res = await fetch(`http://localhost:3000/listings/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        // Success → update UI
        setMyListings((prev) => prev.filter((item) => item._id !== id));
        Swal.fire("Deleted!", "Your listing has been deleted.", "success");
      } else {
        Swal.fire("Error!", "Delete failed.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Delete failed.", "error");
    }
  };

  if (loader) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white/70 z-50">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Listings</h1>

      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full  rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myListings.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  You have not created any listings yet.
                </td>
              </tr>
            ) : (
              myListings.map((listing) => (
                <tr key={listing._id}>
                  <td className="flex items-center gap-3">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-semibold">{listing.name}</span>
                  </td>
                  <td>{listing.category}</td>
                  <td>${listing.price}</td>
                  <td>{listing.location}</td>
                  <td className="flex gap-3 justify-center">
                    <button className="btn btn-sm btn-outline btn-info">
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4 mt-6">
        {myListings.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not created any listings yet.
          </p>
        ) : (
          myListings.map((listing) => (
            <div
              key={listing._id}
              className="card bg-base-100 shadow-md border p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h2 className="font-bold text-lg">{listing.name}</h2>
                  <p className="text-sm text-gray-500">{listing.category}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm">
                  <span className="font-semibold">Price:</span> ${listing.price}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Location:</span>{" "}
                  {listing.location}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="btn btn-sm btn-outline btn-info">
                  Update
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyListings;
