import { motion } from "framer-motion";
import { Link } from "react-router";

const ListingCard = ({ listing }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      className="card bg-white dark:bg-gray-800 dark:text-white shadow-lg hover:shadow-2xl transition-all duration-300 h-[380px] w-full rounded-xl overflow-hidden flex flex-col border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Image Section - Fixed height */}
      <figure className="h-40 overflow-hidden relative">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* Category Badge - Overlay on image */}
        <div className="absolute top-2 right-2 badge bg-[#f86255] text-white border-none shadow-md text-xs font-semibold px-3 py-2">
          {listing.category}
        </div>
      </figure>

      {/* Card Body - Compact */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h2
            className="text-base font-bold line-clamp-1 text-gray-800 dark:text-white flex-1"
            title={listing.name}
          >
            {listing.name}
          </h2>
          <p className="font-bold text-lg text-gray-400 dark:text-gray-200 whitespace-nowrap">
            {listing.category === "Pets" && listing.price === 0
              ? "Free"
              : `$${listing.price}`}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-3 leading-relaxed">
          {listing.description ||
            `${listing.name} - Available for adoption or purchase at a great price.`}
        </p>

        {/* Meta Information - Compact */}
        <div className="space-y-1.5 mb-3">
          {/* Location */}
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-gray-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {listing.location}
            </span>
          </div>

          {/* Date Posted */}
          {listing.createdAt && (
            <div className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-gray-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(listing.createdAt)}
              </span>
            </div>
          )}
        </div>

        {/* View Details Button - Compact */}
        <div className="mt-auto">
          <Link
            to={`/listing-details/${listing._id}`}
            className="btn btn-sm bg-[#FE7F73] text-white hover:bg-[#f86255] border-none rounded-lg w-full h-9 text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
