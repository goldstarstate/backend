const DataModel = require("../models/DataModel");

const mongoose = require("mongoose");

// get all workouts
const getDatas = async (req, res) => {
  const data = await DataModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(data);
};

// get a single workout
const getData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Data" });
  }

  const data = await DataModel.findById(id);

  if (!data) {
    return res.status(404).json({ error: "No such Data" });
  }

  res.status(200).json(data);
};

// create a new workout
const createData = async (req, res) => {
  const { name, nic } = req.body;

  // add to the database
  try {
    const data = await DataModel.create({ name, nic });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Data" });
  }

  const data = await DataModel.findOneAndDelete({ _id: id });

  if (!data) {
    return res.status(400).json({ error: "No such data" });
  }

  res.status(200).json(data);
};

// update a workout
const updateData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Data" });
  }

  const data = await DataModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
      
    },
    {new: true}
  );

  if (!data) {
    return res.status(400).json({ error: "No such Data" });
  }

  res.status(200).json(employee);
};

module.exports = {
  getDatas,
  getData,
  createData,
  deleteData,
  updateData,
};
