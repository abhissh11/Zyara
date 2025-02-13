import { ShoppingCart } from "lucide-react";
import useProductByCategory from "../../customHooks/useProductsByCategory";

const ElectronicsProducts = () => {
  const { products, loading, error } = useProductByCategory("electronics");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="px-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col hover:shadow-md cursor-pointer border border-gray-200 p-6 items-start justify-center rounded-sm hover:rounded-xl"
          >
            <img src={product.image} alt={product.name} width="100" />
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="text-gray-600 text-sm font-normal">
              {product.description}
            </p>
            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-bold text-gray-800">
                ${product.price}
              </p>
              <button className="px-3 py-2  bg-blue-500 rounded-lg text-white flex items-center gap-1 cursor-pointer hover:bg-blue-600">
                Add <ShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectronicsProducts;
