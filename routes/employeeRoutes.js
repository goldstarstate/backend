const express = require("express");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getAllEmployees,
  getEmployeeBySearch,
} = require("../controllers/EmployeeController");

const router = express.Router();

// GET paginated workouts
router.get("/", getEmployees);

// Get all employees
router.get("/allemployees", getAllEmployees);

router.get("/search", getEmployeeBySearch);

// GET a single workout
router.get("/:id", getEmployee);

// POST a new workout
router.post("/", createEmployee);

// DELETE a workout
router.delete("/:id", deleteEmployee);

// UPDATE a workout
router.patch("/:id", updateEmployee);

module.exports = router;
