import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String ,unique: true,lowercase: true,trim:true},
    slug: { type: String, required: true ,unique: true,lowercase: true},
   
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
