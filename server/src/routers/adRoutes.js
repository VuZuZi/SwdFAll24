const express = require("express");
const adController = require("../controllers/adController");

const router = express.Router();

router.get("/", adController.getAll);
router.get("/:id", adController.getAdById);
router.get("/user/:userId", adController.getAdsByUserId);
router.patch("/:id/approve", adController.approveAd);
router.post("/create", adController.createAd);
module.exports = router;
