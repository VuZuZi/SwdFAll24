const adService = require("../services/adService");

const adController = {
  getAll: async (req, res) => {
    const { keyword, category, address, subcategory, isAdmin } = req.query;
    try {
      const ads = await adService.getFilteredAds(
        keyword,
        category,
        address,
        subcategory,
        isAdmin
      );
      console.log("Received Query:", req.query);
      console.log(ads.length);

      res.status(200).json(ads);
    } catch (error) {
      console.error("Err", error);
      res.status(500).json({ error: "Err" });
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

  approveAd: async (req, res) => {
    try {
      const { id } = req.params;
      const { approved } = req.body;
      
      const updatedAd = await adService.approveAd(id, approved);
      if (!updatedAd) {
        return res.status(404).json({ error: "Bài đăng không tồn tại" });
      }
      res.status(200).json(updatedAd);
    } catch (error) {
      console.error("Lỗi khi duyệt bài đăng:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi duyệt bài đăng" });
    }
  },
};

module.exports = adController;
