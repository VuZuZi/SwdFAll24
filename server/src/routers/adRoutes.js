const express = require("express");
const adController = require("../controllers/adController");

const router = express.Router();

router.get("/", adController.getAll);
module.exports = router;
