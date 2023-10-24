const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nic: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("data", DataSchema);
