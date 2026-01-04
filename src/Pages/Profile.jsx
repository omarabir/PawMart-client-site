import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    phone: user?.phoneNumber || "",
    address: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update Firebase profile
      if (updateUserProfile) {
        await updateUserProfile(formData.displayName, formData.photoURL);
      }
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#FE7F73] to-orange-500 rounded-2xl p-8 mb-6 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white text-[#FE7F73] rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {user?.displayName || "User Name"}
            </h1>
            <p className="text-white/90 mb-1">{user?.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                Member since {new Date(user?.metadata?.creationTime).getFullYear() || "2024"}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                User Role
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 bg-white text-[#FE7F73] rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
          >
            {isEditing ? (
              <>
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </>
            ) : (
              <>
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
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
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isEditing
                      ? "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  } text-gray-900 dark:text-white focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none transition-all`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isEditing
                      ? "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  } text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none transition-all`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://example.com/photo.jpg"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isEditing
                      ? "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  } text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none transition-all`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="123 Main Street, City, State, ZIP"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isEditing
                      ? "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  } text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none transition-all`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="4"
                  placeholder="Tell us about yourself..."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isEditing
                      ? "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  } text-gray-900 dark:text-white placeholder-gray-400 focus:border-[#FE7F73] focus:ring-2 focus:ring-[#FE7F73]/20 outline-none resize-none transition-all`}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Account Information Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Account Created
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(user?.metadata?.creationTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Last Sign In
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date(user?.metadata?.lastSignInTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Email Verified
                </p>
                <p className="font-semibold">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user?.emailVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user?.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Account Status
                </p>
                <p className="font-semibold">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Active
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#FE7F73] to-orange-500 hover:from-[#f86255] hover:to-orange-600 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
