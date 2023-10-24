const express = require("express");
const {
  getDatas,
  getData,
  createData,
  deleteData,
  updateData,
} = require("../controllers/DataController");

const router = express.Router();

// GET all workouts
router.get("/", getDatas);

// GET a single workout
router.get("/:id", getData);

// POST a new workout
router.post("/", createData);

// DELETE a workout
router.delete("/:id", deleteData);

// UPDATE a workout
router.patch("/:id", updateData);

module.exports = router;
