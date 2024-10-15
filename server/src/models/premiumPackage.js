import mongoose from "mongoose";
const premiumPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const PremiumPackage = mongoose.model("PremiumPackage", premiumPackageSchema);
export default PremiumPackage;
