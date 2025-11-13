import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ClipLoader } from "react-spinners";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleDownloadReport = () => {
    if (orders.length === 0) {
      alert("No orders to generate report!");
      return;
    }

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

  
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const title = "My Orders Report";
    const textWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - textWidth) / 2, 40);

    // Table columns
    const tableColumn = [
      "Product Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
    ];

  
    const tableRows = orders.map((order) => [
      order.productName,
      order.buyerName,
      order.price,
      order.quantity,
      order.address,
      new Date(order.date).toLocaleDateString(),
      order.phone,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: "grid",
      headStyles: {
        fillColor: [128, 90, 213], 
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        fontSize: 10,
        halign: "left",
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 20, right: 20 },
    });

    doc.save("my-orders.pdf");
  };

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/orders?email=${user.email}`
        );
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <ClipLoader size={50} color="#4f46e5" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-2">No Orders Found 😕</h2>
        <p className="text-gray-500 text-lg">
          You haven’t placed any orders or adoption requests yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-purple-600">My Orders</h1>
        <button
          onClick={handleDownloadReport}
          className="btn bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          Download Report
        </button>
      </div>


      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Buyer</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order._id}
                className={`hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-gray-50" : ""
                } transition-colors duration-200`}
              >
                <td className="py-3 px-4">{order.productName}</td>
                <td className="py-3 px-4">{order.buyerName}</td>
                <td className="py-3 px-4">{order.price}</td>
                <td className="py-3 px-4">{order.quantity}</td>
                <td className="py-3 px-4">{order.address}</td>
                <td className="py-3 px-4">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{order.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {order.productName}
            </h2>
            <p>
              <span className="font-semibold">Buyer:</span> {order.buyerName}
            </p>
            <p>
              <span className="font-semibold">Price:</span> {order.price}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {order.quantity}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {order.address}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
