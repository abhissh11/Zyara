import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/constants";

const useProductByCategory = (category) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(`/products/${category}`);
        setProducts(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

export default useProductByCategory;
