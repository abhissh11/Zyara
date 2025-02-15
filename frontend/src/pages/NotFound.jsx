import React from "react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="py-52 flex flex-col gap-10 justify-center items-center min-h-[60svh]">
      <h1 className="text-3xl font-bold ">Oops! Page Not Found</h1>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-normal px-6 py-3 rounded-lg cursor-pointer">
          GO To HomePage
        </button>
      </Link>
    </div>
  );
}
