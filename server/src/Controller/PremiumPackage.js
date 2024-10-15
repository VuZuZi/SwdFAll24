import PremiumPackage from "../models/PremiumPackage.js";

export const fetchAllPackage = async (req, res) => {
  try {
    const packages = await PremiumPackage.find({});
    res.status(200).json(packages);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const addPackage = async (req, res) => {
  try {
    const newPackage = new PremiumPackage({
      ...req.body,
    });
    await newPackage.save();
    res.status(200).json(newPackage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const existPackage = await PremiumPackage.findById(req.params.id);
    if (existPackage) {
      existPackage.name = req.body.name || existPackage.name;
      existPackage.price = req.body.price || existPackage.price;
      existPackage.day = req.body.day || existPackage.day;
      existPackage.discount = req.body.discount || existPackage.discount;
      const updatedPacakge = await existPackage.save();
      res.status(200).json(updatedPacakge);
    } else {
      res.status(400);
      throw new Error("Package not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const existPackage = await PremiumPackage.findById(req.params.id);
    if (existPackage) {
      await existPackage.deleteOne();
      res.status(200).json({ message: "Deleted Package success" });
    } else {
      res.status(400);
      throw new Error("Package not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
