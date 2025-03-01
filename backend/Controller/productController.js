import productsModel from "../Models/productsModel.js";
import {
  deleteImagefromCloudinary,
  ImageuploadonCloudinary,
} from "../helper/cloudinaryHelper.js";
import mongoose from "mongoose";

//------------------------------------------------------------------addProductController
const addProductController = async (req, res) => {
  const { title, description, category, price } = req.body;
  const picture = req.file?.fieldname;
  const picturePath = req.file?.path;

  try {
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !picture ||
      !picturePath
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }

    // uploading image  on cloudinary

    const { secure_url, public_id } = await ImageuploadonCloudinary(
      picturePath,
      "products"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Failed to upload picture",
        error: secure_url,
      });
    }
    const addProduct = await productsModel.create({
      title,
      description,
      category,
      price,
      user: req.user._id,
      picture: {
        secure_url,
        public_id,
      },
    });
    res.status(200).send({
      success: true,
      message: "Product uploaded successfully",
      addProduct,
    });
  } catch (error) {
    console.log(`Error in addProductController ${error}`);
    res.status(401).send({
      success: false,
      message: `Error in addProductController: ${error}`,
    });
  }
};

//----------------------------------------------------------------getAllproductsController
const getAllproductsController = async (req, res) => {
  try {
    const Products = await productsModel
      .find({})
      .populate("user", "name")
      .populate("category", "name");

    return res.status(200).send({
      Total: Products.length,
      success: true,
      message: "Product fetched successfully",
      Products,
    });
  } catch (error) {
    console.log(`Error in getAllproductsController ${error}`);
    res.status(401).send({
      success: false,
      message: `Error in getAllproductsController: ${error}`,
    });
  }
};

//----------------------------------------------------------------deleteAllproductsController
const deleteAllproductsController = async (req, res) => {
  try {
    const { productId } = req.params;
    // console.log(productId);
    const Product = await productsModel.findById(productId);
    if (!Product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    if (Product.picture && Product.picture.public_id) {
      await deleteImagefromCloudinary(Product.picture.public_id);
    }
    const delProduct = await productsModel.findByIdAndDelete(productId);

    return res.status(200).send({
      success: true,
      message: "Product deleated successfully",
      delProduct,
    });
  } catch (error) {
    console.log(`Error in deleteAllproductsController ${error}`);
    res.status(401).send({
      success: false,
      message: `Error in deleteAllproductsController: ${error}`,
    });
  }
};

//----------------------------------------------------------------getSingleProductController
const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    console.log("Received productId:", productId);

    // ✅ Check if productId is missing or invalid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID format",
      });
    }
    // console.log(productId);
    const Product = await productsModel
      .findById(productId)
      .populate("user", "name")
      .populate("category", "name");
    if (!Product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      Product,
    });
  } catch (error) {
    console.log(`Error in getSingleProductController ${error}`);
    res.status(401).send({
      success: false,
      message: `Error in getSingleProductController: ${error}`,
    });
  }
};

//------------------------------------------------------------------updateSingleproductsController
const updateSingleproductsController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, category, price } = req.body;
    const picturePath = req.file?.path;

    // Find the product
    const Product = await productsModel.findById(productId);
    if (!Product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // ---------------------------------------------------------------Update fields if provided
    if (title) Product.title = title;
    if (description) Product.description = description;
    if (category) Product.category = category;
    if (price) Product.price = price;

    // ------------------------------------------------------------------Uploading new image to Cloudinary
    if (picturePath) {
      const { secure_url, public_id } = await ImageuploadonCloudinary(
        picturePath,
        "products"
      );

      if (!secure_url) {
        return res.status(400).send({
          success: false,
          message: "Failed to upload new picture to Cloudinary",
        });
      }

      //---------------------------------------------------------------- Deleting old image from Cloudinary
      if (Product.picture && Product.picture.public_id) {
        try {
          await deleteImagefromCloudinary(Product.picture.public_id);
        } catch (err) {
          console.log("Error deleting old image from Cloudinary:", err);
        }
      }

      //---------------------------------------------------------------- Updating product with new image
      Product.picture = { secure_url, public_id };
    }

    // --------------------------------------------------------------------Save updated product
    await Product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      Product,
    });
  } catch (error) {
    console.log(`Error in updateSingleproductsController: ${error}`);
    res.status(500).send({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

export {
  addProductController,
  getAllproductsController,
  deleteAllproductsController,
  getSingleProductController,
  updateSingleproductsController,
};
