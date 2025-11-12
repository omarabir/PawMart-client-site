import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/my-listings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyListings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load your listings");
        setLoading(false);
      });
  }, [user?.email]);

  
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/listings/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.deletedCount > 0) {
        setMyListings(myListings.filter((item) => item._id !== id));
        toast.success("Listing deleted successfully!");
      }
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Listings</h1>

      {myListings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full border rounded-lg">
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
                {myListings.map((listing) => (
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
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {myListings.map((listing) => (
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
                    <span className="font-semibold">Price:</span> $
                    {listing.price}
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
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;
