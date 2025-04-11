import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  const categoryArr = [
    { name: "Electronics", link: "electronics" },
    { name: "Apparels", link: "apparels" },
    { name: "Home & Living", link: "home-living" },
    { name: "Beauty", link: "beauty" },
    { name: "Toys", link: "toys" },
    { name: "Books", link: "books" },
    { name: "Sports", link: "sports" },
  ];

  const { totalQuantity } = useSelector((state) => state.cart);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuIconRef.current &&
        !menuIconRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="py-1 border-t-4 border-blue-500 shadow-md fixed w-full bg-white z-50">
      <div className="px-6 flex justify-between items-center">
        <p className="text-base font-medium text-gray-600">
          Welcome to Zayra Store!
        </p>
        <div className="hidden sm:block">
          <div className="flex justify-center items-center gap-4">
            <p className="flex items-center gap-1 text-gray-600">
              <Phone size={16} className="text-blue-600" /> +91-620728872
            </p>
            <p className="flex items-center gap-1 text-gray-600">
              <Mail size={16} className="text-blue-600" /> support@zayra.com
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Main Navbar */}
      <div className="hidden md:block relative">
        <div className="border-y border-gray-400 flex justify-between items-center mx-6 py-4">
          <Link to="/">
            <button className="text-2xl font-semibold px-2 rounded-lg text-blue-600 cursor-pointer hover:shadow-sm">
              Zayra
            </button>
          </Link>
          <div className="w-[50%] flex justify-between items-center gap-2 px-4 border border-gray-500 rounded-xl">
            <input
              placeholder="Search for products.."
              className="w-[80%] outline-none pr-4 py-2 text-start text-gray-700"
            />
            <Search size={22} className="text-gray-600" />
          </div>
          <div className="flex justify-between items-center gap-6">
            <Link to="/account">
              <button className="flex items-center gap-1 text-lg font-normal hover:text-blue-600 cursor-pointer">
                <User /> Account
              </button>
            </Link>
            <Link to="/wishlist">
              <button className="flex items-center gap-1 text-lg font-normal hover:text-blue-600 cursor-pointer">
                <Heart /> Wishlist
              </button>
            </Link>
            <Link to="/cart" className="relative">
              <button className="flex items-center gap-1 text-lg font-normal hover:text-blue-600 cursor-pointer">
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-semibold px-2 h-fit rounded-full">
                  {totalQuantity}
                </span>
                <ShoppingCart size={32} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Category Nav */}
      <div className="hidden lg:block">
        <ul className="flex justify-start gap-8 px-6 py-2">
          {categoryArr.map((c, index) => (
            <li
              key={index}
              className="text-base font-serif font-normal text-gray-800 hover:text-blue-500 cursor-pointer"
            >
              <Link to={`/categories?name=${c.link}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Header */}
      <div className="block md:hidden relative">
        <div className="px-6 flex justify-between border-t border-gray-400 py-2">
          <div className="flex flex-row items-center gap-4">
            <Menu
              ref={menuIconRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
            />
            <Link to="/" className="text-2xl font-semibold text-blue-600">
              Zayra
            </Link>
          </div>
          <div className="relative">
            <Link to="/cart">
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-semibold px-2 h-fit rounded-full">
                {totalQuantity}
              </span>
              <ShoppingCart />
            </Link>
          </div>
        </div>

        {/* Collapsible Mobile Menu */}
        <div
          ref={menuRef}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          } bg-white px-6 pb-2 shadow-md`}
        >
          {/* Categories */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Categories
            </p>
            <ul className="flex flex-col gap-2">
              {categoryArr.map((c, index) => (
                <li key={index}>
                  <Link
                    to={`/categories?name=${c.link}`}
                    className="text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Wishlist */}
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/account"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <User size={18} /> Account
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
            >
              <Heart size={18} /> Wishlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
