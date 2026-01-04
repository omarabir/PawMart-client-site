import React, { useState, useContext, useEffect } from "react";
import { useLoaderData, Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import ListingCard from "../Components/ListingCard";
import toast from "react-hot-toast";

const ListingDetails = () => {
  const listing = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedListings, setRelatedListings] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  // নতুন state for dynamic quantity & total price
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  // Multiple images support - if the listing has multiple images, use them, otherwise use single image
  const images = listing.images || [listing.image];

  // Fetch related listings
  useEffect(() => {
    fetch(
      `https://pawmart-server-weld-nu.vercel.app/listings?category=${listing.category}&limit=4`
    )
      .then((res) => res.json())
      .then((data) => {
        // Filter out the current listing
        const filtered = data.filter((item) => item._id !== listing._id);
        setRelatedListings(filtered.slice(0, 4));
      })
      .catch((err) => console.error("Failed to fetch related listings:", err));

    // Mock reviews data (in real app, fetch from backend)
    setReviews([
      {
        id: 1,
        userName: "John Doe",
        rating: 5,
        comment: "Great product! Highly recommended.",
        date: "2025-12-15",
      },
      {
        id: 2,
        userName: "Jane Smith",
        rating: 4,
        comment: "Very good quality and fast delivery.",
        date: "2025-12-10",
      },
    ]);
  }, [listing.category, listing._id]);

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);

    // total price update করো
    if (listing.category !== "Pets") {
      setTotalPrice(qty * listing.price);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }
    const form = e.target;
    const newReview = {
      id: reviews.length + 1,
      userName: user.displayName || user.email,
      rating: parseInt(form.rating.value),
      comment: form.comment.value,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    form.reset();
    toast.success("Review submitted successfully!");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      buyerName: form.buyerName.value,
      email: form.email.value,
      productId: form.productId.value,
      productName: form.productName.value,
      quantity: quantity,
      price: totalPrice,
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value,
      status: listing.category === "Pets" ? "Adoption Requested" : "Pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "https://pawmart-server-weld-nu.vercel.app/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Your request has been submitted successfully!");
        setShowModal(false);
        form.reset();
        setQuantity(1);
        setTotalPrice(listing.price);
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      {/* Hero Section with Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] bg-gray-100 dark:bg-gray-800">
            <img
              src={images[selectedImage]}
              alt={listing.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden h-20 border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#FE7F73] scale-105"
                      : "border-gray-300 dark:border-gray-600 hover:border-[#FE7F73]"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${listing.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Info Section */}
        <div className="bg-white dark:bg-gray-800 sticky top-8 rounded-2xl shadow-xl p-6 space-y-4">
          <div>
            <span className="badge bg-[#f86255] text-white text-sm mb-2">
              {listing.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              {listing.name}
            </h1>

            {/* Rating Display */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {averageRating} ({reviews.length} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="divider my-2"></div>

          {/* Price */}
          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Price
            </p>
            <p className="text-3xl font-bold text-emerald-600">
              {listing.category === "Pets" && listing.price === 0
                ? "Free for Adoption"
                : `$${listing.price}`}
            </p>
          </div>

          {/* Quick Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-gray-500 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Location
                </p>
                <p className="font-semibold dark:text-gray-200">
                  {listing.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-gray-500 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Available Date
                </p>
                <p className="font-semibold dark:text-gray-200">
                  {new Date(listing.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-gray-500 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Contact
                </p>
                <p className="font-semibold dark:text-gray-200">
                  {listing.email}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            className="btn bg-[#FE7F73] text-white hover:bg-[#f86255] w-full text-lg mt-6"
            onClick={() => {
              if (!user) {
                toast.error("Please login to place an order");
                navigate("/login", { state: { from: location } });
                return;
              }
              setShowModal(true);
            }}
          >
            {listing.category === "Pets" ? "Adopt Now" : " Order Now"}
          </button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview/Description Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-[#FE7F73]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Overview & Description
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {listing.description ||
                  `${listing.name} is available for ${
                    listing.category === "Pets" ? "adoption" : "purchase"
                  }. This listing provides high-quality ${
                    listing.category
                  } with excellent care and attention to detail.`}
              </p>

              {listing.category === "Pets" && (
                <div className="mt-4 bg-blue-50 dark:bg-gray-800  border-l-4 border-blue-500 p-4 rounded">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-500 mb-2">
                    Adoption Information
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    This pet is looking for a loving home. By adopting, you're
                    giving them a second chance at a happy life. Please ensure
                    you're ready for the responsibility of pet ownership.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Key Information/Specs Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-[#FE7F73]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Key Information & Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Category
                </p>
                <p className="font-semibold text-lg dark:text-gray-200">
                  {listing.category}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Price
                </p>
                <p className="font-semibold text-lg dark:text-gray-200">
                  {listing.category === "Pets" && listing.price === 0
                    ? "Free"
                    : `$${listing.price}`}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Location
                </p>
                <p className="font-semibold text-lg dark:text-gray-200">
                  {listing.location}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Availability
                </p>
                <p className="font-semibold text-lg dark:text-gray-200">
                  {new Date(listing.date).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Posted By
                </p>
                <p className="font-semibold text-lg dark:text-gray-200">
                  {listing.email}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Listing ID
                </p>
                <p className="font-semibold text-sm font-mono dark:text-gray-300">
                  {listing._id?.slice(0, 12)}...
                </p>
              </div>
            </div>

            {/* Rules & Guidelines */}
            <div className="mt-6 bg-amber-50 dark:bg-gray-800 border-l-4 border-amber-500 p-4 rounded">
              <h3 className="font-semibold text-amber-800 dark:text-amber-500 mb-2 flex items-center gap-2">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Important Guidelines
              </h3>
              <ul className="text-amber-700 dark:text-amber-400 text-sm space-y-1 ml-7">
                <li>• Verify all details before placing an order</li>
                <li>• Contact seller for additional information</li>
                <li>
                  •{" "}
                  {listing.category === "Pets"
                    ? "Ensure you can provide proper care and environment"
                    : "Check return and refund policies"}
                </li>
                <li>• Arrange safe pickup or delivery methods</li>
              </ul>
            </div>
          </section>

          {/* Reviews & Ratings Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-[#FE7F73]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Reviews & Ratings
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn btn-sm bg-[#FE7F73] text-white hover:bg-[#f86255]"
              >
                Write Review
              </button>
            </div>

            {/* Average Rating Summary */}
            {reviews.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-800 dark:text-white">
                      {averageRating}
                    </p>
                    <div className="flex justify-center mt-2">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Based on {reviews.length} reviews
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6"
              >
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="3">⭐⭐⭐ Average</option>
                    <option value="2">⭐⭐ Poor</option>
                    <option value="1">⭐ Terrible</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Your Review
                  </label>
                  <textarea
                    name="comment"
                    className="textarea textarea-bordered w-full h-24"
                    placeholder="Share your experience..."
                    required
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="btn bg-[#FE7F73] text-white hover:bg-[#f86255]"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:bg-gray-700/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {review.userName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right Column - Related Items */}
        <div className="lg:col-span-1">
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 ">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Related Items
            </h2>

            {relatedListings.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
                No related items found
              </p>
            ) : (
              <div className="space-y-4">
                {relatedListings.map((item) => (
                  <Link
                    key={item._id}
                    to={`/listing-details/${item._id}`}
                    className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1 dark:text-gray-200">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {item.location}
                      </p>
                      <p className="font-bold text-emerald-600 text-sm">
                        {item.category === "Pets" && item.price === 0
                          ? "Free"
                          : `$${item.price}`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/pets-and-supplies"
              className="btn btn-outline btn-sm w-full mt-4"
            >
              View All Listings
            </Link>
          </section>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto my-8 relative border border-gray-200/50 dark:border-gray-700/50 overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FE7F73]/20 to-orange-500/20 rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-0"></div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg group"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300"
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
            </button>

            {/* Modal Header */}
            <div className="relative z-10 p-6 sm:p-8 pb-0">
              <div className="flex items-start gap-4">
                {/* Icon Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FE7F73] to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-3xl sm:text-4xl">
                    {listing.category === "Pets" ? "🐾" : "🛒"}
                  </span>
                </div>

                {/* Header Text */}
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                    {listing.category === "Pets"
                      ? "Adoption Request"
                      : "Order Form"}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete the form below to proceed with your{" "}
                    {listing.category === "Pets" ? "adoption" : "order"}
                  </p>
                </div>
              </div>

              {/* Product Preview Card */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={images[0]}
                    alt={listing.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                      {listing.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {listing.category} • {listing.location}
                    </p>
                    <p className="text-xl font-bold text-[#FE7F73] mt-1">
                      {listing.category === "Pets" && listing.price === 0
                        ? "Free Adoption"
                        : `$${totalPrice}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleOrder}
              className="relative z-10 p-6 sm:p-8 space-y-6"
            >
              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FE7F73]/10 flex items-center justify-center">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="buyerName"
                      defaultValue={user?.displayName || ""}
                      readOnly
                      className="w-full bg-transparent text-gray-900 dark:text-white font-medium text-sm outline-none"
                    />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email || ""}
                      readOnly
                      className="w-full bg-transparent text-gray-900 dark:text-white font-medium text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Details Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FE7F73]/10 flex items-center justify-center">
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  Order Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Product ID
                    </label>
                    <input
                      type="text"
                      name="productId"
                      defaultValue={listing._id}
                      readOnly
                      className="w-full bg-transparent text-gray-900 dark:text-white font-mono text-xs outline-none"
                    />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      readOnly={listing.category === "Pets"}
                      className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm outline-none px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700">
                    <label className="block text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2 uppercase tracking-wide">
                      Total Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={
                        listing.category === "Pets" && listing.price === 0
                          ? "Free"
                          : `$${totalPrice}`
                      }
                      readOnly
                      className="w-full bg-transparent text-emerald-700 dark:text-emerald-300 font-bold text-lg outline-none"
                    />
                  </div>
                </div>

                <input
                  type="hidden"
                  name="productName"
                  defaultValue={listing.name}
                />
              </div>

              {/* Delivery Information Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FE7F73]/10 flex items-center justify-center">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                  </div>
                  Delivery Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none resize-none transition-all"
                      placeholder="Enter your complete delivery address with landmarks"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows="2"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none resize-none transition-all"
                      placeholder="Any special instructions or requirements?"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#FE7F73] to-orange-500 hover:from-[#f86255] hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Submit {listing.category === "Pets" ? "Adoption" : "Order"}{" "}
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
