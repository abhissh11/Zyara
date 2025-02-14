import Product from "../models/Product-model.js";

// @desc    Create a new product
// @route   POST /api/products
// @access  Public (or Private for admin users)
export const createProduct = async (req, res) => {
  try {
    const { name, category, description, image, price, stock } = req.body;

    const product = new Product({
      name,
      category,
      description,
      price,
      stock,
      image, // Use `image` instead of `imageUrl`
    });

    const createdProduct = await product.save();
    res
      .status(201)
      .json({ message: "Product added successfully!", createdProduct });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/:category
// @access  Public
export const getProductbyCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};
