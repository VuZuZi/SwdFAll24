const Ad = require("../models/ad");

const adService = {
  getAllAd: async () => {
    try {
      const ads = await Ad.find({}, "title price images createdAt")
        .populate("postedBy", "first_name last_name")
        .sort({ createdAt: -1 });
      return ads;  // Trả về dữ liệu, không sử dụng res ở đây
    } catch (error) {
      console.error("Error fetching ads: ", error);
      throw error;
    }
  },
};

module.exports = adService;
