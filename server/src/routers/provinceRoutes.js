
const express = require("express");
const router = express.Router();


const provinces = [
  { id: 1, name: 'Hà Nội' },
  { id: 2, name: 'Hồ Chí Minh' },
  { id: 3, name: 'Đà Nẵng' },
  { id: 4, name: 'Hải Phòng' },
  { id: 5, name: 'Cần Thơ' },
  { id: 6, name: 'Nghệ An' },
];

router.get('/', (req, res) => {
  res.json(provinces);
});

module.exports = router;