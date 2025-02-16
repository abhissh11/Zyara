import { ShoppingCart } from "lucide-react";
import useProductByCategory from "../../customHooks/useProductsByCategory";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductByCat({ category }) {
  const { products, loading, error } = useProductByCategory(`${category}`);

  const dispatch = useDispatch();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
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
            <div className="w-full flex flex-col agp-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm font-normal">
                {product.description}
              </p>
              <div className="flex gap-2 justify-between items-center w-full">
                <p className="text-lg font-semibold text-gray-800">
                  ₹ {product.price}
                </p>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="px-2 py-1  bg-blue-500 rounded-lg text-white flex items-center gap-1 cursor-pointer hover:bg-blue-600"
                >
                  Add{" "}
                  <span className="hidden sm:block">
                    {" "}
                    <ShoppingCart />{" "}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
