const express = require("express");
const {
  getZoneDetails,
  getZoneDetailsBySearch,
  createZoneDetails,
  editzZoneDetails,
  deleteZoneDetails,
  getTotalZoneExpensesAndIncomes,
} = require("../controllers/ZoneDetailsController");
const router = express.Router();

router.post("/", createZoneDetails);
router.get("/:zoneSlug", getTotalZoneExpensesAndIncomes);
router.get("/:zoneSlug/:category", getZoneDetails);
router.get("/:zoneSlug/:category/search", getZoneDetailsBySearch);
router.patch("/:id", editzZoneDetails);
router.delete("/:id", deleteZoneDetails);

module.exports = router;
