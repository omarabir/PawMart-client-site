import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useLoaderData } from "react-router";

const AddListing = () => {
  const { loading, user } = useContext(AuthContext);
  const data = useLoaderData();
  console.log(data);
  const listings = Array.isArray(data) ? data : [];
  console.log(listings);
  const categories = [...new Set(listings.map((listing) => listing.category))];
  console.log(categories);
  const handleAddListing = (event) => {
    event.preventDefault();
    const formdata = {
      name: event.target.name.value,
      category: event.target.category.value,
      price: event.target.price.value,
      location: event.target.location.value,
      image: event.target.image.value,
      description: event.target.description.value,
      date: event.target.date.value,
      email: user.email,
    };
    fetch("http://localhost:3000/listings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Add a New Listing</h1>
      <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
        <form onSubmit={handleAddListing} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product/Pet Name</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select name="category" className="select select-bordered">
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                name="price"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              name="location"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-24"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Available/Pickup Date</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                readOnly
                disabled
                value={user?.email || ""}
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Listing"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
