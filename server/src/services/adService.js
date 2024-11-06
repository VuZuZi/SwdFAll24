const Ad = require("../models/ad");

const adService = {
  getAllAd: async () => {
    try {
      const ads = await Ad.find(
        { approved: true },
        "title price location images createdAt"
      )
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
      const ad = await Ad.findOne({ _id: id})
        .populate("postedBy", "first_name last_name")
        .exec();
      return ad;
    } catch (error) {
      console.error("Error fetching ad by ID: ", error);
      throw error;
    }
  },

  getFilteredAds: async (keyword, category, address, subcategories, isAdmin) => {
    try {
      const filter = {};

      if (!isAdmin) {
        filter.approved = true;
      }

      if (keyword) {
        filter.$or = [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ];
      }

      if (category) {
        filter["category.name"] = category;
      }

      if (address) {
        filter.location = address;
      }

      if (subcategories) {
        filter["category.subcategories"] = subcategories;
      }

      const ads = await Ad.find(filter)
        .populate("postedBy", "first_name last_name")
        .sort({ approved: -1, createdAt: -1 });

      return ads;
    } catch (error) {
      console.error("Error fetching filtered ads:", error);
      throw error;
    }
  },
  
  approveAd: async (id, approved) => {
    try {
      console.log(approved);

      const updatedAd = await Ad.findByIdAndUpdate(
        id,
        { approved: !approved },
        { new: true }
      );

      if (!updatedAd) {
        throw new Error("Bài đăng không tồn tại");
      }

      return updatedAd;
    } catch (error) {
      console.error("Lỗi khi duyệt bài đăng:", error);
      throw error;
    }
  },

  createAd: async (adData) => { 
    try {
      console.log(adData);
      
      
      const newAd = new Ad(adData);
      return await newAd.save();
    } catch (error) {
      console.error("Error creating ad:", error);
      throw error;
    }
  },
};

module.exports = adService;
