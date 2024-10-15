import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log(err);
    res.status(400).json({ message: error.message });
  }
};
export const addCategory = async (req, res) => {
  try {
    const { title } = req.body;

    const newCategory = new Category({ title: title });
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    console.log(err);
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title);
    const category = await Category.findById(req.params.id);
    if (category) {
      category.title = title || category.title;
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } else {
      res.status(400);
      throw new Error("Category not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.deleteOne();
      res.status(200).json({ message: "Categories removed" });
    } else {
      res.status(400);
      throw new Error("Category not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
