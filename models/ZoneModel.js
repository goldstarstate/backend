// models/Zone.js
const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  name: String,
  categories: [String],
});

module.exports = mongoose.model("Zone", zoneSchema);
