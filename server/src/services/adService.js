const Ad = require("../models/ad");

const adService = {
  getAllAd: async () => {
    try {
      const ads = await Ad.find({}, "title price location images createdAt")
        .populate("postedBy", "first_name last_name")
        .sort({ createdAt: -1 });
      return ads;
    } catch (error) {
      console.error("Error fetching ads: ", error);
      throw error;
    }
  },

  getAdById: async (id) => {
    try {
      const ad = await Ad.findById(id)
        .populate("postedBy", "first_name last_name")
        .exec();
      return ad;
    } catch (error) {
      console.error("Error fetching ad by ID: ", error);
      throw error;
    }
  },

  getFilteredAds: async (keyword, product, address) => {
    try {
      const filter = {};
      
      if (keyword) {
        filter.$or = [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } }
        ];
      }
      
      if (product) {
        filter["category.name"] = product;
      }

      if (address) {
        filter.location = address;
      }
      
      const ads = await Ad.find(filter)
        .populate("postedBy", "first_name last_name")
        .sort({ createdAt: -1 });

      return ads;
    } catch (error) {
      console.error("Error fetching filtered ads:", error);
      throw error;
    }
  },
};

module.exports = adService;