const adService = require("../services/adService");

const adController = { 
    getAll: async (req, res) => {
        try {
          const ads = await adService.getAllAd();
          res.status(200).json(ads);  // Gửi phản hồi ở đây
        } catch (error) {
          console.error("Error fetching ad: ", error);
          res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = adController;