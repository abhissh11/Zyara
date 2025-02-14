import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-indigo-950 text-white min-h-60 px-6 md:px-20 py-8 flex gap-12 flex-col md:flex-row justify-between">
      <div className="flex flex-col gap-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">Zayra - One Store</h1>
        </Link>
        <p className="text-lg font-normal text-gray-200">
          Your one-stop destination for all your shopping needs. <br /> Quality
          products, amazing prices, and excellent service.
        </p>
      </div>
      <div className="flex md:flex-row justify-between gap-6">
        <div className="flex flex-col gap-8">
          <h4 className="text-xl font-semibold">Quick Links</h4>
          <ul className="flex flex-col gap-4 ">
            <li className="hover:underline text-base cursor-pointer">
              Terms & Condition
            </li>
            <li className="hover:underline text-base cursor-pointer">FAQs</li>
            <li className="hover:underline text-base cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:underline text-base cursor-pointer">
              Shopping Information
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <h4 className=" text-xl font-semibold">Categories</h4>
          <ul className="flex flex-col gap-4">
            <li className="hover:underline text-base cursor-pointer">
              Electronics
            </li>
            <li className="hover:underline text-base cursor-pointer">
              Apparels
            </li>
            <li className="hover:underline text-base cursor-pointer">Beauty</li>
            <li className="hover:underline text-base cursor-pointer">Books</li>
            <li className="hover:underline text-base cursor-pointer">Toys</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
