import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalListings: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#FE7F73", "#FF9F85", "#FFB997", "#FFC9A9"];

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch listings
      const listingsRes = await fetch(
        "https://pawmart-server-weld-nu.vercel.app/listings"
      );
      const allListings = await listingsRes.json();

      // Filter user's listings
      const userListings = allListings.filter(
        (listing) => listing.email === user?.email
      );

      // Fetch orders
      const ordersRes = await fetch(
        "https://pawmart-server-weld-nu.vercel.app/orders"
      );
      const allOrders = await ordersRes.json();

      // Filter user's orders
      const userOrders = allOrders.filter(
        (order) => order.email === user?.email
      );

      setListings(userListings);
      setOrders(userOrders);

      // Calculate stats
      const pendingCount = userOrders.filter(
        (order) =>
          order.status === "Pending" || order.status === "Adoption Requested"
      ).length;

      const totalRevenue = userOrders.reduce(
        (sum, order) => sum + (order.price || 0),
        0
      );

      setStats({
        totalListings: userListings.length,
        totalOrders: userOrders.length,
        pendingOrders: pendingCount,
        revenue: totalRevenue,
      });

      // Prepare chart data - Listings by month
      const monthlyData = prepareMonthlyData(userListings);
      setChartData(monthlyData);

      // Prepare category data for pie chart
      const categoryCounts = prepareCategoryData(userListings);
      setCategoryData(categoryCounts);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const prepareMonthlyData = (listings) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const monthlyCount = months.map((month) => ({
      name: month,
      listings: Math.floor(Math.random() * 10) + 1, // Mock data for demonstration
    }));
    return monthlyCount;
  };

  const prepareCategoryData = (listings) => {
    const categoryCount = {};
    listings.forEach((listing) => {
      categoryCount[listing.category] =
        (categoryCount[listing.category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loading loading-spinner loading-lg text-[#FE7F73]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#FE7F73] to-orange-500 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName || "User"}!
        </h1>
        <p className="text-white/90">
          Here's what's happening with your account today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Listings
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalListings}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
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
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Orders
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Pending Orders
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.pendingOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-[#FE7F73]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${stats.revenue}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#FE7F73]/10 rounded-lg flex items-center justify-center">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Listings Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="listings" fill="#FE7F73" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Listings by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left text-gray-700 dark:text-gray-300">
                  Order ID
                </th>
                <th className="text-left text-gray-700 dark:text-gray-300">
                  Product
                </th>
                <th className="text-left text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="text-left text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left text-gray-700 dark:text-gray-300">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 text-sm font-mono">
                      {order._id?.slice(0, 8)}...
                    </td>
                    <td className="py-3 text-sm">
                      {order.productName || "N/A"}
                    </td>
                    <td className="py-3 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Pending" ||
                          order.status === "Adoption Requested"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm font-semibold text-[#FE7F73]">
                      ${order.price || 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
