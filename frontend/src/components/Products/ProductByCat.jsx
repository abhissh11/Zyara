import { Heart, ShoppingCart } from "lucide-react";
import useProductByCategory from "../../customHooks/useProductsByCategory";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import ProductSkeleton from "./ProductSkeleton";

export default function ProductByCat({ category }) {
  const { products, loading, error } = useProductByCategory(`${category}`);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    // Show success toast
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000, // Close after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: { background: "#155dfc", color: "#fff" },
    });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      {loading ? (
        // Show skeleton loaders when loading
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">
          Error fetching products: {error}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col hover:scale-105 transition-all duration-150 hover:shadow-md cursor-pointer border border-gray-200 p-2 md:p-3 items-center justify-between rounded-sm hover:rounded-xl"
            >
              <div className="bg-gray-100 w-[90%] flex items-center justify-center shadow-sm rounded-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 rounded-sm text-xs text-gray-400"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm font-normal">
                  {product.description}
                </p>
                <div className="flex gap-2 justify-between items-center w-full">
                  <p className="text-base font-semibold text-gray-900">
                    ₹{product.price}
                  </p>
                </div>
                <div className="flex justify-between items-center gap-1">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-3 md:px-4 py-2 bg-blue-500 rounded-md text-white flex items-center gap-1 cursor-pointer hover:bg-blue-600"
                  >
                    Add
                    <span className="hidden sm:block">
                      <ShoppingCart />
                    </span>
                  </button>

                  <button className="px-1 md:px-2 py-1 border border-gray-300 rounded-sm flex items-center group cursor-pointer">
                    <Heart className="text-gray-600 group-hover:text-pink-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
