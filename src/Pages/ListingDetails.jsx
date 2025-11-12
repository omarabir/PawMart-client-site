import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const ListingDetails = () => {
  const listing = useLoaderData();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      buyerName: form.buyerName.value,
      email: form.email.value,
      productId: form.productId.value,
      productName: form.productName.value,
      quantity: form.quantity.value,
      price: form.price.value,
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value,
      status: listing.category === "Pets" ? "Adoption Requested" : "Pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Your request has been submitted successfully!");
        setShowModal(false);
        form.reset();
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to submit order.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover max-h-[500px]"
          />
        </figure>

        <div className="card-body lg:w-1/2">
          <h1 className="card-title text-4xl font-bold">{listing.name}</h1>
          <span className="badge badge-primary my-2">{listing.category}</span>
          <p className="text-lg">{listing.description}</p>
          <div className="divider"></div>
          <p>
            <strong>Price:</strong>{" "}
            <span className="text-xl font-semibold text-primary">
              {listing.category === "Pets" && listing.price === 0
                ? "Free for Adoption"
                : `$${listing.price}`}
            </span>
          </p>
          <p>
            <strong>Location:</strong> {listing.location}
          </p>
          <p>
            <strong>Pickup/Available Date:</strong>{" "}
            {new Date(listing.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Contact:</strong> {listing.email}
          </p>

          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary btn-wide"
              onClick={() => setShowModal(true)}
            >
              {listing.category === "Pets" ? "Adopt Now" : "Order Now"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className=" fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6  relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {listing.category === "Pets" ? "Adoption Form" : "Order Form"}
            </h2>

            <form onSubmit={handleOrder} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold">Buyer Name</label>
                  <input
                    type="text"
                    name="buyerName"
                    defaultValue={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold">Product ID</label>
                  <input
                    type="text"
                    name="productId"
                    defaultValue={listing._id}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="font-semibold">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    defaultValue={listing.name}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    defaultValue={listing.category === "Pets" ? 1 : 1}
                    readOnly={listing.category === "Pets"}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="font-semibold">Price</label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={
                      listing.category === "Pets" && listing.price === 0
                        ? "Free"
                        : `$${listing.price}`
                    }
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">Address</label>
                <textarea
                  name="address"
                  required
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter your address"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold">Date (Pickup)</label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="font-semibold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input input-bordered w-full"
                    placeholder="e.g. +8801XXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold">Additional Notes</label>
                <textarea
                  name="notes"
                  className="textarea textarea-bordered w-full"
                  placeholder="Any special instructions?"
                ></textarea>
              </div>

              <div className="flex justify-end mt-4">
                <button type="submit" className="btn btn-primary">
                  Submit
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
