import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrders } from "../redux/slices/orderSlice";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${user._id}`);
        const data = res.data;
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  // Dispatch to Redux after orders state updates
  useEffect(() => {
    if (orders.length > 0) {
      dispatch(setUserOrders(orders));
    }
  }, [orders, dispatch]);

  return (
    <>
      <div>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 p-4 my-4 rounded-lg mb-4 shadow-md"
            >
              <h3 className="font-semibold text-base">
                Order ID: {order._id} ({order.orderStatus})
              </h3>
              <p className="text-gray-600">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Shipping to: {order.shippingAddress.street},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                {order.shippingAddress.country}
              </p>
              <p className="text-gray-700 font-semibold">
                Total Amount: ₹{order.totalAmount}
              </p>

              <h4 className="mt-3 font-semibold">Ordered Items:</h4>
              <ul className="mt-2">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-4 border-b pb-2 mb-2"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Price: ₹{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </>
  );
}
