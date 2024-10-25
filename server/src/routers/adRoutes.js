const express = require("express");
const adController = require("../controllers/adController");

const router = express.Router();

router.get("/", adController.getAll);
router.get("/:id", adController.getAdById);
module.exports = router;
