// models/Expense.js
const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    zoneId: { type: String, required: true },
    zoneSlug: { type: String, required: true },
    categoryName: { type: String, required: true },
    resource: { type: String, required: true },
    iDescription: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Income", incomeSchema);
