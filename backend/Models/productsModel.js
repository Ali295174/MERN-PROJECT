import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      trim: true,
    },
    description: {
      required: true,
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    picture: {
      secure_url: {
        type: String,
        required: true,
      },
      public_id:{
        type: String,
        required: true,
      }
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productsSchema);
