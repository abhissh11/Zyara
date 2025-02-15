import React from "react";
import PostProduct from "../components/Products/PostProduct";

export default function Dashboard() {
  return (
    <>
      <div className="py-36">
        <h1 className="text-center text-3xl font-bold font-serif py-5">
          Admin Dashboard
        </h1>
        <div className="">
          <PostProduct />
        </div>
      </div>
    </>
  );
}
