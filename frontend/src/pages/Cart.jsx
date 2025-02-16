import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";

export default function Cart() {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  return (
    <div className="max-w-xl mx-auto p-6 pt-20 sm:pt-40 mb-28 min-h-[60svh] flex flex-col items-center justify-center bg-gray-100 rounded-xl">
      <h1 className="text-2xl font-bold my-14">Your Shopping Bag</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg- font-normal">
          Your cart is empty! Add your next buy
        </p>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          {cartItems &&
            cartItems.map((item, index) => (
              <div
                key={item.id}
                className="p-4 rounded-lg flex gap-4 justify-between items-center mb-4 shadow-md border border-gray-200 hover:-translate-y-1 duration-100 cursor-pointer w-full"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="">
                  <h3 className="text-base font-semibold">{item.name}</h3>
                  <p>
                    {item.price} x {item.quantity} = ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  className="text-red-600 text-lg font-normal hover:underline cursor-pointer"
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  remove
                </button>
              </div>
            ))}
          <div className="mt-6  border-t-2 border-gray-600 flex gap-8 flex-col w-full">
            <h3 className="text-xl font-semibold items-start border-b border-gray-300 py-2">
              Order Summary
            </h3>
            <div className="flex flex-col justify-between items-center font-normal text-lg">
              <h3 className="flex justify-between w-full">
                Total Items : <span>{totalQuantity} </span>
              </h3>
              <h3 className="flex justify-between w-full">
                Total Amount : <span>₹{totalPrice.toFixed(2)} </span>{" "}
              </h3>
            </div>
            <button className="bg-blue-500 text-white border-blue-600 text-lg font-normal py-2 hover:bg-blue-600 cursor-pointer rounded-lg ">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
