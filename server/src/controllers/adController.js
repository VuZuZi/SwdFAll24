const adService = require("../services/adService");

const adController = {
  getAll: async (req, res) => {
    try {
      const ads = await adService.getAllAd();
      console.log(ads);
      res.status(200).json(ads);
    } catch (error) {
      console.error("Error fetching ads: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAdById: async (req, res) => {
    const { id } = req.params;
    try {
      const ad = await adService.getAdById(id); 
      if (!ad) {
        return res.status(404).json({ error: "Ad not found" });
      }
      res.status(200).json(ad);
    } catch (error) {
      console.error("Error fetching ad: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = adController;
