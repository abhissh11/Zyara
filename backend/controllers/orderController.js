import Product from "../models/Product-model.js";
import Order from "../models/Order-model.js";
import User from "../models/User-model.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  try {
    const { user, items, shippingAddress, paymentMethod, shippingMethod } =
      req.body;

    if (
      !user ||
      !items ||
      items.length === 0 ||
      !shippingAddress ||
      !paymentMethod ||
      !shippingMethod
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode
    ) {
      return res.status(400).json({ message: "Invalid shipping address" });
    }

    let totalAmount = 0;
    let shippingCost =
      shippingMethod === "express"
        ? 50
        : shippingMethod === "next_day"
        ? 100
        : 30;

    // Validate products and calculate total amount
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        // Deduct stock
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });

        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    totalAmount += shippingCost;

    // Create new order
    const newOrder = new Order({
      user,
      items: orderItems,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      shippingCost,
      totalAmount,
      transactionId: uuidv4(),
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    const savedOrder = await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//get orders for the user

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const orders = await Order.find({ user: userId })
      .populate("user", "name, email")
      .populate("items.product");

    if (orders.length === 0) {
      return res.status(404).json("message: No orders found");
    }

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// get all orders for admins

export const getAllOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins are allowed." });
    }

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
