const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    empName: { type: String, required: true },
    zoneSlug: { type: String, required: true },
    categoryName: { type: String, required: true },
    salary: { type: Number, required: true },
    lastWithdrawals: {
      date: { type: Date, default: Date.now },
      amount: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salary", salarySchema);
