const Ad = require("../models/ad");

const adService = { 
    getAllAd: async () => {
        try {
          const ads = await Ad.find();
          return ads;
        } catch (error) {
          console.error("Error fetching ads: ", error);
          throw error;
        }
      },
}

module.exports = adService;