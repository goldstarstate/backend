const EmployeeModel = require("../models/EmployeeModel");

const mongoose = require("mongoose");
const { paginationController } = require("./paginationController");

// get all workouts
const getEmployees = async (req, res) => {
  const page = parseInt(req.query.page);
  const workouts = await EmployeeModel.find({}).sort({ createdAt: -1 });
  const results = paginationController(workouts, page);
  res.json(results);
};

const getEmployeeBySearch = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    const name = new RegExp(searchQuery, "i");
    const emp = await EmployeeModel.find({ name });
    res.json(emp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
const getEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employee" });
  }

  const employee = await EmployeeModel.findById(id);

  if (!employee) {
    return res.status(404).json({ error: "No such employee" });
  }

  res.status(200).json(employee);
};

// create a new workout
const createEmployee = async (req, res) => {
  const { name, nic, address, salary } = req.body;

  // add to the database
  try {
    const employee = await EmployeeModel.create({ name, nic, address, salary });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }

  const employee = await EmployeeModel.findOneAndDelete({ _id: id });

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }

  res.status(200).json(employee);
};

// update a workout
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }

  const employee = await EmployeeModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }

  res.status(200).json(employee);
};

module.exports = {
  getEmployees,
  getAllEmployees,
  getEmployee,
  getEmployeeBySearch,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
