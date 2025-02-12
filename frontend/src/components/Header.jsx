import React from "react";
import { Heart, Mail, Phone, Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const categoryArr = [
    {
      name: "Electronics",
      link: "xx",
    },
    {
      name: "Apparel",
      link: "xx",
    },
    {
      name: "Home & Living",
      link: "xx",
    },

    {
      name: "Beauty",
      link: "xx",
    },
    {
      name: "Toys",
      link: "xx",
    },
    {
      name: "Books",
      link: "xx",
    },
    {
      name: "Sports",
      link: "xx",
    },
    {
      name: "More",
      link: "xx",
    },
  ];
  return (
    <header className=" py-1 border-t-4 border-blue-500 shadow-md">
      <div className="px-6 flex justify-between items-center">
        <p className="text-base font-medium text-gray-600">
          Welcome to Zayra Store!
        </p>
        <div className="flex justify-center items-center gap-4">
          <p className="flex items-center gap-1 text-gray-600">
            <Phone size={16} className="text-blue-600" /> +91-620728872
          </p>
          <p className="flex items-center gap-1 text-gray-600">
            <Mail size={16} className="text-blue-600" /> support@zayra.com
          </p>
        </div>
      </div>
      <div className="border-y border-gray-400 flex justify-between items-center mx-6 py-4">
        <button className="text-2xl font-semibold px-2 rounded-lg text-blue-600 ">
          Zayra
        </button>
        <div className="w-[50%] flex justify-between items-center gap-2 px-4 border border-gray-500  rounded-xl">
          <input
            placeholder="Search for products.."
            className="w-[80%] outline-none pr-4 py-2 text-start text-gray-700"
          />
          <Search size={22} className="text-gray-600" />
        </div>
        <div className="flex justify-between items-center gap-6">
          <button className="flex items-center gap-1 text-lg font-normal hover:text-blue-600 cursor-pointer">
            <User /> Account
          </button>
          <button className="flex items-center gap-1 text-lg font-normal hover:text-blue-600 cursor-pointer">
            <Heart /> Wishlist
          </button>
          <button className="flex items-center gap-1 text-lg font-normal hover:text-blue-600 cursor-pointer">
            <ShoppingCart /> Cart
          </button>
        </div>
      </div>
      {/* Categories section in Header  */}
      <div className="">
        <ul className="flex justify-start gap-8 px-6 py-2">
          {categoryArr.map((c, index) => (
            <li
              key={index}
              className="text-base font-serif font-normal text-gray-800 hover:text-blue-500 cursor-pointer"
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
      {/* for mobile and small screen view  */}
    </header>
  );
}
