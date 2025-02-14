import React, { useState } from "react";
import axios from "axios";

export default function PostProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "apparels",
    description: "",
    price: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle File Change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Upload Image to Cloudinary
  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setImageUrl(response.data.imageUrl);
      alert("Image uploaded successfully!");
      return response.data.imageUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed.");
      return null;
    }
  };

  // Submit Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let uploadedImageUrl = imageUrl;

    // If imageUrl is not set, try uploading it first
    if (!uploadedImageUrl && image) {
      uploadedImageUrl = await uploadImage();
    }

    // Check if the image was successfully uploaded
    if (!uploadedImageUrl) {
      alert("Please upload an image first.");
      setIsSubmitting(false);
      return;
    }

    const newProduct = {
      ...product,
      image: uploadedImageUrl, // Use the correct field name expected by the backend
    };

    try {
      await axios.post("http://localhost:3000/api/products/create", newProduct);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded-lg"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded-lg"
      ></textarea>
      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded-lg"
      >
        <option value="apparels">Apparels</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
        <option value="toys">Toys</option>
        <option value="sports">Sports</option>
      </select>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded-lg"
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded-lg"
      />

      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-dashed mb-2 rounded-lg"
        placeholder=""
      />
      <button
        onClick={uploadImage}
        className="bg-blue-500 text-white p-2 cursor-pointer rounded"
      >
        Upload Image
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="mt-4 w-full h-48 object-cover"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-green-700 cursor-pointer text-white p-2 rounded w-full mt-4"
      >
        {isSubmitting ? "Submitting..." : "Submit Product"}
      </button>
    </div>
  );
}
