// import ElectronicsProducts from "../components/Products/ElectronicsProducts";

import {
  ArrowUpZA,
  BedDouble,
  Book,
  Flower,
  Shapes,
  Shirt,
  TabletSmartphone,
  Volleyball,
} from "lucide-react";
import ElectronicsProducts from "../components/Products/ElectronicsProducts";
import PostProduct from "../components/Products/PostProduct";

export default function HomePage() {
  const categoryArr = [
    {
      name: "Electronics",
      link: "xx",
      icon: <TabletSmartphone size={36} />,
      offer: "20% Off",
    },
    {
      name: "Apparel",
      link: "xx",
      icon: <Shirt size={36} />,
      offer: "New Arrivals",
    },
    {
      name: "Home & Living",
      link: "xx",
      icon: <BedDouble size={36} />,
      offer: "30% Off",
    },

    {
      name: "Beauty",
      link: "xx",
      icon: <Flower size={36} />,
      offer: "Trending Now",
    },
    {
      name: "Toys",
      link: "xx",
      icon: <Shapes size={36} />,
      offer: "15% Off",
    },
    {
      name: "Books",
      link: "xx",
      icon: <Book size={36} />,
      offer: "Buy 2 Get 1",
    },
    {
      name: "Sports",
      link: "xx",
      icon: <Volleyball size={36} />,
      offer: "40% Off",
    },
    {
      name: "More",
      link: "xx",
      icon: <ArrowUpZA size={36} />,
      offer: "Upcoming Items",
    },
  ];
  return (
    <div className="p-10 flex flex-col items-center justify-center ">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 w-full">
        <div className=" bg-blue-500 px-10 py-5 rounded-2xl flex justify-between items-center">
          <div className="flex items-start justify-start flex-col gap-3">
            <h2 className="text-white text-xl font-bold">Electronics Sale</h2>
            <p className="text-white text-lg font-normal">
              Up to 40% off on selected items
            </p>
            <button className="text-lg font-normal px-6 py-2 rounded-xl text-blue-600 bg-white cursor-pointer hover:bg-gray-100">
              Shop now
            </button>
          </div>
          <span className="text-xl text-white">
            <TabletSmartphone size={60} className="text-gray-200 opacity-45" />{" "}
          </span>
        </div>
        <div className=" bg-pink-500 px-10 py-5 rounded-2xl flex justify-between items-center">
          <div className="flex items-start justify-start flex-col gap-3">
            <h2 className="text-white text-xl font-bold">Fashion Week</h2>
            <p className="text-white text-lg font-normal">
              New arrivals every day
            </p>
            <button className="text-lg font-normal px-6 py-2 rounded-xl text-pink-600 bg-white cursor-pointer hover:bg-gray-100">
              Shop now
            </button>
          </div>
          <span className="text-xl text-white">
            <Shirt size={60} className="text-gray-200 opacity-45" />{" "}
          </span>
        </div>
      </div>
      <div className="py-10 text-center flex flex-col gap-4">
        <h2 className="text-3xl font-bold ">Featured Products</h2>
        <p className="text-lg font-normal text-gray-600">
          Discover our handpicked selection of top products
        </p>
      </div>
      <ElectronicsProducts />
      <div className="py-20 text-center flex flex-col gap-4">
        <h2 className="text-3xl font-bold ">Top categories</h2>
        <p className="text-lg font-normal text-gray-600">
          Browse our most popular shopping categories
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-14">
        {categoryArr.map((c, index) => (
          <div
            key={index}
            className="group flex flex-col gap-2 items-center justify-center p-8 bg-gray-100 border border-gray-100 rounded-xl cursor-pointer hover:scale-105 transition-all duration-100 hover:shadow-md"
          >
            <span className="text-gray-600 bg-pink-300 p-4 rounded-full group-hover:bg-pink-400">
              {c.icon}
            </span>
            <h4 className="text-lg font-semibold text-gray-800">{c.name}</h4>
            <p className="text-base font-normal text-gray-500">{c.offer}</p>
          </div>
        ))}
      </div>
      <div className="py-20 text-center flex flex-col gap-4">
        <h2 className="text-3xl font-bold ">Trending Items</h2>
        <p className="text-lg font-normal text-gray-600">
          Discover what's popular right now
        </p>
      </div>
      <ElectronicsProducts />
      <PostProduct />
    </div>
  );
}
