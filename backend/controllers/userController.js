import User from "../models/User-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
    addresses,
    role = "user",
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    !phoneNumber ||
    !addresses
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      addresses,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//sign in
export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email })
      .populate("orders")
      .populate("addresses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate an access token
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    // Set the access token as an HTTP-only cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Sign-in successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        orders: user.orders,
        addresses: user.addresses,
      },
    });
  } catch (error) {
    console.error("Error in signInUser:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// get user detail

export const getUserDetails = async (req, res) => {
  const { userId } = req.user;

  try {
    // Find the user by ID and populate orders and addresses
    const user = await User.findById(userId)
      .select("-password")
      .populate("orders")
      .populate("addresses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User details fetched successfully", user });
  } catch (error) {
    console.error("Error in getUserDetails:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
