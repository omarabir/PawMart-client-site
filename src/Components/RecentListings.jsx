import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import SkeletonCard from "./SkeletonCard";
import { Link } from "react-router";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pawmart-server-weld-nu.vercel.app/listings?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Recent Listings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center  md:text-5xl font-extrabold mb-10 text-gray-900 dark:text-white">
          Recent Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>

      <Link to="/pets-and-supplies">
        <button className="btn btn-sm bg-[#FE7F73] text-white hover:bg-[#f86255] border-none rounded-lg block mx-auto mt-5 h-9 text-sm font-medium transition-colors">
          View More
        </button>
      </Link>
    </section>
  );
};

export default RecentListings;
