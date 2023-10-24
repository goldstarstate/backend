// models/Expense.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    zoneId: { type: String, required: true },
    zoneSlug: { type: String, required: true },
    categoryName: { type: String, required: true },
    empName: { type: String, required: true },
    eDescription: { type: String, required: true },
    type: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
