const express = require("express");
const {
  getSalaries,
  withdraw,
  getSalariesBySearch,
} = require("../controllers/SalaryController");

const router = express.Router();

router.get("/", getSalaries);
router.get("/search", getSalariesBySearch);
router.patch("/:id/:amount", withdraw);

module.exports = router;
