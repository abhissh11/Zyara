import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await cloudinary.v2.uploader
      .upload_stream({ folder: "zayra_products" }, (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Upload failed", error });
        }
        res.json({ imageUrl: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};
