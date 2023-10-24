const express = require("express");
const {
  getTotalExpensesAndIncomes,
  getDashboardChartData,
} = require("../controllers/DashboardDetailsController");
const router = express.Router();

router.get("/expensesAndIncomes", getTotalExpensesAndIncomes);
router.get("/getChartData/:period", getDashboardChartData);

module.exports = router;
