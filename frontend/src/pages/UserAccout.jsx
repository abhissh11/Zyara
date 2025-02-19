import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../redux/slices/authSlice";

export default function UserAccout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg py-48">
      <h2 className="text-2xl font-bold text-center mb-4">Account Details</h2>

      {isAuthenticated && user ? (
        <div className="space-y-4">
          {/* User Info */}
          <div>
            <p className="font-semibold">Name:</p>
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>{user.phoneNumber || "Not Provided"}</p>
          </div>

          {/* Address Section */}
          <div>
            <p className="font-semibold">Addresses:</p>
            {user.addresses && user.addresses.length > 0 ? (
              <ul className="list-disc pl-5">
                {user.addresses.map((address, index) => (
                  <li key={index}>
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.zipCode}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No address found</p>
            )}
          </div>

          {/* Order History Section */}
          <div>
            <p className="font-semibold">Order History:</p>
            {user.orders && user.orders.length > 0 ? (
              <ul className="list-disc pl-5">
                {user.orders.map((order, index) => (
                  <li key={index}>
                    <p>Order ID: {order._id}</p>
                    <p>Total: ₹{order.totalAmount}</p>
                    <p>Status: {order.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders placed yet</p>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-500 cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-600">User not signed in</p>
          <button
            onClick={() => navigate("/signin")}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
