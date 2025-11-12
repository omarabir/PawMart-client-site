import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import ListingCard from "../Components/ListingCard";
import { AuthContext } from "../Context/AuthContext";
import Spinner from "../Components/Spinner";

const PetSupplies = () => {
  const listingData = useLoaderData();
  const { loading } = useContext(AuthContext);
  const listings = Array.isArray(listingData) ? listingData : [];
  const categories = [...new Set(listings.map((listing) => listing.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        All Pets & Supplies
      </h1>

      <div className="flex flex-col justify-center md:flex-row gap-4 mb-8 p-4 bg-base-200 rounded-lg shadow">
        <div className="form-control w-full md:w-1/3">
          <label className="label">
            <span className="label-text">Filter by Category</span>
          </label>
          <select className="select select-bordered">
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control flex flex-col   w-full md:w-1/3">
          <label className="label">
            <span className="label-text">Search by Name</span>
          </label>
          <input
            type="text"
            placeholder="Search for a pet or product..."
            className="input input-bordered"
            value=""
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {listings.length === 0 ? (
            <div className="text-center p-10">
              <p className="text-xl text-gray-500">No listings found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PetSupplies;
