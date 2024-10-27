const categoryService = require("../services/categoryService");
const categoryController = { 
    getAll: async (req, res) => {
        try {
          const categorys = await categoryService.getAllCategory();
          console.log(categorys);
          
          res.status(201).json(categorys);
        } catch (error) {
          console.error("Error fetching product: ", error);
          res.status(500).json({ error: "Internal server error" });
        }
      },
}

module.exports = categoryController;