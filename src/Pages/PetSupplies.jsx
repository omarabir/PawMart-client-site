import React, { useContext, useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import ListingCard from "../Components/ListingCard";
import SkeletonCard from "../Components/SkeletonCard";
import { AuthContext } from "../Context/AuthContext";

const PetSupplies = () => {
  const listingData = useLoaderData();
  const { loading } = useContext(AuthContext);
  const listings = Array.isArray(listingData) ? listingData : [];

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sorting state
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, priceLow, priceHigh, nameAZ, nameZA

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Extract unique categories
  const categories = useMemo(
    () => [...new Set(listings.map((listing) => listing.category))],
    [listings]
  );

  // Filter and sort listings
  const filteredAndSortedListings = useMemo(() => {
    let filtered = listings.filter((listing) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" || listing.category === selectedCategory;

      return matchesCategory;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "priceLow":
          return (a.price || 0) - (b.price || 0);
        case "priceHigh":
          return (b.price || 0) - (a.price || 0);
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "nameZA":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [listings, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedListings.length / itemsPerPage);
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedListings.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedListings, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSortBy("newest");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
          All Pets & Supplies
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Find your perfect companion or essential supplies
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#FE7F73]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </h2>
          <button
            onClick={handleClearFilters}
            className="btn btn-sm btn-ghost gap-2 hover:bg-[#FE7F73] hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#FE7F73]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                Category
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-base sm:text-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#FE7F73]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                Sort By
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-base sm:text-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="nameAZ">Name: A to Z</option>
              <option value="nameZA">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6 px-2">
        <p className="text-gray-600 dark:text-gray-400">
          Showing{" "}
          <span className="font-bold text-[#FE7F73]">
            {paginatedListings.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-[#FE7F73]">
            {filteredAndSortedListings.length}
          </span>{" "}
          results
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredAndSortedListings.length === 0 ? (
        <div className="text-center p-16 bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
          <svg
            className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-semibold mb-2">
            No listings found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try selecting a different category
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedListings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="btn btn-outline hover:bg-[#FE7F73] hover:border-[#FE7F73] hover:text-white disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`btn ${
                          currentPage === pageNum
                            ? "bg-[#FE7F73] text-white border-[#FE7F73] hover:bg-[#f86255]"
                            : "btn-outline hover:bg-[#FE7F73] hover:border-[#FE7F73] hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNum}
                        className="flex items-center px-2 text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="btn btn-outline hover:bg-[#FE7F73] hover:border-[#FE7F73] hover:text-white disabled:opacity-50"
              >
                Next
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Scroll to Top Button */}
          {currentPage > 1 && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 btn btn-circle bg-[#FE7F73] hover:bg-[#f86255] text-white border-none shadow-2xl"
              title="Scroll to top"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PetSupplies;
