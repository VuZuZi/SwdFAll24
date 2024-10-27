const category = require("../models/Category");

const categoryService = {
    getAllCategory: async () => {
        try {
          const categorys = await category.find();
          return categorys;
        } catch (error) {
          console.error("Error fetching category: ", error);
          throw error;
        }
      },
  };
  
  module.exports = categoryService;