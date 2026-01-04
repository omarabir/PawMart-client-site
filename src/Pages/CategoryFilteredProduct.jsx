import React, { useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import ListingCard from "../Components/ListingCard";

const CategoryFilteredProduct = () => {
  const listings = useLoaderData();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sort by newest
  const sortedListings = useMemo(() => {
    return [...listings].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  }, [listings]);

  // Pagination
  const totalPages = Math.ceil(sortedListings.length / itemsPerPage);
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedListings.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedListings, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3">
          Category:{" "}
          <span className="text-[#FE7F73]">{listings[0]?.category}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse all items in this category
        </p>
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
            {sortedListings.length}
          </span>{" "}
          results
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Listings */}
      {sortedListings.length === 0 ? (
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
            No products found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No items available in this category yet
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

export default CategoryFilteredProduct;
