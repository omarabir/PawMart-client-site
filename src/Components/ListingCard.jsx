import { motion } from "framer-motion";

import { Link } from "react-router";

const ListingCard = ({ listing }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="card bg-base-100 shadow-xl h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <figure className="h-48">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title truncate">{listing.name}</h2>
        <div className="badge badge-secondary">{listing.category}</div>
        <p>
          <strong>Location:</strong> {listing.location}
        </p>
        <p className="font-semibold text-lg text-primary">
          {listing.category === "Pets" && listing.price === 0
            ? "Free for Adoption"
            : `$${listing.price}`}
        </p>
        <div className="card-actions justify-end">
          <Link
            to={`/listing-details/${listing._id}`}
            className="btn btn-primary"
          >
            See Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
